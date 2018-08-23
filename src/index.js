// Import stuff we need from Redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

// Import our Reducers
import Account from './reducers/Account'
import ActiveArtifact from './reducers/ActiveArtifact'
import ActiveArtifactFiles from './reducers/ActiveArtifactFiles'
import OIPIndex from './reducers/OIPIndex'
import Payment from './reducers/Payment'

const reducers = { Account, ActiveArtifact, ActiveArtifactFiles, OIPIndex, Payment }

// Create the logger to log Actions to the console
const logger = createLogger({
    collapsed: true
});

// Create Redux Middleware
let middleware = [ logger, thunk ];

let composeEnhancers

// Compose a "name" for the window.
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__){
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "OIP State"
    }) 
} else {
	composeEnhancers = compose
}

// Use the Middlewear and create an "enhancer"
const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
);

// Create our Store
// const store = createStore(combineReducers(reducers), enhancer);

const createStoreFn = () => {
	return createStore(combineReducers(reducers), enhancer)
}

// Export the store we created
export default {
	createStore: createStoreFn
}