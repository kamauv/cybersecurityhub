import { getCategories } from "@/app/actions/categories/get-categories";
import CategoriesTable from "@/components/tables/categories-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import React from "react";

const CategoriesPage = async () => {
  const _getCategories = await getCategories({});

  const categories = _getCategories.data;

  if (_getCategories.isSuccess == false) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Internal server error</AlertTitle>
        <AlertDescription>
          Something went wrong while getting the categories please try again
        </AlertDescription>
      </Alert>
    );
  } else {
    if (categories && categories.length > 0) {
      return (
        <Container>
          <CategoriesTable
            categories={categories.map((category, index) => ({
              id: category.id,
              articlesCount: category._count.articles,
              name: category.name,
              slug: category.slug,
            }))}
          />
        </Container>
      );
    }
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>No categories found</AlertTitle>
      </Alert>
    );
  }
};

export default CategoriesPage;
