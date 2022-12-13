import express from "express";
import cors from "cors";

import categoryRouters from "./routes/categories.routes.js";
import gameRouters from "./routes/games.routes.js";
import customerRouters from "./routes/customers.routes.js";
import rentalRouters from "./routes/rentals.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoryRouters);
app.use(gameRouters);
app.use(customerRouters);
app.use(rentalRouters);



app.listen( 4000,() => console.log("Server running in port 4000"))