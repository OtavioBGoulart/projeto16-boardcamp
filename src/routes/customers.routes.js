import { Router } from "express";
import { createCustomer } from "../controllers/customers.controller.js";
import { validateCustomer } from "../middlewares/customerValidate.middleware.js";

const router = Router();

//router.get("/customers", getCustomer);
//router.get("customers/:id", getCustomerById);
router.post("/customers", validateCustomer, createCustomer);
//router.put("./customers", updateCustomer);

export default router;