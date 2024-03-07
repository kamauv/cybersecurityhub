import { getArticle } from "@/app/actions/article/get-article";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import ImageContainer from "@/components/ui/image-container";
import React from "react";

// page for showing single article (article details)

const SingleArticlePage = async ({
  params,
}: {
  params: {
    articleSlug: string;
  };
}) => {
  const _articleSlug = params.articleSlug;

  const _getArticle = await getArticle({
    articleSlug: _articleSlug,
  });

  const article = _getArticle.data;

  if (!_getArticle.isSuccess || !article) {
    return (
      <div>
        <h1>Error fetching article</h1>
        <p>{_getArticle.error || "error fetching article"}</p>
      </div>
    );
  }
  console.log(article);
  return (
    <Container>
      <div>
        <h1 className="text-4xl mt-4 font-bold mb-4 capitalize">
          {article.title}
        </h1>
        <p className="text-sm text-muted-foreground capitalize">
          {article.category.name}
        </p>
        <Card className="mt-4 overflow-hidden max-w-4xl">
          <ImageContainer
            imageURL={article.imageURL ? article.imageURL : "/placeholder.webp"}
            alt="article image"
            ratio={16 / 9}
            object="cover"
          />
        </Card>
        <div className="mt-4">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </div>
    </Container>
  );
};

export default SingleArticlePage;
