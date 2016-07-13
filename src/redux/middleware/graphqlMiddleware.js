import { notificationManager } from 'utils/NotificationManager';

const graphqlMiddleware = store => next => action => {
  next(action);

  if (action.meta && action.meta.query) {
    let options;
    options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: action.meta.query,
        variables: action.meta.variables,
      })
    };
    fetch(`${process.env.BACKEND_API_URL}/graphql`, options)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      if (json.status === 'error') {
        if (json.message) {
          notificationManager.addNotification({
            message: json.message,
            level: 'error'
          });
        }
        if (action.meta.error) {
          var errorResult = action.meta.error(json, action.payload);
          // Check to see if the result has a type attribute, if it does then
          // assume its a Redux action and dispatch it.
          if (errorResult && errorResult.type) {
            next(errorResult);
          }
        }
        return;
      }
      if (action.meta.success) {
        var successResult = action.meta.success(json.data, action.payload);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (successResult && successResult.type) {
          next(successResult);
        }
      }
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    console.log('fetching: ' + action.meta.query);
  }
};

export { graphqlMiddleware as graphqlMiddleware };
