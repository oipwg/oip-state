import * as actions from '../actions/ActiveArtifactFiles/actions'

const file = (state = {
	owned: false,
	isPaid: false,
	hasPaid: false,
	paySuccessView: false,
	paySuccessBuy: false,
	payInProgressView: false,
	payInProgressBuy: false,
	payErrorView: false,
	payErrorBuy: false,
	payErrorTextView: undefined,
	payErrorTextBuy: undefined,
	isPlaying: false,
	isPaused: false,
	duration: undefined,
	currentTime: undefined,
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
		case actions.FILE_PAY_SUCCESS_VIEW:
			return {
				...state,
				hasPaid: true,
				paySuccessView: true,
				payInProgressView: false,
				payErrorView: false,
				payErrorTextView: undefined
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
		case actions.FILE_PAY_IN_PROGRESS_VIEW:
			return {
				...state,
				hasPaid: false,
				paySuccessView: false,
				payInProgressView: true,
				payErrorView: false,
				payErrorTextView: undefined
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
		case actions.FILE_PAY_CANCEL_VIEW:
			return {
				...state,
				hasPaid: false,
				paySuccessView: false,
				payInProgressView: false,
				payErrorView: false
			}
		case actions.FILE_PAY_CANCEL_BUY:
			return {
				...state,
				owned: false,
				paySuccessBuy: false,
				payInProgressBuy: false,
				payErrorBuy: false
			}
		case actions.FILE_PAY_ERROR_VIEW:
			return {
				...state,
				hasPaid: false,
				paySuccessView: false,
				payInProgressView: false,
				payErrorView: true,
				payErrorTextView: action.error
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
		case actions.PLAY_PAUSE_FILE:
			return {
				...state,
				isPlaying: action.bool,
				isPaused: !action.bool
			}
		case actions.SET_CURRENT_TIME:
			return {
				...state,
				currentTime: action.currentTime
			}
		case actions.SET_DURATION:
			return {
				...state,
				duration: action.duration
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
		case actions.FILE_PAY_SUCCESS_VIEW:
		case actions.FILE_PAY_SUCCESS_BUY:
		case actions.FILE_PAY_IN_PROGRESS_VIEW:
		case actions.FILE_PAY_IN_PROGRESS_BUY:
		case actions.FILE_PAY_CANCEL_VIEW:
		case actions.FILE_PAY_CANCEL_BUY:
		case actions.FILE_PAY_ERROR_VIEW:
		case actions.FILE_PAY_ERROR_BUY:
		case actions.PLAY_PAUSE_FILE:
		case actions.SET_CURRENT_TIME:
		case actions.SET_DURATION:
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