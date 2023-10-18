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
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Receita",
      href: "/create/income",
    },
    {
      label: "Despesa",
      href: "/create/expense",
    },
    {
      label: "Categorias",
      href: "/create/categories",
    },
    {
      label: "Metas",
      href: "/goals",
    },
  ],
  navLeftMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Sair",
      href: "/login",
    },
  ],
  navMenuItems: [
    {
      imgURL: "/assets/income.svg",
      label: "Receita",
      href: "/create/income",
    },
    {
      imgURL: "/assets/expense.svg",
      label: "Despesa",
      href: "/create/expense",
    },
    {
      imgURL: "/assets/home.svg",
      label: "Início",
      href: "/",
    },
    {
      imgURL: "/assets/goal.svg",
      label: "Metas",
      href: "/goals",
    },
    {
      imgURL: "/assets/logout.svg",
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
