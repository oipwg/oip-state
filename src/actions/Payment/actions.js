export const PROMPT_COINBASE_MODAL = 'PROMPT_COINBASE_MODAL'
export const SET_COINBASE_INFO = "SET_COINBASE_INFO"
export const COINBASE_PENDING = "COINBASE_PENDING"
export const COINBASE_COMPLETE = "COINBASE_COMPLETE"

// -------------------------------------------------------------------------------------------------

export const promptCoinbaseModal = (prompt) => ({
    type: PROMPT_COINBASE_MODAL,
    prompt: prompt === undefined ? true : prompt
})

export const coinbasePending = () => ({
    type: COINBASE_PENDING
})

export const coinbaseComplete = () => ({
    type: COINBASE_COMPLETE
})

export const setCoinbaseInfo = (info) => ({
    type: SET_COINBASE_INFO,
    info
})
