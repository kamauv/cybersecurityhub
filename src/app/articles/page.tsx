import SingleArticleCard from "@/components/app/single-article-card";
import Container from "@/components/ui/container";
import React from "react";

// this page has a list of all the articles

const ArticlesPage = () => {
  return (
    <Container>
      {/* some filters and search */}
      <div className="mb-6 py-4 flex justify-between">
        {/* search */}
        <div>search</div>

        {/* filter */}
        <div>filter</div>
      </div>

      {/* grid showing the articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((article, index) => (
          <SingleArticleCard key={index} />
        ))}
      </div>
    </Container>
  );
};

export default ArticlesPage;
