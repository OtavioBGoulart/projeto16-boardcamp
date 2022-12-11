import express from "express";
import cors from "cors";

import categoryRouters from "./routes/categories.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoryRouters);



app.listen( 4000,() => console.log("Server running in port 4000"))