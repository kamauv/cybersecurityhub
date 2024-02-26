import FormTitle from "@/components/app/form-title";
import ArticleForm from "@/components/forms/article-form";
import Container from "@/components/ui/container";
import React from "react";

//this is the page for updating the article

const UpdateArticle = () => {
  return (
    <Container>
      <FormTitle title="update article" />

      <ArticleForm />
    </Container>
  );
};

export default UpdateArticle;
