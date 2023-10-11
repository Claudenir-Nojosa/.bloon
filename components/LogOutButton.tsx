"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Link } from "@nextui-org/link";

export const LogOutButton = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <Button
      className="text-default-500"
      variant="ghost"
      size="icon"
      onClick={() => handleSignOut()}
    >
      <LogOut className="text-zinc-400 hover:text-zinc-500 hover:opacity-95 transition-all duration-100 mr-3" />
    </Button>
  );
};
export const LogOutButtonDropDown = () => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/");
  };
  return (
    <Link
      className="text-foreground cursor-pointer h-7"
      onClick={() => handleSignOut()}
    >
      Sair
    </Link>
  );
};
