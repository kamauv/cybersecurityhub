import Hero from "@/components/app/hero";
import SingleArticleCard from "@/components/app/single-article-card";
import Container from "@/components/ui/container";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Hero />
      <div className="space-y-6">
        <section>
          <div className="mb-4">
            <h1 className="capitalize font-bold text-2xl"> category</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((article, index) => (
              <SingleArticleCard key={index} />
            ))}
          </div>
        </section>
        <section>
          <div className="mb-4">
            <h1 className="capitalize font-bold text-2xl"> category</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((article, index) => (
              <SingleArticleCard key={index} />
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
