import {ArtifactPaymentBuilder} from 'oip-account'

import {
	promptCoinbaseModal,
	setCoinbaseInfo
} from "./actions"

import {
	toUID,
	setActiveFile,
	paymentSuccess,
	paymentInProgress,
	paymentCancel,
	paymentError
} from '../ActiveArtifactFiles/thunks'

import { promptLogin } from '../Account/actions'

const waitForLogin = (dispatch, getState) => {
	return new Promise((resolve) => {
		const Account = getState().Account

		if (!Account.isLoggedIn) {
			dispatch(promptLogin(true))
		} else {
			resolve()
		}

		let promptTimeout = setInterval(() => {
			let Account = getState().Account
			if (Account.isLoggedIn) {
				clearInterval(promptTimeout)
				resolve()
			}

			if (!Account.showLoginModal && !Account.showRegisterModal && !Account.isLoggedIn && (Account.loginFailure || Account.registerFailure)){
				reject("error")
			}

			if (!Account.showLoginModal && !Account.showRegisterModal && !Account.isLoggedIn && !Account.loginFailure && !Account.registerFailure){
				reject()
			}
		}, 1000)
	})
}

const listenForBalanceUpdate = (address, callback) => {
	let initial_balance = address.getBalance()

	let waitForBalanceUpdate = setInterval(() => {
		address.updateState().then(() => {
			let new_balance = address.getBalance()
			if (new_balance !== initial_balance) {
				clearInterval(waitForBalanceUpdate)

				// Run the callback if passed in
				if (callback) 
					callback()
			}
		}).catch(err => {console.log("Error updating addr state \n ", err)})
	}, 1000)
}

const waitForCoinbase = (dispatch, getState, address) => {
	return new Promise((resolve, reject) => {
		address.onWebsocketUpdate((addr) => {
			clearInterval(promptTimeout)
			resolve()
		})

		listenForBalanceUpdate(address, () => {
			clearInterval(promptTimeout)
			resolve()
		})

		let promptTimeout = setInterval(() => {
			let Payment = getState().Payment

			if (!Payment.showCoinbaseModal) {
				clearInterval(promptTimeout)
				reject()
			}
		}, 1000)
	})
}

let checkIfAlreadyPaid = (artifact, file, type, getState) => {
	let state = getState()

	let uid = toUID(artifact, file)

	if (state.ActiveArtifactFiles[uid]){
		if (state.ActiveArtifactFiles[uid].isPaid){
			// If the type is view, and we either have paid, or own the file, then return that we have already paid
			if (type === "view" && (state.ActiveArtifactFiles[uid].hasPaid || state.ActiveArtifactFiles[uid].owned)){
				return true
			}
			// If the type is buy, and we already own the file, then return that we have already paid
			if (type === "buy" && state.ActiveArtifactFiles[uid].owned){
				return true
			}

			// If we have not returned yet, that means we have not yet paid. Return false.
			return false
		} else {
			// Since the file is free, return that we have already paid
			return true
		}
	}

	// This is just here to catch weird issues, we should have already returned always up above.
	
	// Return false (not yet paid)
	return false
}

export const payForArtifactFile = (artifact, file, type) => async (dispatch, getState) => {
	// Check to see if we have already paid for the Artifact. If so, prevent payment.
	if (checkIfAlreadyPaid(artifact, file, type, getState)){
		let state = getState()

		// Set the file to be active if we need.
		if (state.ActiveArtifactFiles.active !== toUID(artifact, file)){
			dispatch(setActiveFile(artifact, file))
		}

		// Since we have already been paid for, prevent further execution.
		return
	}

	// Dispatch Payment in Progress
	dispatch(paymentInProgress(artifact, file, type))

	// Make sure the user is logged in
	try {
		await waitForLogin(dispatch, getState)
	} catch (error) {
		if (error){
			paymentError(artifact, file, type, "Unable to Login or Register")
		} else {
			paymentCancel(artifact, file, type)
		}
	}

	// Create an ArtifactPaymentBuilder
	let wallet = getState().Account.Account.wallet
	let payment_builder = new ArtifactPaymentBuilder(wallet, artifact, file, type)

	// Detect if we are able to make a payment with our current balance
	let preprocess = await payment_builder.getPaymentAddressAndAmount()

	// If we are unable to make the payment, then attempt to use Coinbase.
	if (!preprocess.success && preprocess.error_type === "PAYMENT_COIN_SELECT"){
		// Figure out what coins are supported
		let artifact_supported_coins = payment_builder.getSupportedCoins();
		
		let coinbase_coin;

		// @ToDo: Add user Preference on which coinbase coin to use
		// Grab either Litecoin or Bitcoin to use in payments. This decides which one to use.
		if (artifact_supported_coins.includes("litecoin"))
			coinbase_coin = "litecoin"
		else if (artifact_supported_coins.includes("bitcoin"))
			coinbase_coin = "bitcoin"

		// If we didn't grab a coin that Coinbase can use, then throw a payment error.
		if (!coinbase_coin){
			dispatch(paymentError(artifact, file, type, "Unable to find a supported Coinbase Coin!" + JSON.stringify(artifact_supported_coins, null, 4)))

			// Prevent further execution. We don't have the funds and can't buy more.
			return
		} else {
			// Get the address we will be recieving funds at
			let coinbase_address = wallet.getCoin(coinbase_coin).getMainAddress()
			// Set the coinbase variables
			dispatch(setCoinbaseInfo({
				currency: coinbase_coin,
				amount: 1,
				address: coinbase_address.getPublicAddress()
			}))

			dispatch(promptCoinbaseModal())

			try {
				// Wait for payment to the coinbase address
				await waitForCoinbase(dispatch, getState, coinbase_address)

				dispatch(promptCoinbaseModal(false))

				// Now that we have waited for the Coinbase payment to resolve, 
				// rerun preprocess function to update stuff.
				preprocess = await payment_builder.getPaymentAddressAndAmount()
			} catch (err) {
				dispatch(paymentCancel(artifact, file, type))

				// There was an error/cancel, prevent further execution
				return
			}
		}
	}

	// Attempt the payment
	if (preprocess.success) {
		try {
			// Make the payment
			let txid = await payment_builder.pay()
				
			// Successful payment!
			dispatch(paymentSuccess(artifact, file, type))
		} catch (err) {
			// Fail on payment error
			dispatch(paymentError(artifact, file, type, "Error sending payment!" + err))

			// Return to prevent further execution
			return
		}

		// This should only run if we were fully successful.
		// Save the updated Wallet State to the Account Store
		let account = getState().Account.Account
		try {
			await account.store()
		} catch (err){
			console.error("Unable to save updated Account to Store! " + err)
		}
	} else {
		// Fail on preprocess error
		dispatch(paymentError(artifact, file, type, "Preprocess not successful after Coinbase Attempt!" + JSON.stringify(preprocess, null, 4)))
	}
}

export const handleCoinbaseModalEvents = (event) => (dispatch, getState) => {
	switch (event) {
		case "close":
			dispatch(promptCoinbaseModal(false))
			break
		case "success":
			// @ToDo: Show a waiting modal after the coinbase modal so that we can wait for the balance to come in
			// dispatch(promptCoinbaseModal(false))
			break
		case "cancel":
			dispatch(promptCoinbaseModal(false))
			break
	}
}
