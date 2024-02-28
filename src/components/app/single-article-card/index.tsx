import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageContainer from "@/components/ui/image-container";
import Link from "next/link";
import React from "react";

interface Props {
  articleSlug: string;
  articleTitle: string;
  imageURL?: string;
  categoryName: string;
  categorySlug: string;
}

const SingleArticleCard = ({
  articleSlug,
  articleTitle,
  imageURL,
  categoryName,
  categorySlug,
}: Props) => {
  return (
    <>
      <Card className="overflow-hidden hover:shadow-md group">
        <Link href={""}>
          <ImageContainer
            alt="image"
            imageURL={imageURL ? imageURL : "/placeholder.webp"}
            ratio={1 / 1}
          />
        </Link>
        <div className="py-2 px-2">
          <div>
            <Link
              href={`/category/${categorySlug}`}
              className="hover:underline"
            >
              <small>{categoryName}</small>
            </Link>
          </div>
          <Link href={`/article/${articleSlug}`}>
            <CardTitle className="text-base group-hover:text-primary hover:underline">
              {articleTitle}
            </CardTitle>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SingleArticleCard;
