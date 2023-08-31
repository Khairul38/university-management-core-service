import { AcademicDepartment } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { academicDepartmentFilterableFields } from "./academicDepartment.constant";
import {
  createAcademicDepartmentToDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
} from "./academicDepartment.service";

export const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await createAcademicDepartmentToDB(req.body);

    sendResponse<AcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic department created successfully",
      data: result,
    });
  }
);

export const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, academicDepartmentFilterableFields);
    const pagination = pick(req.query, paginationFields);

    const result = await getAllAcademicDepartmentFromDB(filters, pagination);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "All academic department fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

export const getSingleAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleAcademicDepartmentFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single academic department fetched successfully",
      data: result,
    });
  }
);
