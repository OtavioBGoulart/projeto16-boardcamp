import { Router } from "express";
import {createRental} from "../controllers/rentals.controller.js";
import { validadeRental } from "../middlewares/rentalValidate.middleware.js";

const router = Router();

router.post("/rentals", validadeRental, createRental);


export default router;