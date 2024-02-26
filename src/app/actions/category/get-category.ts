"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  categorySlug: string;
}

export async function getCategory({ categorySlug }: Props) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      return {
        isSuccess: false,
        error: "Category not found",
        data: null,
      };
    }

    return {
      isSuccess: true,
      error: null,
      data: category,
    };
  } catch (error) {
    console.error("GET_CATEGORY_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
