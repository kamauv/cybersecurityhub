"use client";

import { createCategory } from "@/app/actions/category/create-category";
import FormTitle from "@/components/app/form-title";
import CategoryForm from "@/components/forms/category-form";
import Container from "@/components/ui/container";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import React from "react";

const CreateCategory = () => {
  const [submissionError, setSubmissionError] = React.useState("");
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  return (
    <Container>
      <FormTitle title="create category" />

      <CategoryForm
        onSubmit={async (data) => {
          setIsFormSubmitting(true);
          const _createCategory = await createCategory({
            categoryName: data.category,
          });

          if (_createCategory.isSuccess) {
            setSubmissionError("");
            toast({
              title: "Category created successfully",
              description: "Redirecting to categories page",
            });
            setIsFormSubmitting(false);
            router.push("/admin/categories");
          } else {
            setSubmissionError(
              _createCategory.error
                ? _createCategory.error
                : "Error creating category"
            );
            setIsFormSubmitting(false);
          }
        }}
        submissionError={submissionError}
        isFormSubmitting={isFormSubmitting}
      />
    </Container>
  );
};

export default CreateCategory;
