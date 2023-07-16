import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./db/conn.js";
import { host, port } from "./config.js";
import { userRouter } from "./routes/userRouter.js";
import { customerRouter } from "./routes/customerRouter.js";
import { corporationtodoRouter } from "./routes/corporationtodoRouter.js";
import { productCategoryRouter } from "./routes/productcategoryRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { productionSiteRouter } from "./routes/productionsiteRouter.js";
import { riskScoreRouter } from "./routes/riskscoreRouter.js";
import { supplierToDoRouter } from "./routes/suppliertodoRouter.js";
import { supplierRouter } from "./routes/supplierRouter.js";
import cors from "cors";

dotenv.config();

const app: Express = express();

app.use(cors());

app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/product", productRouter);
app.use("/productcategory", productCategoryRouter);
app.use("/productionsite", productionSiteRouter);
app.use("/riskscore", riskScoreRouter);
app.use("/supplier", supplierRouter);
app.use("/suppliertodo", supplierToDoRouter);
app.use("/corporationtodo", corporationtodoRouter);

app.use(express.static("public"));

app.get("/", async (req: Request, res: Response) => {
  res.send("Server is alive and healthy");
});

app.listen(port, async () => {
  console.log(`⚡️[server]: Server is running at ${host}:${port}`);
  console.log("connecting to database...");
  try {
    await connectToDatabase();
    console.log("connected to database");
  } catch (err) {
    console.log("error connecting to database");
    console.log(err);
  }
});
