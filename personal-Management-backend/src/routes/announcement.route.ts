import { Router } from "express";
import {
  getAllAnnouncement,
  getSingleAnnouncement,
  getAnnouncementsByDepartment,
  getAnnouncementsByEmployee,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../controller/announcement.controller";

const router = Router();

// get all Announcement
router.get("/all", getAllAnnouncement);

// get single Announcement
router.get("/single/:id", getSingleAnnouncement);

// get department Announcement
router.get("/department/:departmentName", getAnnouncementsByDepartment);

// get employee Announcement
router.get("/employee/:employeeId", getAnnouncementsByEmployee);

// create Announcement
router.post("/create", addAnnouncement);

//update Announcement
router.put("/update/:id", updateAnnouncement);

// delete Announcement
router.delete("/delete/:id", deleteAnnouncement);

export default router;
