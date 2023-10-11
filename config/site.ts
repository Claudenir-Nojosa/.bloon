export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: ".bloon",
  description: "A Next.js finance app.",
  navItems: [
    {
      label: "Início",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Entrar",
      href: "/login",
    },
  ],
  links: {
    github: "https://github.com/Claudenir-Nojosa",
    twitter: "https://twitter.com/nojosaf",
    docs: "",
    discord: "",
    sponsor: "",
  },
};
