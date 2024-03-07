"use client";

import { Card } from "@/components/ui/card";
import Container from "@/components/ui/container";
import React from "react";
import ArticleForm from "@/components/forms/article-form";
import FormTitle from "@/components/app/form-title";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { createArticle } from "@/app/actions/article/create-article";
import { getCategories } from "@/app/actions/categories/get-categories";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDB } from "@/app/firebasej-config";
import { v4 } from "uuid";
import slugify from "slugify";

// this is the page for creating a single article

const CreateArticle = () => {
  const [submissionError, setSubmissionError] = React.useState("");
  const [isFormSubmitting, setIsFormSubmitting] = React.useState(false);
  const [categories, setCategories] = React.useState<any>([]); // this will be fetched from the server
  const [uploadedImageURL, setUploadedImageURL] = React.useState("");

  React.useEffect(() => {
    // fetch categories from the server
    async function fetchCategories() {
      const res = await getCategories({});

      if (res.data && res.data.length > 0) {
        setCategories(res.data);
      }
    }

    fetchCategories();
  }, []);

  const { toast } = useToast();
  const router = useRouter();

  return (
    <Container className="pt-6">
      <FormTitle title="create article" />

      <ArticleForm
        onSubmit={async (data) => {
          setIsFormSubmitting(true);
          setSubmissionError("");

          if (data.imageURL) {
            // upload image to firebase
            const imgRef = ref(
              imageDB,
              `images/${v4()}-${slugify(data.title)}.${data.imageURL.name
                .split(".")
                .pop()}`
            );

            uploadBytes(imgRef, data.imageURL)
              .then((value) => {
                getDownloadURL(value.ref).then(async (url) => {
                  setUploadedImageURL(url);

                  toast({
                    title: "Image uploaded successfully",
                    description: "Redirecting to articles page",
                  });

                  const _createArticle = await createArticle({
                    categorySlug: data.categorySlug,
                    content: data.content,
                    title: data.title,
                    imageURL: url,
                  });

                  if (_createArticle.isSuccess) {
                    setSubmissionError("");
                    setIsFormSubmitting(false);
                    toast({
                      title: "Article created successfully",
                      description: "Redirecting to articles page",
                    });
                    router.push("/admin");
                  } else {
                    setSubmissionError(
                      _createArticle.error
                        ? _createArticle.error
                        : "Error creating article"
                    );
                    setIsFormSubmitting(false);
                  }
                });
              })
              .catch((error) => {
                toast({
                  title: "Error uploading image",
                  description: "Something went wrong while uploading image",
                  variant: "destructive",
                });
              });
          } else {
            const _createArticle = await createArticle({
              categorySlug: data.categorySlug,
              content: data.content,
              title: data.title,
            });

            if (_createArticle.isSuccess) {
              setSubmissionError("");
              setIsFormSubmitting(false);
              toast({
                title: "Article created successfully",
                description: "Redirecting to articles page",
              });
              router.push("/admin");
            } else {
              setSubmissionError(
                _createArticle.error
                  ? _createArticle.error
                  : "Error creating article"
              );
              setIsFormSubmitting(false);
            }
          }
        }}
        categories={categories.map((category: any) => ({
          title: category.name,
          slug: category.slug,
        }))}
        submissionError={submissionError}
        isFormSubmitting={isFormSubmitting}
      />
    </Container>
  );
};

export default CreateArticle;
