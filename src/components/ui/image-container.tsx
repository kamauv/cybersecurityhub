import Image from "next/image";
import React from "react";
import { AspectRatio } from "./aspect-ratio";
import { cn } from "@/lib/utils";

const ImageContainer = ({
  imageURL,
  alt,
  ratio,
  object,
}: {
  imageURL: string;
  alt: string;
  ratio: number;
  object?: "cover" | "contain";
}) => {
  return (
    <div>
      <AspectRatio ratio={ratio} className="relative object-contain bg-muted">
        <Image
          alt={alt}
          src={imageURL}
          fill
          className={cn(
            object == "cover"
              ? "object-cover"
              : object == "contain"
              ? "object-contain"
              : "object-contain"
          )}
        />
      </AspectRatio>
    </div>
  );
};

export default ImageContainer;
