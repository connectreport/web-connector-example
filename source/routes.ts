import { Router } from "express";
import { getTableHandler } from "./handlers";
import { getFieldValuesHandler } from "./handlers/getFieldValues";
import { getMetadataHandler } from "./handlers/getMetadata";
import util from "util";
import { debug } from "./util";
import TableRequest from "./models/TableRequest";
import { User } from "./models/User";

export const router = Router();

router.post("/getTable", async (req, res) => {
  const { options, user } = req.body as { options: TableRequest; user: User };
  try {
    const tableResponse = await getTableHandler(options, user);
    return res.json(tableResponse);
  } catch (err: any ) {
    res.status(500).json({ message: err.message, disableRetry: err.disableRetry });
  }
});

router.post("/getMetadata", async (req, res) => {
  const { user } = req.body;
  try {
    const response = await getMetadataHandler(user);
    return res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Unknown" });
  }
});

router.post("/getFieldValues", async (req, res) => {
  const { options, user } = req.body;
  try {
    const response = await getFieldValuesHandler(options, user);
    return res.json(response);
  } catch (err) {
    res.status(500).json({ error: "Unknown" });
  }
});

router.get("/loadVisualization", async (req, res) => {
  const { query } = req;
  debug("Received load visualization request", util.inspect(query));
  res.sendFile("./public/loadVisualization.html", {
    root: process.cwd(),
  });
});
