import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

const initialState = {};

// let store;

// if (process.env.NODE_ENV === "production") {
//   store = createStore(
//     rootReducer,
//     initialState,
//     compose(applyMiddleware(thunk))
//   );
// } else {
//   store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(thunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__({
//           latency: 0,
//         })
//     )
//   );
// }

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(thunk))
// );

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__({
        latency: 0,
      })
  )
);

// export default store;

// let store;

// export function configureStore() {
//   store = createStore(
//     rootReducer,
//     initialState,
//     compose(
//       applyMiddleware(thunk),
//       window.__REDUX_DEVTOOLS_EXTENSION__ &&
//         window.__REDUX_DEVTOOLS_EXTENSION__()
//     )
//   );

//   return store;
// }
