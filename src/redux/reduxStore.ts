import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Action,
} from "redux";
import authReducer from "./authReducer";
import contentReducer from "./contentReducer";
import messagesReducer from "./messagesReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
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

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // ? for using compose
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)) // ? for using thunks
);

// * generic types
export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  rootStateType,
  unknown,
  A
>;

export default store;

// types
export type rootReducerType = typeof store.dispatch;
export type rootStateType = ReturnType<typeof store.getState>;
