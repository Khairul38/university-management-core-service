import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
} from "./academicFaculty.controller";
import { createAcademicFacultyZodSchema } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create-faculty",
  validateRequest(createAcademicFacultyZodSchema),
  createAcademicFaculty
);

router.get("/", getAllAcademicFaculty);
router.get("/:id", getSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;
