export const ARTIFACT_FETCHING = 'ARTIFACT_FETCHING'
export const ARTIFACT_SUCCESS = 'ARTIFACT_SUCCESS'
export const ARTIFACT_ERROR = 'ARTIFACT_ERROR'

// --------------------------------------------------------------------------------

export const fetchingArtifact = () => ({
    type: ARTIFACT_FETCHING
})

export const setActiveArtifact = (artifact) => ({
    type: ARTIFACT_SUCCESS,
    artifact: artifact
})

export const fetchArtifactError = (error) => ({
    type: ARTIFACT_ERROR,
    errorText: error
})
