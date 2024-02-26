"use server";

import prisma from "@/lib/prismaDB";

interface Props {
  articleSlug: string;
}

export async function getArticle({ articleSlug }: Props) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug: articleSlug,
      },
    });

    if (!article) {
      return {
        isSuccess: false,
        error: "Article not found",
        data: null,
      };
    }

    return {
      isSuccess: true,
      error: null,
      data: article,
    };
  } catch (error) {
    console.error("GET_ARTICLE_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
