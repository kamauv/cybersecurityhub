"use server";

import prisma from "@/lib/prismaDB";
import { slugifyString } from "@/lib/slugify-projectName";

interface Props {
  categoryName: string;
}

export async function createCategory({ categoryName }: Props) {
  // creating the category slug
  const categorySlug = slugifyString(categoryName);

  // check if category exists
  try {
    const checkCategory = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (checkCategory) {
      return {
        isSuccess: false,
        error: "Category already exists",
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

  // create the category
  try {
    const category = await prisma.category.create({
      data: {
        name: categoryName,
        slug: categorySlug,
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: category,
    };
  } catch (error) {
    console.error("CREATE_CATEGORY_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
