import Hero from "@/components/app/hero";
import SingleArticleCard from "@/components/app/single-article-card";
import Container from "@/components/ui/container";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Hero />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((article, index) => (
          <SingleArticleCard key={index} />
        ))}
      </div>
    </Container>
  );
}
