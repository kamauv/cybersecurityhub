"use client";
import Container from "@/components/ui/container";
import React from "react";
import NavLink from "./nav-link";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="sticky left-0 top-0 flex w-full py-5 border-b shadow z-50 bg-background">
      <Container className="flex justify-between items-center">
        {/* logo and or site title */}
        <div>
          <Link href={"/"}>
            <h1 className="font-extrabold text-lg">CyberHub</h1>
          </Link>
        </div>

        {/* nav items or links */}
        <div className="flex space-x-4 items-center">
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

          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-semibold">
              Admin
            </DropdownMenuTrigger>
            <DropdownMenuContent className="right-0">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
