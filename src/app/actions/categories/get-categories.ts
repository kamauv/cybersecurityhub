"use server";

import prisma from "@/lib/prismaDB";

interface Props {}

export async function getCategories({}: Props) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            articles: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: categories,
    };
  } catch (error) {
    console.error("GET_CATEGORIES_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
