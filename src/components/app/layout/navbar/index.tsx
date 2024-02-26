"use client";
import Container from "@/components/ui/container";
import React from "react";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0 flex w-full py-5 border-b shadow z-50 bg-background">
      <Container className="flex justify-between items-center">
        {/* logo and or site title */}
        <div>
          <h1 className="font-extrabold text-lg">CyberHub</h1>
        </div>

        {/* nav items or links */}
        <div className="flex space-x-4">
          <NavLink href="/" isActive={pathname == "/"} title="Home" />
          <NavLink
            href="/articles"
            isActive={pathname == "/articles"}
            title="Articles"
          />
          <NavLink
            href="/about"
            isActive={pathname == "/about"}
            title="About"
          />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
