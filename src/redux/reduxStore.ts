import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import authReducer from "./authReducer";
import contentReducer from "./contentReducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

let rootReducer = combineReducers({
  app: appReducer,
  allContent: contentReducer,
  messagesPage: messagesReducer,
  profilePage: profileReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
});

type PropsTypes<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropsTypes<T>>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export type rootReducerType = typeof store.dispatch;
export type rootStateType = ReturnType<typeof store.getState>

export default store;
