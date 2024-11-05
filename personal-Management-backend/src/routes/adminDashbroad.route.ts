import { Router } from "express";

import { getTotalEmployee } from "../controller/adminDashbroad.controller";

const router = Router();

// get all Total employee
router.get("/total", getTotalEmployee);

// admin login
// router.post("/admin/login", adminLogin);

// // user logout
// router.delete("/logout", logout);

export default router;
