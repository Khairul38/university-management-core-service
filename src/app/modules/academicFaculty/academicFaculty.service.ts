import { AcademicFaculty, Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";
import { IAcademicFacultyFilters } from "./academicFaculty.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { calculatePagination } from "../../../helpers/paginationHelper";
import { academicFacultySearchableFields } from "./academicFaculty.constant";

export const createAcademicFacultyToDB = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });

  return result;
};

export const getAllAcademicFacultyFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      OR: academicFacultySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          equals: (filtersData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.AcademicFacultyWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.academicFaculty.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
  });
  const total = await prisma.academicFaculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

export const getSingleAcademicFacultyFromDB = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({
    where: {
      id,
    },
  });

  return result;
};
