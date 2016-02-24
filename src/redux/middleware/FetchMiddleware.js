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
        next(action.meta.success(json, action.payload));
      }
    }).catch(function (ex) {
      console.log('parsing failed', ex);
    });
    console.log('fetching: ' + action.meta.endpoint);
  }
};

export { fetchMiddleware as fetchMiddleware };
