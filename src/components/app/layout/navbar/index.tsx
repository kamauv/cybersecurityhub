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
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex w-full py-5 border-b shadow z-50 bg-background">
      <Container className="flex justify-between items-center">
        {/* logo and or site title */}
        <div>
          <Link href={"/"}>
            <h1 className="font-extrabold text-lg">
              UK Cybersecurity Information Hub
            </h1>
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
          {/* <NavLink
            href="/about"
            isActive={pathname == "/about"}
            title="About"
          /> */}

          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger className="text-sm font-semibold">
              Admin
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem onClick={() => setOpen(false)}>
                <NavLink
                  href="/admin"
                  isActive={pathname == "/admin"}
                  title="Home"
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(false)}>
                <NavLink
                  href="/admin/categories"
                  isActive={pathname == "/admin/categories"}
                  title="Categories"
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(false)}>
                <NavLink
                  href="/admin/create-article"
                  isActive={pathname == "/admin/create-article"}
                  title="Create Article"
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setOpen(false)}>
                <NavLink
                  href="/admin/create-category"
                  isActive={pathname == "/admin/create-category"}
                  title="Create Category"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
