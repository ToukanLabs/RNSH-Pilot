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
      console.log(json);
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
