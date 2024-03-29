"use client";
import React from "react";
import Hero from "@/components/app/hero";
import SingleArticleCard from "@/components/app/single-article-card";
import Container from "@/components/ui/container";
import Image from "next/image";

import { getCategories } from "./actions/categories/get-categories";

const Home = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await getCategories({});
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // const _getCategories = await getCategories({});
  // const categories = _getCategories.data;

  return (
    <Container>
      <Hero />
      <div className="space-y-6">
        {categories?.map((category) => (
          <div key={category.id}>
            {category.articles.length > 0 && (
              <section key={category.id}>
                <div className="mb-4">
                  <h1 className="capitalize font-bold text-2xl">
                    {category.name}
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {category.articles.map((article, index) => (
                    <SingleArticleCard
                      articleSlug={article.slug}
                      articleTitle={article.title}
                      categoryName={article.category.name}
                      categorySlug={article.category.slug}
                      imageURL={article.imageURL || ""}
                      key={index}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Home;
