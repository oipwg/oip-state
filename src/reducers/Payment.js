import * as actions from '../actions/Payment/actions'

const Payment = (state = {
	showCoinbaseModal: false,
	coinbasePending: false,
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
		case actions.COINBASE_PENDING:
			return {
				...state,
				coinbasePending: true
			}
		case actions.COINBASE_COMPLETE:
			return {
				...state,
				coinbasePending: false
			}
		default:
			return state
	}
}

export default Payment