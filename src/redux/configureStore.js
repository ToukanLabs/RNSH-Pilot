import thunk from 'redux-thunk';
import rootReducer from './modules';
import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

const fetchMiddleware = store => next => action => {
  next(action);

  if (action.meta && action.meta.endpoint) {
    let options;
    switch (action.meta.method) {
      case 'POST':
        options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(action.meta.body)
        };

        break;
      default:
        options = {
          method: 'get'
        };
    }
    fetch(action.meta.endpoint, options)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      next(action.meta.success(json, action.payload));
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    console.log('fetching: ' + action.meta.endpoint);
  }
};

export default function configureStore (initialState) {
  let createStoreWithMiddleware;

  const middleware = applyMiddleware(thunk, fetchMiddleware);

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
