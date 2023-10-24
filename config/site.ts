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
      imgURL: "https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/receita.png?raw=true",
      label: "Receita",
      href: "/create/income",
    },
    {
      imgURL: "https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/despesa.png?raw=true",
      label: "Despesa",
      href: "/create/expense",
    },
    {
      imgURL: "https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/home.png?raw=true",
      label: "Início",
      href: "/",
    },
    {
      imgURL: "https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/metas.png?raw=true",
      label: "Metas",
      href: "/goals",
    },
    {
      imgURL: "https://github.com/Claudenir-Nojosa/servidor_estaticos/blob/main/logout.png?raw=true",
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
