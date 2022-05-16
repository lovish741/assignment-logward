import "./App.scss";
import Assignment from "./component/Assignment";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Assignment />
    </Provider>
  );
}

export default App;
