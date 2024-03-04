"use client";
import ArticlesGrid from "@/components/app/articles-grid";
import SingleArticleCard from "@/components/app/single-article-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { getArticles } from "../actions/articles/get-articles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// this page has a list of all the articles

const ArticlesPage = () => {
  const [articles, setArticles] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    const fetchArticles = async () => {
      setIsFetching(true);
      const _articles = await getArticles({});
      setArticles(_articles.data);
      setIsFetching(false);
    };

    fetchArticles();
  }, []);

  if (isFetching == true) {
    return <div>loading ...</div>;
  }
  if (isFetching == false && articles.length == 0) {
    return <div>No articles found ...</div>;
  }

  return (
    <Container>
      <div>
        <h1 className="text-4xl mt-4 font-bold mb-4">Articles</h1>
      </div>

      <ArticlesGrid
        articles={articles.map((article) => ({
          articleSlug: article.slug,
          articleTitle: article.title,
          imageURL: article.imageURL || "",
          categoryName: article.category.name,
          categorySlug: article.category.slug,
        }))}
      />
    </Container>
  );
};

export default ArticlesPage;
