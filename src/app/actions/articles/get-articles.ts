"use client";

import prisma from "@/lib/prismaDB";

interface Props {
  categorySlug?: string;
  searchString?: string;
}

export async function getArticles({ categorySlug, searchString }: Props) {
  try {
    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: searchString,
        },
        slug: {
          contains: categorySlug,
        },
      },
    });

    return {
      isSuccess: true,
      error: null,
      data: articles,
    };
  } catch (error) {
    console.error("GET_ARTICLES_ERROR : ", error);

    return {
      isSuccess: false,
      error: "Internal server error",
      data: null,
    };
  }
}
