"use client";
import ArticlesTable from "@/components/tables/articles-table";
import Container from "@/components/ui/container";
import React from "react";
import { getArticles } from "../actions/articles/get-articles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// the main admins home page contains a list of all the articles

const AdminHome = () => {
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
      <ArticlesTable
        articles={articles.map((article) => ({
          id: article.id,
          title: article.title,
          content: article.content,
          categoryName: article.category.name,
          articleSlug: article.slug,
        }))}
      />
    </Container>
  );
};

export default AdminHome;
