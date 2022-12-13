import { Router } from "express";
import {createRental, deleteRental, finishRental, getRentals} from "../controllers/rentals.controller.js";
import { validadeRental } from "../middlewares/rentalValidate.middleware.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validadeRental, createRental);
router.post("/rentals/:id/return", finishRental);
router.delete("/rentals/:id", deleteRental);


export default router;