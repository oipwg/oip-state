import * as actions from '../actions/Account/actions'

const Account = (state = {
	Account: undefined,
	showLoginModal: false,
	loginFetching: false,
	loginFailure: false,
	isLoggedIn: false,
	loginErrorMessage: undefined,
	showRegisterModal: false,
	registerFetching: false,
	registerFailure: false,
	registerSuccess: false,
	registerErrorMessage: undefined
}, action) => {
	switch (action.type){
		case actions.PROMPT_LOGIN:
			return {
				...state,
				showLoginModal: action.prompt,
				loginFetching: false,
				loginFailure: false,
				isLoggedIn: false,
				loginErrorMessage: undefined,
				showRegisterModal: false,
				registerFetching: false,
				registerFailure: false,
				registerSuccess: false,
				registerErrorMessage: undefined
			}
		case actions.LOGIN_FETCHING:
			return {
				...state,
				loginFetching: true,
				loginFailure: false,
				isLoggedIn: false,
				loginErrorMessage: undefined
			}
		case actions.LOGIN_FAILURE:
			return {
				...state,
				loginFailure: true,
				loginFetching: false,
				isLoggedIn: false,
				loginErrorMessage: action.errorMessage
			}
		case actions.LOGIN_SUCCESS:
			return {
				...state,
				loginFetching: false,
				loginFailure: false,
				isLoggedIn: true,
				showLoginModal: false,
				showRegisterModal: false,
				Account: action.account
			}
		case actions.PROMPT_REGISTER:
			return {
				...state,
				showLoginModal: false,
				loginFetching: false,
				loginFailure: false,
				isLoggedIn: false,
				loginErrorMessage: undefined,
				showRegisterModal: action.prompt,
				registerFetching: false,
				registerFailure: false,
				registerSuccess: false,
				registerErrorMessage: undefined
			}
		case actions.REGISTER_FETCHING:
			return {
				...state,
				registerFetching: true,
				registerFailure: false,
				registerSuccess: false,
				registerErrorMessage: undefined
			}
		case actions.REGISTER_FAILURE:
			return {
				...state,
				registerFetching: false,
				registerFailure: true,
				registerErrorMessage: action.errorMessage
			}
		case actions.REGISTER_SUCCESS:
			return {
				...state,
				showRegisterModal: false,
				registerFailure: false,
				registerSuccess: true,
				registerFetching: false,
				registerErrorMessage: undefined,
				Account: action.account
			}
		case actions.LOGOUT:
			return {
				...state,
				Account: undefined,
				showLoginModal: false,
				loginFetching: false,
				loginFailure: false,
				isLoggedIn: false,
				loginErrorMessage: undefined,
				showRegisterModal: false,
				registerFetching: false,
				registerFailure: false,
				registerSuccess: false,
				registerErrorMessage: undefined
			}
		case actions.SET_ACCOUNT:
			return {
				...state,
				Account: action.account
			}
		default:
			return state
	}
}

export default Account;