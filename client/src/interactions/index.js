import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// import any new reducers here and add to
// rooReducer below.
import { reducer as login } from './login';
import { reducer as signup } from './signup';

const rootReducer = combineReducers({
  login,
  signup,
});


const middleware = [thunk];

export const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(...middleware),
));