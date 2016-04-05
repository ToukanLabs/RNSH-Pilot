import thunk from 'redux-thunk';
import rootReducer from './modules';
import { fetchMiddleware } from './middleware/FetchMiddleware';
import { graphqlMiddleware } from './middleware/graphqlMiddleware';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

export default function configureStore (initialState) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk, fetchMiddleware, graphqlMiddleware);

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('containers/DevTools').instrument()
    );
  } else {
    createStoreWithMiddleware = compose(middleware);
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );
  if (module.hot) {
    module.hot.accept('./modules', () => {
      const nextRootReducer = require('./modules');

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
