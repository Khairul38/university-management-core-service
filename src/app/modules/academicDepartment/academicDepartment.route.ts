import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
} from "./academicDepartment.controller";
import { createAcademicDepartmentZodSchema } from "./academicDepartment.validation";

const router = express.Router();

router.post(
  "/create-department",
  validateRequest(createAcademicDepartmentZodSchema),
  createAcademicDepartment
);

router.get("/", getAllAcademicDepartment);
router.get("/:id", getSingleAcademicDepartment);

export const AcademicDepartmentRoutes = router;
