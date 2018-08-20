import Account from 'oip-account'

import {
	loginFetching,
	loginSuccess,
	loginFailure,
	registerFetching,
	registerSuccess,
	registerFailure,
} from './actions'

export const accountRegister = (username, pw, options) => async (dispatch) => {
	dispatch(registerFetching())

	let account = new Account(username, pw, options);

	try {
		await account.create()

		dispatch(registerSuccess(account))
	} catch (err) {
		dispatch(registerFailure(err.message))
	}
}

export const accountLogin = (username, pw, options) => async (dispatch) => {
	dispatch(loginFetching())

	let account = new Account(username, pw, options)

	try {
		await account.login()

		dispatch(loginSuccess(account))

		if (options.rememberMe) {
			// @ToDo: Do LocalStorage Check
			localStorage.oip_state_un = username;
			localStorage.oip_state_pw = pw;
		}

		// @ToDo: Hookup Wallet Checks
		//dispatch(fetchCryptoBalances(account.wallet))
		//dispatch(fetchWalletAddresses(account.wallet))
	} catch (err) {
		dispatch(loginFailure(err.message))
	}
}