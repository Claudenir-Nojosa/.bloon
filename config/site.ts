export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: ".bloon",
  description: "A Next.js finance app.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
  ],
  links: {
    github: "",
    twitter: "",
    docs: "",
    discord: "",
    sponsor: "",
  },
};
