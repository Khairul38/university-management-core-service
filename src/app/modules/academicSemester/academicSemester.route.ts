import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
} from "./academicSemester.controller";
import { createAcademicSemesterZodSchema } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/create-semester",
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

router.get("/", getAllAcademicSemester);
router.get("/:id", getSingleAcademicSemester);

export const AcademicSemesterRoutes = router;
