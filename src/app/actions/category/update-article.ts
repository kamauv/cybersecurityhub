"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  categorySlug: string;
  name: string;
}

export async function updateCategory({ categorySlug, name }: Props) {
  // check if category exists
  try {
    const checkCategory = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!checkCategory) {
      return {
        isSuccess: false,
        error: "Category not found",
        data: null,
      };
    }
  } catch (error) {
    console.error("CHECK_CATEGORY_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }

  // update the category
  try {
    const category = await prisma.category.update({
      where: {
        slug: categorySlug,
      },
      data: {
        name,
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: category,
    };
  } catch (error) {
    console.error("UPDATE_CATEGORY_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
