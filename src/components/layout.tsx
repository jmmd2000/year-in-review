import Link from "next/link";
import { useRouter } from "next/router";
import { type PropsWithChildren, useState } from "react";
import { Menu, X } from "lucide-react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

export const Layout = (props: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useUser();
  // check if the current page is the homepage
  const router = useRouter();
  const isHomePage = router.pathname === "/";
  return <></>;
};
