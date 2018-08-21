import * as actions from '../actions/ActiveArtifact/actions'

const ActiveArtifact = (state = {
	isFetching: false,
	error: false,
	errorText: undefined,
	Artifact: undefined
}, action) => {
	switch (action.type) {
		case actions.ARTIFACT_ERROR:
			return {
				...state,
				isFetching: false,
				error: true,
				errorText: action.errorText
			}
		case actions.ARTIFACT_FETCHING:
			return {
				...state,
				isFetching: true,
				error: false,
				errorText: undefined,
				Artifact: undefined
			}
		case actions.ARTIFACT_SUCCESS:
			return {
				...state,
				isFetching: false,
				error: false,
				errorText: undefined,
				Artifact: action.artifact
			}
		default:
			return state
	}
}

export default ActiveArtifact