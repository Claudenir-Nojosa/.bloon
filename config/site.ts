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
export const siteNavConfigWithSession = {
  navItems: [
    {
      label: "Início",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Perfil",
      href: "/profile",
    },
    {
      label: "Nova receita",
      href: "/create/income",
    },
    {
      label: "Nova despesa",
      href: "/create/expense",
    },
    {
      label: "Metas",
      href: "/goals",
    },
    {
      label: "Sair",
      href: "/login",
    },
  ],
};
export const siteNavConfigWithoutSession = {
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
};
