"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  articleSlug: string;
  title: string;
  categorySlug: string;
  imageURL?: string;
  content: string;
}

export async function updateArticle({
  articleSlug,
  title,
  categorySlug,
  imageURL,
  content,
}: Props) {
  // check if the article exists
  try {
    const checkArticle = await prisma.article.findFirst({
      where: {
        slug: articleSlug,
      },
    });

    if (!checkArticle) {
      return {
        isSuccess: false,
        error: "Article not found",
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

  //   update the article
  try {
    const updateArticle = await prisma.article.update({
      where: {
        slug: articleSlug,
      },
      data: {
        title,
        imageURL,
        content,
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
      data: updateArticle,
    };
  } catch (error) {
    console.error("UPDATE_ARTICLE_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
