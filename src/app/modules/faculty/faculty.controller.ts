import { Faculty } from "@prisma/client";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { facultyFilterableFields } from "./faculty.constant";
import {
  createFacultyToDB,
  getAllFacultyFromDB,
  getSingleFacultyFromDB,
} from "./faculty.service";

export const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await createFacultyToDB(req.body);

  sendResponse<Faculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty created successfully",
    data: result,
  });
});

export const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const pagination = pick(req.query, paginationFields);

  const result = await getAllFacultyFromDB(filters, pagination);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All faculty fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const getSingleFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const result = await getSingleFacultyFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single faculty fetched successfully",
      data: result,
    });
  }
);
