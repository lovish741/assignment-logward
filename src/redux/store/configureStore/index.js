import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../../reducers";

export default function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const sagaMiddleware = createSagaMiddleware({
    onError(error) {
      setImmediate(() => {
        throw error;
      });
    },
  });

  const store = createStore(
    rootReducer,
    [],
    composeEnhancers(
      applyMiddleware(sagaMiddleware, reduxImmutableStateInvariant())
    )
  );
  //   initSagas(sagaMiddleware);
  return store;
}
