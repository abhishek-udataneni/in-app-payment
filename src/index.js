import { hydrate } from "solid-js/web";
import "./styles/styles.css";
import App from "./components/App";

// entry point for browser
hydrate(() => <App />, document);
