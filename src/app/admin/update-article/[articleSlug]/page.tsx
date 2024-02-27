"use client";
import { getArticle } from "@/app/actions/article/get-article";
import { updateArticle } from "@/app/actions/article/update-article";
import { getCategories } from "@/app/actions/categories/get-categories";
import FormTitle from "@/components/app/form-title";
import ArticleForm from "@/components/forms/article-form";
import Container from "@/components/ui/container";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import React from "react";

//this is the page for updating the article

const UpdateArticle = () => {
  const [article, setArticle] = React.useState<any>(null);
  const params = useParams<{ articleSlug: string }>();
  const [isFetchingArticle, setIsFetchingArticle] = React.useState(false);
  const [fetchError, setFetchError] = React.useState("");
  const [categories, setCategories] = React.useState<any[]>([]);
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);
  const [submissionError, setSubmissionError] = React.useState("");
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    const articleSlug = params.articleSlug;

    // fetch article from the server
    async function fetchArticle() {
      setIsFetchingArticle(true);
      const res = await getArticle({ articleSlug: articleSlug });
      if (res.data) {
        setArticle(res.data);
        setIsFetchingArticle(false);
      }
      if (res.isSuccess == false) {
        setFetchError(res.error ? res.error : "Error fetching article");
      }
    }

    // fetching the categories
    async function fetchCategories() {
      const res = await getCategories({});
      if (res.data) {
        setCategories(res.data);
      }
      if (res.isSuccess == false) {
        setFetchError(res.error ? res.error : "Error fetching categories");
      }
    }

    if (articleSlug) {
      fetchArticle();
      fetchCategories();
    }
  }, [params.articleSlug]);

  if (isFetchingArticle) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div>
        <p>{fetchError}</p>
      </div>
    );
  }

  return (
    <Container>
      <FormTitle title="update article" />
      {article && categories && categories.length > 0 && (
        <ArticleForm
          initialData={{
            categorySlug: article.category.slug,
            content: article.content,
            title: article.title,
          }}
          categories={categories.map((category) => ({
            slug: category.slug,
            title: category.name,
          }))}
          onSubmit={async (data) => {
            setIsFormSubmitting(true);

            const _updateArticle = await updateArticle({
              articleSlug: article.slug,
              categorySlug: data.categorySlug,
              title: data.title,
              content: data.content,
            });

            if (_updateArticle.isSuccess) {
              setSubmissionError("");
              toast({
                title: "Article updated",
                description: "Article updated successfully",
                variant: "default",
              });
              router.push("/admin");
            } else {
              setSubmissionError(
                _updateArticle.error || "Error updating article"
              );
              toast({
                title: "Error",
                description: _updateArticle.error
                  ? _updateArticle.error
                  : "Error updating article",
                variant: "destructive",
              });
            }
            setIsFormSubmitting(false);
          }}
          isFormSubmitting={isFormSubmitting}
          submissionError={submissionError}
        />
      )}
    </Container>
  );
};

export default UpdateArticle;
