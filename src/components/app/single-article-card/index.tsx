import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ImageContainer from "@/components/ui/image-container";
import Link from "next/link";
import React from "react";

const SingleArticleCard = () => {
  return (
    <>
      <Card className="overflow-hidden hover:shadow-md group">
        <Link href={""}>
          <ImageContainer
            alt="image"
            imageURL="https://picsum.photos/200"
            ratio={1 / 1}
          />
        </Link>
        <div className="py-2 px-2">
          <div>
            <Link href="" className="hover:underline">
              <small>category</small>
            </Link>
          </div>
          <Link href={""}>
            <CardTitle className="text-base group-hover:text-primary hover:underline">
              lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. A,
              quia assumenda libero,
            </CardTitle>
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SingleArticleCard;
