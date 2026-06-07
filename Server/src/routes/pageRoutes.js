import { Router } from "express";
import { registeration, login } from "../controllers/authController.js";
import { newContent, content, deleteContent, shareContent, updateContent } from "../controllers/crudController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/content", isAuthenticated, content)
router.post("/signup", registeration)
router.post("/signin", login)
router.post("/addcontent", isAuthenticated, newContent)
router.delete("/delete/:contentId", isAuthenticated, deleteContent)
router.put("/update/:contentId", isAuthenticated, updateContent)
router.get("/share/:userId", shareContent)

export default router;
