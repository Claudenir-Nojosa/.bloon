"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const LogOutButton = () => {
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
      <LogOut className="text-zinc-500 hover:text-zinc-500 hover:opacity-75 transition-all duration-100" />
    </Button>
  );
};

export default LogOutButton;
