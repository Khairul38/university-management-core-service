import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
} from "./faculty.controller";
import { createFacultyZodSchema } from "./faculty.validation";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(createFacultyZodSchema),
  createFaculty
);
router.get("/", getAllFaculty);
router.get("/:id", getSingleFaculty);

export const FacultyRoutes = router;
