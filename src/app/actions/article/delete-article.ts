"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  articleSlug: string;
}

export async function deleteArticle({ articleSlug }: Props) {
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

  //   delete the article
  try {
    const deleteArticle = await prisma.article.delete({
      where: {
        slug: articleSlug,
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: deleteArticle,
    };
  } catch (error) {
    console.error("DELETE_ARTICLE_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
