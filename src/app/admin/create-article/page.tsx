"use client";

import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import React from "react";
import ArticleForm from "@/components/forms/article-form";
import FormTitle from "@/components/app/form-title";

// this is the page for creating a single article

const CreateArticle = () => {
  return (
    <Container className="pt-6">
      <FormTitle title="create article" />

      <ArticleForm />
    </Container>
  );
};

export default CreateArticle;
