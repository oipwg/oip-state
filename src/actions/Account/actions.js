export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const PROMPT_REGISTER = 'PROMPT_REGISTER'
export const REGISTER_FETCHING = 'REGISTER_FETCHING'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_SUCCESS = "REGISTER_SUCCESS"

export const SET_ACCOUNT = 'SET_ACCOUNT';

export const LOGOUT = 'LOGOUT'

// --------------------------------------------------------------------------------


// ------------ Login ------------
export const promptLogin = () => ({
	type: PROMPT_LOGIN
})

export const loginFetching = () => ({
	type: LOGIN_FETCHING
})

export const loginSuccess = (account) => ({
	type: LOGIN_SUCCESS,
	account
})

export const loginFailure = (error_message) => ({
	type: LOGIN_FAILURE,
	errorMessage: error_message
})


// ------------ Register ------------
export const promptRegister = () => ({
	type: PROMPT_REGISTER
})

export const registerFetching = () => ({
	type: REGISTER_FETCHING
})

export const registerSuccess = (account) => ({
	type: REGISTER_SUCCESS,
	account
})

export const registerFailure = (error_message) => ({
	type: REGISTER_FAILURE,
	errorMessage: error_message
})


// ------------ Other ------------
export const setAccount = account => ({
	type: SET_ACCOUNT,
	account
})

export const logout = () => ({
	type: LOGOUT
})