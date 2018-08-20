import * as actions from '../../src/actions/Account/actions'

describe('Account Actions', () => {
	describe('Login', () => {
		it("should prompt account login", () => {
			const expected_action = {
				type: actions.PROMPT_LOGIN
			}

			expect(actions.promptLogin()).toEqual(expected_action)
		})

		it("should set login fetching", () => {
			const expected_action = {
				type: actions.LOGIN_FETCHING
			}

			expect(actions.loginFetching()).toEqual(expected_action)
		})

		it("should set login success", () => {
			const account = {"test": "data"}

			const expected_action = {
				type: actions.LOGIN_SUCCESS,
				account
			}

			expect(actions.loginSuccess(account)).toEqual(expected_action)
		})

		it("should set login failure", () => {
			const error_message = "Error"

			const expected_action = {
				type: actions.LOGIN_FAILURE,
				errorMessage: error_message
			}

			expect(actions.loginFailure(error_message)).toEqual(expected_action)
		})
	})

	describe('Register', () => {
		it("should prompt account register", () => {
			const expected_action = {
				type: actions.PROMPT_REGISTER
			}

			expect(actions.promptRegister()).toEqual(expected_action)
		})

		it("should set register fetching", () => {
			const expected_action = {
				type: actions.REGISTER_FETCHING
			}

			expect(actions.registerFetching()).toEqual(expected_action)
		})

		it("should set register success", () => {
			const account = {"test": "data"}

			const expected_action = {
				type: actions.REGISTER_SUCCESS,
				account
			}

			expect(actions.registerSuccess(account)).toEqual(expected_action)
		})

		it("should set register failure", () => {
			const error_message = "Error"

			const expected_action = {
				type: actions.REGISTER_FAILURE,
				errorMessage: error_message
			}

			expect(actions.registerFailure(error_message)).toEqual(expected_action)
		})
	})

	describe('Other', () => {
		it("should log out", () => {
			const expected_action = {
				type: actions.LOGOUT
			}

			expect(actions.logout()).toEqual(expected_action)
		})

		it("should set Account", () => {
			const account = {"test": "data"}

			const expected_action = {
				type: actions.SET_ACCOUNT,
				account
			}

			expect(actions.setAccount(account)).toEqual(expected_action)
		})
	})
})