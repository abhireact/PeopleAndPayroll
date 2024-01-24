// store.tsx
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import dummyDataReducer from "./reducers/dummyDataReducer";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // key is required, and it should be unique
  storage, // storage is the storage engine to use - defaults to localStorage
  // other configuration options...
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, dummyDataReducer);

// Create the Redux store with the persisted reducer and thunk middleware
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };
