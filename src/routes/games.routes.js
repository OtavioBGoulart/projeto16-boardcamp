import { Router } from "express";
import { getGames, createGame } from "../controllers/games.controller.js"
import { validateGame } from "../middlewares/gameValidate.middleware.js";

const router = Router();


router.get("/games", getGames);
router.post("/games", validateGame, createGame);

export default router;