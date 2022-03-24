import express from "express";
import path from "path";

import { renderToStream } from "solid-js/web";
import App from "../components/App";

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "../assets")));

app.get("*", (req, res) => renderToStream(() => <App url={req.url} />).pipe(res));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));