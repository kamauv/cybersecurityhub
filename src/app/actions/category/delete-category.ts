"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  categorySlug: string;
}

export async function deleteCategory({ categorySlug }: Props) {
  // check if the category exists
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

  //  delete the category
  try {
    const deleteCategory = await prisma.category.delete({
      where: {
        slug: categorySlug,
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: deleteCategory,
    };
  } catch (error) {
    console.error("DELETE_CATEGORY_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
