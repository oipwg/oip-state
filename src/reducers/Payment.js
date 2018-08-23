import * as actions from '../actions/Wallet/actions'

export const Wallet = (state = {
	showCoinbaseModal: false,
	coinbaseInfo: {}
}, action) => {
	switch (action.type) {
		case actions.PROMPT_COINBASE_MODAL:
			return {
				...state,
				showCoinbaseModal: action.prompt
			}
		case actions.SET_COINBASE_INFO:
			return {
				...state,
				coinbaseInfo: action.info
			}
		default:
			return state
	}
}