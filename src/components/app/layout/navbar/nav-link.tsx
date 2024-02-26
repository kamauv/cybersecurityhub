import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  title: string;
  isActive?: boolean;
}

const NavLink = ({ href, title, isActive }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        "font-semibold hover:text-primary",
        isActive && "text-primary"
      )}
    >
      {title}
    </Link>
  );
};

export default NavLink;
