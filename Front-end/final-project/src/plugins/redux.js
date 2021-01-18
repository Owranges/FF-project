// // STORE + PERSISTANT
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// // STORE + PERSISTANT , PERSIST CONFIG TAKE KEY "ROOT" TO ACCESS FROM THE HIGHEST PART OF THE STORE
// const persistConfig = {
//     key: "root",
//     storage,
// };
// import allReducers from "../storeRedux/reducers/index";

// // PERSISTEDREDUCER TAKE 2 PARAMS ONE FOR THE PERSISTCONFIG AND ALL OUR REDUCERS
// const persistedReducer = persistReducer(persistConfig, allReducers);
// // CREATE STORE WITH THE PERSITATED + ACCESS THE REDUX DEVTOOLS
// let store = createStore(
//     persistedReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// const persistor = persistStore(store);