import { Router } from "express";
import { createCustomer, getCustomer, getCustomerById, updateCustomer } from "../controllers/customers.controller.js";
import { validateCustomer } from "../middlewares/customerValidate.middleware.js";

const router = Router();

router.get("/customers", getCustomer);
router.get("/customers/:id", getCustomerById);
router.post("/customers", validateCustomer, createCustomer);
router.put("/customers/:id", validateCustomer,  updateCustomer);

export default router;