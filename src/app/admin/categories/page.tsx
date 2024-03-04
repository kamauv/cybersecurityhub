"use client";
import { getCategories } from "@/app/actions/categories/get-categories";
import CategoriesTable from "@/components/tables/categories-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Container from "@/components/ui/container";
import React from "react";

const CategoriesPage = () => {
  const [isFetching, setIsFetching] = React.useState(true);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      setIsFetching(true);
      const _categories = await getCategories({});
      setCategories(_categories.data);
      setIsFetching(false);
    };

    fetchCategories();
  }, []);

  if (isFetching == true) {
    return <div>loading ...</div>;
  }
  if (isFetching == false && categories.length == 0) {
    return <div>No articles found ...</div>;
  }

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
};

export default CategoriesPage;
