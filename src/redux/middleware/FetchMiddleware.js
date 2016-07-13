import { notificationManager } from 'utils/NotificationManager';

const fetchMiddleware = store => next => action => {
  next(action);
  let options;
  if (action.meta && action.meta.endpoint) {
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
        var successResult = action.meta.success(json, action.payload);
        // Check to see if the result has a type attribute, if it does then
        // assume its a Redux action and dispatch it.
        if (successResult && successResult.type) {
          next(successResult);
        }
      }
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    console.log('fetching: ' + action.meta.endpoint);
  }
};

export { fetchMiddleware as fetchMiddleware };
