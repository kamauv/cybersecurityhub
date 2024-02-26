import FormTitle from "@/components/app/form-title";
import CategoryForm from "@/components/forms/category-form";
import Container from "@/components/ui/container";
import React from "react";

const CreateCategory = () => {
  return (
    <Container>
      <FormTitle title="create category" />

      <CategoryForm />
    </Container>
  );
};

export default CreateCategory;
