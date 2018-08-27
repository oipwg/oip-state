export const SET_ACTIVE_FILE = 'SET_ACTIVE_FILE'
export const ADD_FILE = 'ADD_FILE'
export const CLEAR_ACTIVE_ARTIFACT_FILES = 'CLEAR_ACTIVE_ARTIFACT_FILES'
export const FILE_PAY_SUCCESS_VIEW = 'FILE_PAY_SUCCESS_VIEW'
export const FILE_PAY_SUCCESS_BUY = 'FILE_PAY_SUCCESS_BUY'
export const FILE_PAY_IN_PROGRESS_VIEW = 'FILE_PAY_IN_PROGRESS_VIEW'
export const FILE_PAY_IN_PROGRESS_BUY = 'FILE_PAY_IN_PROGRESS_BUY'
export const FILE_PAY_CANCEL_VIEW = 'FILE_PAY_CANCEL_VIEW'
export const FILE_PAY_CANCEL_BUY = 'FILE_PAY_CANCEL_BUY'
export const FILE_PAY_ERROR_VIEW = 'FILE_PAY_ERROR_VIEW'
export const FILE_PAY_ERROR_BUY = 'FILE_PAY_ERROR_BUY'

// -------------------------------------------------------------------------------------------------

export const setActiveArtifactFile = (uid) => ({
    type: SET_ACTIVE_FILE,
    uid
})

export const addToActiveArtifactFiles = (file, uid) => ({
    type: ADD_FILE,
    uid,
    isPaid: file.isPaid(),
    file
})

export const clearActiveArtifactFiles = () => ({
    type: CLEAR_ACTIVE_ARTIFACT_FILES
})

export const filePaySuccessView = (uid) => ({
    type: FILE_PAY_SUCCESS_VIEW,
    uid
})

export const filePaySuccessBuy = (uid) => ({
    type: FILE_PAY_SUCCESS_BUY,
    uid
})

export const filePayInProgressView = (uid) => ({
    type: FILE_PAY_IN_PROGRESS_VIEW,
    uid
})

export const filePayInProgressBuy = (uid) => ({
    type: FILE_PAY_IN_PROGRESS_BUY,
    uid
})

export const filePayCancelView = (uid, error) => ({
    type: FILE_PAY_CANCEL_VIEW,
    uid,
    error
})

export const filePayCancelBuy = (uid, error) => ({
    type: FILE_PAY_CANCEL_BUY,
    uid,
    error
})

export const filePayErrorView = (uid, error) => ({
    type: FILE_PAY_ERROR_VIEW,
    uid,
    error
})

export const filePayErrorBuy = (uid, error) => ({
    type: FILE_PAY_ERROR_BUY,
    uid,
    error
})