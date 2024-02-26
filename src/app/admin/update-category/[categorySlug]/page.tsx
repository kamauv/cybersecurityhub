import FormTitle from "@/components/app/form-title";
import CategoryForm from "@/components/forms/category-form";
import Container from "@/components/ui/container";
import React from "react";

const UpdateCaterory = () => {
  return (
    <Container>
      <FormTitle title="update category" />

      <CategoryForm />
    </Container>
  );
};

export default UpdateCaterory;
