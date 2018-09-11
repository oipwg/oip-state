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

// Export our Actions and Thunks
export * from './actions/Account/actions'
export * from './actions/Account/thunks'
export * from './actions/ActiveArtifact/actions'
export * from './actions/ActiveArtifact/thunks'
export * from './actions/ActiveArtifactFiles/actions'
export * from './actions/ActiveArtifactFiles/thunks'
export * from './actions/Payment/actions'
export * from './actions/Payment/thunks'

// Create our Store
const createStoreFn = (options = {}) => {
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
	        name: options.title || "OIP State"
	    }) 
	} else {
		composeEnhancers = compose
	}

	// Use the Middlewear and create an "enhancer"
	const enhancer = composeEnhancers(
	    applyMiddleware(...middleware),
	    // other store enhancers if any
	);

	return createStore(combineReducers(reducers), enhancer)
}

// Export the createStore function AND all other functions from other classes
export {
	createStoreFn as createStore
}