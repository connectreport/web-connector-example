import express, { json } from "express";
import { router } from "./routes";
import path from "path";

const app = express();
app.use(json(), router, express.static(path.join(process.cwd(), '/public')));

app.listen(4232)
console.log("Web connector listening on 4232", "– Debug:", process.env.DEBUG)