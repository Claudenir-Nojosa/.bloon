import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { LogIn } from "lucide-react";
import { link as linkStyles } from "@nextui-org/theme";
import {
  siteConfig,
  siteNavConfigWithSession,
  siteNavConfigWithoutSession,
} from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { ThemeSwitch } from "@/components/theme-switch";
import { TwitterIcon, GithubIcon } from "@/components/icons";
import { LogOutButton, LogOutButtonDropDown } from "./LogOutButton";
import { auth } from "@/lib/auth";
import { navbarLinks } from "./navbarLinks";

export const Navbar = async () => {
  const session = await auth();
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Parte da esquerda */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">.bloon</p>
          </NextLink>
        </NavbarBrand>
        {session?.user && navbarLinks()}
      </NavbarContent>
      {/* Parte da direita */}
      <NavbarContent
        className="hidden md:flex basis-1/5 md:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          {session?.user ? (
            <LogOutButton />
          ) : (
            <NextLink href="/login">
              <LogIn className="text-zinc-500 hover:text-zinc-500 hover:opacity-75 transition-all duration-100" />
            </NextLink>
          )}
        </NavbarItem>
      </NavbarContent>
      {/* Parte da direita versão mobile */}
      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      {/* Parte da direita versão mobile dropdown */}
      <NavbarMenu>
        {session?.user ? (
          <div className="mx-4 mt-2 flex flex-col gap-2 text-zinc-300">
            {siteNavConfigWithSession.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                {item.label === "Sair" ? (
                  <LogOutButtonDropDown />
                ) : (
                  <Link color="foreground" href={item.href} size="lg">
                    {item.label}
                  </Link>
                )}
              </NavbarMenuItem>
            ))}
          </div>
        ) : (
          <div className="mx-4 mt-2 flex flex-col gap-2 text-zinc-300">
            {siteNavConfigWithoutSession.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link color="foreground" href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        )}
      </NavbarMenu>
    </NextUINavbar>
  );
};
