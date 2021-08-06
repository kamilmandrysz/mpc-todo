import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';

import { rootReducer } from 'Store/reducers';

const initializeStore = (preloadedState) => {
  // const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });

  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(thunk)));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('Store/reducers', () => {
      // eslint-disable-next-line global-require
      const nextReducer = require('Store/reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export const store = initializeStore();
