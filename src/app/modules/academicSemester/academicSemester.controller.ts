import { AcademicSemester } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicSemesterFilterableFields } from "./academicSemester.constant";
import {
  createAcademicSemesterToDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
} from "./academicSemester.service";

export const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicSemesterToDB(req.body);

    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic semester created successfully",
      data: result,
    });
  }
);

export const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicSemesterFilterableFields);
    const pagination = pick(req.query, paginationFields);

    const result = await getAllAcademicSemesterFromDB(filters, pagination);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All academic semester fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleAcademicSemesterFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single academic semester fetched successfully",
      data: result,
    });
  }
);
