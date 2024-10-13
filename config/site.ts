export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dev Portfolio Hub",
  description:
    "Discover an amazing collection of developer portfolios. Get inspired by these exceptional sites!",
  navItems: [
    {
      label: "List",
      href: "/list",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "List",
      href: "/list",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/larry-xue/dev-portfolio-hub",
  },
};
