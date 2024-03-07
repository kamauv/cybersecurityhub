"use client";
import { getArticle } from "@/app/actions/article/get-article";
import { updateArticle } from "@/app/actions/article/update-article";
import { getCategories } from "@/app/actions/categories/get-categories";
import { imageDB } from "@/app/firebasej-config";
import FormTitle from "@/components/app/form-title";
import ArticleForm from "@/components/forms/article-form";
import Container from "@/components/ui/container";
import { useToast } from "@/components/ui/use-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import slugify from "slugify";
import { v4 } from "uuid";

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
          isUpdate
          initialData={{
            categorySlug: article.category.slug,
            content: article.content,
            title: article.title,
            imageURL: article.imageURL,
          }}
          categories={categories.map((category) => ({
            slug: category.slug,
            title: category.name,
          }))}
          onSubmit={async (data) => {
            setIsFormSubmitting(true);
            setSubmissionError("");

            if (data.imageURL && data.imageURL instanceof File) {
              const imgRef = ref(
                imageDB,
                `images/${v4()}-${slugify(data.title)}.${data.imageURL.name
                  .split(".")
                  .pop()}`
              );

              uploadBytes(imgRef, data.imageURL)
                .then((value) => {
                  getDownloadURL(value.ref).then(async (url) => {
                    toast({
                      title: "Image uploaded successfully",
                    });

                    const _updateArticle = await updateArticle({
                      articleSlug: article.slug,
                      categorySlug: data.categorySlug,
                      title: data.title,
                      content: data.content,
                      imageURL: url,
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
                  });
                })
                .catch(async (error) => {
                  toast({
                    title: "Error uploading image",
                    description: "Something went wrong while uploading image",
                    variant: "destructive",
                  });

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
                });
            } else if (data.imageURL && typeof data.imageURL === "string") {
              const _updateArticle = await updateArticle({
                articleSlug: article.slug,
                categorySlug: data.categorySlug,
                title: data.title,
                content: data.content,
                imageURL: data.imageURL,
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
            } else {
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
            }

            return;
          }}
          isFormSubmitting={isFormSubmitting}
          submissionError={submissionError}
        />
      )}
    </Container>
  );
};

export default UpdateArticle;
