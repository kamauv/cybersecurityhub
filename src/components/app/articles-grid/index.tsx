import React from "react";
import SingleArticleCard from "../single-article-card";

interface Props {
  articles: {
    articleSlug: string;
    articleTitle: string;
    imageURL?: string;
    categoryName: string;
    categorySlug: string;
  }[];
}

const ArticlesGrid = ({ articles }: Props) => {
  return (
    <div>
      {/* grid showing the articles */}
      {articles && articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {articles.map((article, index) => (
            <SingleArticleCard
              articleSlug={article.articleSlug}
              articleTitle={article.articleTitle}
              imageURL={article.imageURL}
              categoryName={article.categoryName}
              categorySlug={article.categorySlug}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div>
          <p>No articles found</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesGrid;
