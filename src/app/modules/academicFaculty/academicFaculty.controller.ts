import { AcademicFaculty } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicFacultyFilterableFields } from "./academicFaculty.constant";
import {
  createAcademicFacultyToDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
} from "./academicFaculty.service";

export const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicFacultyToDB(req.body);

    sendResponse<AcademicFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic faculty created successfully",
      data: result,
    });
  }
);

export const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicFacultyFilterableFields);
    const pagination = pick(req.query, paginationFields);

    const result = await getAllAcademicFacultyFromDB(filters, pagination);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All academic faculty fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleAcademicFacultyFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single academic faculty fetched successfully",
      data: result,
    });
  }
);
