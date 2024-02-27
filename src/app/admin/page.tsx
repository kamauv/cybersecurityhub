import ArticlesTable from "@/components/tables/articles-table";
import Container from "@/components/ui/container";
import React from "react";
import { getArticles } from "../actions/articles/get-articles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// the main admins home page contains a list of all the articles

const AdminHome = async () => {
  const _articles = await getArticles({});

  const articles = _articles.data;

  if (!_articles.isSuccess) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Internal server error</AlertTitle>
        <AlertDescription>
          Something went wrong while getting the articles please try again
        </AlertDescription>
      </Alert>
    );
  } else {
    if (articles && articles.length > 0) {
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
    } else {
      return (
        <Alert variant={"destructive"}>
          <AlertTitle>No articles found</AlertTitle>
          <AlertDescription>No articles found in the database</AlertDescription>
        </Alert>
      );
    }
  }
};

export default AdminHome;
