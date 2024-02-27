"use client";
import { getCategory } from "@/app/actions/category/get-category";
import { updateCategory } from "@/app/actions/category/update-article";
import FormTitle from "@/components/app/form-title";
import CategoryForm from "@/components/forms/category-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const UpdateCaterory = () => {
  const [category, setCategory] = React.useState<any>(null);
  const [isFetchingCategory, setIsFetchingCategory] = React.useState(false);
  const [fetchError, setFetchError] = React.useState("");
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");
  const params = useParams<{ categorySlug: string }>();
  const router = useRouter();
  const { toast } = useToast();
  React.useEffect(() => {
    const categorySlug = params.categorySlug;
    // fetch category from the server
    async function fetchCategory() {
      setIsFetchingCategory(true);
      const res = await getCategory({ categorySlug: categorySlug });
      if (res.data) {
        setCategory(res.data);
      }
      if (res.isSuccess == false) {
        setFetchError(res.error ? res.error : "Error fetching category");
      }
      setIsFetchingCategory(false);
    }

    if (categorySlug) {
      fetchCategory();
    }
  }, []);

  if (isFetchingCategory) {
    return <div>Loading...</div>;
  }

  if (fetchError) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Error fetching category</AlertTitle>
        <AlertDescription>{fetchError}</AlertDescription>
      </Alert>
    );
  }

  if (category) {
    return (
      <Container>
        <FormTitle title="update category" />

        <CategoryForm
          initialData={{
            category: category.name,
          }}
          isFormSubmitting={isFormSubmitting}
          submissionError={submissionError}
          onSubmit={async (data) => {
            // handle form submission
            setIsFormSubmitting(true);
            // handle form submission
            const _updateCategory = await updateCategory({
              categorySlug: category.slug,
              name: data.category,
            });

            if (_updateCategory.isSuccess) {
              toast({
                title: "Category updated",
                description: "Category has been updated successfully",
                variant: "default",
              });
              router.push("/admin/categories");
            } else {
              toast({
                title: "Category updated",
                description: "Category has been updated successfully",
                variant: "destructive",
              });
              setSubmissionError(
                _updateCategory.error || "Error updating category"
              );
            }
            setIsFormSubmitting(false);
          }}
        />
      </Container>
    );
  }
};

export default UpdateCaterory;
