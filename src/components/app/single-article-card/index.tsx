import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageContainer from "@/components/ui/image-container";
import Link from "next/link";
import React from "react";

const SingleArticleCard = () => {
  return (
    <Link href={"/"}>
      <Card className="overflow-hidden hover:shadow-md">
        <div>
          <ImageContainer
            alt="image"
            imageURL="https://picsum.photos/200"
            ratio={1 / 1}
          />
        </div>
        <div className="py-2 px-2">
          <CardTitle className="text-lg">
            lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. A,
            quia assumenda libero,
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
};

export default SingleArticleCard;
