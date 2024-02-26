"use client";

import { createCategory } from "@/app/actions/category/create-category";
import FormTitle from "@/components/app/form-title";
import CategoryForm from "@/components/forms/category-form";
import Container from "@/components/ui/container";
import React from "react";

const CreateCategory = () => {
  return (
    <Container>
      <FormTitle title="create category" />

      <CategoryForm
        onSubmit={async (data) => {
          const createCat = await createCategory({
            categoryName: data.category,
          });

          console.log(createCat);
        }}
      />
    </Container>
  );
};

export default CreateCategory;
