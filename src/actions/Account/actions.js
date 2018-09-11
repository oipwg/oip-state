export const PROMPT_LOGIN = 'PROMPT_LOGIN'
export const LOGIN_FETCHING = 'LOGIN_FETCHING'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const PROMPT_REGISTER = 'PROMPT_REGISTER'
export const REGISTER_FETCHING = 'REGISTER_FETCHING'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'

export const LOGOUT = 'LOGOUT'

export const SET_ACCOUNT = 'SET_ACCOUNT'
export const CLEAR_ACCOUNT_ERRORS = 'CLEAR_ACCOUNT_ERRORS'

// --------------------------------------------------------------------------------


// ------------ Login ------------
export const promptLogin = (prompt) => ({
	type: PROMPT_LOGIN,
	prompt: prompt === undefined ? true : prompt
})

export const loginFetching = () => ({
	type: LOGIN_FETCHING
})

export const loginSuccess = (account) => ({
	type: LOGIN_SUCCESS,
	account
})

export const loginFailure = (error_type, error_message) => ({
	type: LOGIN_FAILURE,
	errorType: error_type,
	errorMessage: error_message
})


// ------------ Register ------------
export const promptRegister = (prompt) => ({
	type: PROMPT_REGISTER,
	prompt: prompt === undefined ? true : prompt
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
export const logout = () => ({
	type: LOGOUT
})

export const setAccount = account => ({
	type: SET_ACCOUNT,
	account
})

export const clearAccountErrors = () => ({
	type: CLEAR_ACCOUNT_ERRORS
})