import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid  py-8  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Cyber security hub
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut officia
            reiciendis, aliquid delectus nobis explicabo nulla cumque
            repudiandae nam magnam culpa maxime veniam impedit voluptas
            provident ullam iusto vitae eligendi.
          </p>
          <Link href="/articles">
            <Button>Explore</Button>
          </Link>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
