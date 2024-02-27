"use server";

import prisma from "@/lib/prismaDB";
import { slugifyString } from "@/lib/slugify-projectName";

interface Props {
  title: string;
  content: string;
  categorySlug: string;
  imageURL?: string;
}

export async function createArticle({
  title,
  content,
  categorySlug,
  imageURL,
}: Props) {
  // creating the articles slug
  const articleSlug = slugifyString(title);
  // check if the category exist

  try {
    const checkCategory = await prisma.category.findFirst({
      where: {
        slug: categorySlug,
      },
    });

    if (!checkCategory) {
      return {
        isSuccess: false,
        error: "Category does not exist",
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

  // checking if the article with that slug exists
  try {
    const checkArticle = await prisma.article.findFirst({
      where: {
        slug: articleSlug,
      },
    });

    if (checkArticle) {
      return {
        isSuccess: false,
        error: "Project already exists",
        data: null,
      };
    }
  } catch (error) {
    console.error("CHECK_ARTICLE_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }

  // creating article
  try {
    const createArticle = await prisma.article.create({
      data: {
        title,
        content,
        slug: articleSlug,
        imageURL,
        category: {
          connect: {
            slug: categorySlug,
          },
        },
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: createArticle,
    };
  } catch (error) {
    console.log("CREATE_ARTICLE_ERROR : ", error);
    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
