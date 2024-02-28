// "use client";
import ArticlesGrid from "@/components/app/articles-grid";
import SingleArticleCard from "@/components/app/single-article-card";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { getArticles } from "../actions/articles/get-articles";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// this page has a list of all the articles

const ArticlesPage = async () => {
  const _articles = await getArticles({});

  const articles = _articles.data;

  if (!_articles.isSuccess) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Error fetching articles</AlertTitle>
        <AlertDescription>
          {_articles.error || "error fetching articles"}
        </AlertDescription>
      </Alert>
    );
  }

  if (articles && articles.length > 0) {
    return (
      <Container>
        <div>
          <h1 className="text-4xl mt-4 font-bold mb-4">Articles</h1>
        </div>

        {/* some filters and search */}
        <div className="mb-6 py-4 flex justify-between space-x-6">
          {/* search */}
          <div className="flex w-full max-w-2xl items-center space-x-2">
            <Input type="search" placeholder="Search articles" />
            <Button type="submit">Search</Button>
          </div>

          {/* filter */}
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <ArticlesGrid
          articles={articles.map((article) => ({
            articleSlug: article.slug,
            articleTitle: article.title,
            imageURL: article.imageURL || "",
            categoryName: article.category.name,
            categorySlug: article.category.slug,
          }))}
        />

        {/* <div className="mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div> */}
      </Container>
    );
  } else {
    return (
      <Alert variant={"default"}>
        <AlertTitle>No articles found</AlertTitle>
        <AlertDescription>No articles found</AlertDescription>
      </Alert>
    );
  }
};

export default ArticlesPage;
