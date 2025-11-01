import { baseNavigationObj } from "../baseNavigation";
import { NavigationTree } from "@/@types/navigation";

const ROOT_DASHBOARDS = "/dashboards";

const path = (root: string, item: string) => `${root}${item}`;

export const dashboards: NavigationTree = {
  ...baseNavigationObj["dashboards"],
  type: "root",
  childs: [
    {
      id: "dashboards.home",
      path: path(ROOT_DASHBOARDS, "/home"),
      type: "item",
      title: "Home",
      icon: "dashboards.sales",
    },
    {
      id: "dashboards.divide-1",
      type: "divider",
    },
    {
      id: "dashboards.sector",
      path: path(ROOT_DASHBOARDS, "/sector"),
      type: "collapse",
      title: "Sectors",
      icon: "dashboards.crm-analytics",
      childs: [
        {
          id: "dashboards.banks",
          type: "item",
          path: path(ROOT_DASHBOARDS, "/sector/banks"),
          title: "Banks",
        },
        {
          id: "dashboards.hotels",
          type: "item",
          path: path(ROOT_DASHBOARDS, "/sector/hotels"),
          title: "Hotels",
        },
        {
          id: "dashboards.power",
          path: path(ROOT_DASHBOARDS, "/sector/power"),
          type: "item",
          title: "Power",
        },
        {
          id: "dashboards.telecoms",
          path: path(ROOT_DASHBOARDS, "/sector/telecoms"),
          type: "item",
          title: "Telecoms",
        },
      ],
    },
    {
      id: "dashboards.regions",
      path: path(ROOT_DASHBOARDS, "/regions"),
      type: "item",
      title: "Regions",
      icon: "dashboards.cms-analytics",
    },
    {
      id: "dashboards.businesses",
      path: path(ROOT_DASHBOARDS, "/businesses"),
      type: "item",
      title: "Businesses",
      icon: "dashboards.influencer",
    },
    {
      id: "dashboards.branches",
      path: path(ROOT_DASHBOARDS, "/branches"),
      type: "item",
      title: "Branches",
      icon: "dashboards.travel",
    },
    // {
    //   id: "dashboards.education",
    //   path: path(ROOT_DASHBOARDS, "/education"),
    //   type: "item",
    //   title: "Education",
    //   transKey: "nav.dashboards.education",
    //   icon: "dashboards.education",
    // },
    // {
    //   id: "dashboards.authors",
    //   path: path(ROOT_DASHBOARDS, "/authors"),
    //   type: "item",
    //   title: "Authors",
    //   transKey: "nav.dashboards.authors",
    //   icon: "dashboards.authors",
    // },
    // {
    //   id: "dashboards.doctor",
    //   path: path(ROOT_DASHBOARDS, "/doctor"),
    //   type: "item",
    //   title: "Doctor",
    //   transKey: "nav.dashboards.doctor",
    //   icon: "dashboards.doctor",
    // },
    // {
    //   id: "dashboards.employees",
    //   path: path(ROOT_DASHBOARDS, "/employees"),
    //   type: "item",
    //   title: "Employees",
    //   transKey: "nav.dashboards.employees",
    //   icon: "dashboards.employees",
    // },
    // {
    //   id: "dashboards.workspaces",
    //   path: path(ROOT_DASHBOARDS, "/workspaces"),
    //   type: "item",
    //   title: "Workspaces",
    //   transKey: "nav.dashboards.workspaces",
    //   icon: "dashboards.workspaces",
    // },
    // {
    //   id: "dashboards.meetings",
    //   path: path(ROOT_DASHBOARDS, "/meetings"),
    //   type: "item",
    //   title: "Meetings",
    //   transKey: "nav.dashboards.meetings",
    //   icon: "dashboards.meetings",
    // },
    // {
    //   id: "dashboards.projects-board",
    //   path: path(ROOT_DASHBOARDS, "/projects-board"),
    //   type: "item",
    //   title: "Projects Board",
    //   transKey: "nav.dashboards.projects-board",
    //   icon: "dashboards.projects-board",
    // },
    // {
    //   id: "dashboards.divide-2",
    //   type: "divider",
    // },
    // {
    //   id: "dashboards.widget-ui",
    //   path: path(ROOT_DASHBOARDS, "/widget-ui"),
    //   type: "item",
    //   title: "Widgets UI",
    //   transKey: "nav.dashboards.widget-ui",
    //   icon: "dashboards.widget",
    // },
    // {
    //   id: "dashboards.widget-contact",
    //   path: path(ROOT_DASHBOARDS, "/widget-contact"),
    //   type: "item",
    //   title: "Widgets Contact",
    //   transKey: "nav.dashboards.widget-contact",
    //   icon: "dashboards.widget",
    // },
  ],
};
