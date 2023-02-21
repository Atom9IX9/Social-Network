import "./index.css";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/reduxStore";
import { HashRouter } from "react-router-dom";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <HashRouter basename="/">
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);

reportWebVitals();
