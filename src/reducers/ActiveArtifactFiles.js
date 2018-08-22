import * as actions from '../actions/ActiveArtifactFiles/actions'

const file = (state = {
	owned: false,
	isPaid: false,
	hasPaid: false,

	paySuccessPlay: false,
	paySuccessBuy: false,
	payInProgressPlay: false,
	payInProgressBuy: false,
	payErrorPlay: false,
	payErrorBuy: false,
	payErrorTextPlay: undefined,
	payErrorTextBuy: undefined,
	
	ArtifactFile: undefined
}, action) => {
	switch (action.type) {
		case actions.ADD_FILE:
			return {
				...state,
				isPaid: action.isPaid,
				owned: action.owned ? action.owned : false,
				ArtifactFile: action.file
			}
		case actions.FILE_PAY_SUCCESS_PLAY:
			return {
				...state,
				hasPaid: true,
				paySuccessPlay: true,
				payInProgressPlay: false,
				payErrorPlay: false,
				payErrorTextPlay: undefined
			}
		case actions.FILE_PAY_SUCCESS_BUY:
			return {
				...state,
				owned: true,
				paySuccessBuy: true,
				payInProgressBuy: false,
				payErrorBuy: false,
				payErrorTextBuy: undefined
			}
		case actions.FILE_PAY_IN_PROGRESS_PLAY:
			return {
				...state,
				hasPaid: false,
				paySuccessPlay: false,
				payInProgressPlay: true,
				payErrorPlay: false,
				payErrorTextPlay: undefined
			}
		case actions.FILE_PAY_IN_PROGRESS_BUY:
			return {
				...state,
				owned: false,
				paySuccessBuy: false,
				payInProgressBuy: true,
				payErrorBuy: false,
				payErrorTextBuy: undefined
			}
		case actions.FILE_PAY_ERROR_PLAY:
			return {
				...state,
				hasPaid: false,
				paySuccessPlay: false,
				payInProgressPlay: false,
				payErrorPlay: true,
				payErrorTextPlay: action.error
			}
		case actions.FILE_PAY_ERROR_BUY:
			return {
				...state,
				owned: false,
				paySuccessBuy: false,
				payInProgressBuy: false,
				payErrorBuy: true,
				payErrorTextBuy: action.error
			}
		default:
			return state
	}
}

const ActiveArtifactFiles = (state = {
	active: undefined
}, action) => {
	switch (action.type) {
		case actions.ADD_FILE:
		case actions.FILE_PAY_SUCCESS_PLAY:
		case actions.FILE_PAY_SUCCESS_BUY:
		case actions.FILE_PAY_IN_PROGRESS_PLAY:
		case actions.FILE_PAY_IN_PROGRESS_BUY:
		case actions.FILE_PAY_ERROR_PLAY:
		case actions.FILE_PAY_ERROR_BUY:
			return {
				...state,
				[action.uid]: file(state[action.uid], action)
			}
		case actions.SET_ACTIVE_FILE:
			return {
				...state,
				active: action.uid
			}
		case actions.CLEAR_ACTIVE_ARTIFACT_FILES:
			return {
				active: undefined
			}
		default:
			return state
	}
}

export default ActiveArtifactFiles