import { NavbarItem } from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import { siteNavConfigWithSession } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

export const navbarLinks = () => {
  return (
    <ul className="hidden md:flex gap-4 justify-start ml-2">
      {siteNavConfigWithSession.navItems.map((item) => (
        <NavbarItem key={item.href}>
          <NextLink
            className={clsx(
              linkStyles({ color: "foreground" }),
              "data-[active=true]:text-primary hover:text-green-700 data-[active=true]:font-medium"
            )}
            color="foreground"
            href={item.href}
          >
            {item.label}
          </NextLink>
        </NavbarItem>
      ))}
    </ul>
  );
};
