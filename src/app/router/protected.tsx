import { Navigate, RouteObject } from "react-router";

import AuthGuard from "@/middleware/AuthGuard";
import { DynamicLayout } from "../layouts/DynamicLayout";
import { AppLayout } from "../layouts/AppLayout";

/**
 * Protected routes configuration
 * These routes require authentication to access
 * Uses AuthGuard middleware to verify user authentication
 */
const protectedRoutes: RouteObject = {
  id: "protected",
  Component: AuthGuard,
  children: [
    // The dynamic layout supports both the main layout and the sideblock.
    {
      Component: DynamicLayout,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboards/home" />,
        },
        {
          path: "/components",
          children: [
            {
              index: true,
              element: <Navigate to="/components/basic-ui/avatar" />,
            },
            {
              path: "basic-ui/avatar",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/avatar"))
                  .default,
              }),
            },
            {
              path: "basic-ui/button",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/button"))
                  .default,
              }),
            },
            {
              path: "basic-ui/badge",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/badge"))
                  .default,
              }),
            },
            {
              path: "basic-ui/tag",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/tag")).default,
              }),
            },
            {
              path: "basic-ui/divider",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/divider"))
                  .default,
              }),
            },
            {
              path: "basic-ui/typography",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/Typography"))
                  .default,
              }),
            },
            {
              path: "data-display/box",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/Box")).default,
              }),
            },
            {
              path: "data-display/popover",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/popover"))
                  .default,
              }),
            },
            {
              path: "data-display/timeline",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/timeline"))
                  .default,
              }),
            },
            {
              path: "data-display/collapse",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/collapse"))
                  .default,
              }),
            },
            {
              path: "data-display/legend",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/legend"))
                  .default,
              }),
            },
            {
              path: "data-display/mask",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/mask"))
                  .default,
              }),
            },
            {
              path: "data-display/contextual-help",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/components/contextual-help")
                ).default,
              }),
            },
            {
              path: "navigation/accordion",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/accordion"))
                  .default,
              }),
            },
            {
              path: "navigation/tab",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/tab")).default,
              }),
            },
            {
              path: "navigation/dropdown",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/dropdown"))
                  .default,
              }),
            },
            {
              path: "navigation/steps",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/steps"))
                  .default,
              }),
            },
            {
              path: "navigation/pagination",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/pagination"))
                  .default,
              }),
            },
            {
              path: "navigation/menu-list",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/menu-list"))
                  .default,
              }),
            },
            {
              path: "navigation/treeview",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/treeview"))
                  .default,
              }),
            },
            {
              path: "loading/progress",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/progress"))
                  .default,
              }),
            },
            {
              path: "loading/circlebar",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/circlebar"))
                  .default,
              }),
            },
            {
              path: "loading/skeleton",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/skeleton"))
                  .default,
              }),
            },
            {
              path: "loading/spinner",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/spinner"))
                  .default,
              }),
            },
            {
              path: "feedback/tooltip",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/tooltip"))
                  .default,
              }),
            },
            {
              path: "feedback/notification",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/notification"))
                  .default,
              }),
            },
            {
              path: "feedback/alert",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/alert"))
                  .default,
              }),
            },
            {
              path: "modal/modal",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/modal"))
                  .default,
              }),
            },
            {
              path: "modal/drawer",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/drawer"))
                  .default,
              }),
            },
            {
              path: "advanced/scroll-shadow",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/components/scroll-shadow")
                ).default,
              }),
            },
            {
              path: "advanced/charts",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/charts"))
                  .default,
              }),
            },
            {
              path: "advanced/carousel",
              lazy: async () => ({
                Component: (await import("@/app/pages/components/carousel"))
                  .default,
              }),
            },
          ],
        },


        {
          path: "/data-source",
          children: [
            {
              index: true,
              element: <Navigate to="/data-source/input" />,
            },
            {
              path: "ekyc-form",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/KYCForm")).default,
              }),
            },
            {
              path: "add-product-form",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/add-product-form"))
                  .default,
              }),
            },
            {
              path: "new-post-form",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/new-post-form"))
                  .default,
              }),
            },
            {
              path: "input",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/input")).default,
              }),
            },
            {
              path: "input-group",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/input-group"))
                  .default,
              }),
            },
            {
              path: "input-mask",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/input-mask"))
                  .default,
              }),
            },
            {
              path: "checkbox",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/checkbox")).default,
              }),
            },
            {
              path: "radio",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/radio")).default,
              }),
            },
            {
              path: "switch",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/switch")).default,
              }),
            },
            {
              path: "swap",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/swap")).default,
              }),
            },
            {
              path: "textarea",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/textarea")).default,
              }),
            },
            {
              path: "select",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/select")).default,
              }),
            },
            {
              path: "range",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/range")).default,
              }),
            },
            {
              path: "listbox",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/listbox")).default,
              }),
            },
            {
              path: "server-push-log",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/server-push-log"))
                  .default,
              }),
            },
            {
              path: "data-import-log",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/data-import-log"))
                  .default,
              }),
            },
            {
              path: "connect-transfer",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/connect-transfer"))
                  .default,
              }),
            },
            {
              path: "data-transfer-log",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/data-transfer-log"))
                  .default,
              }),
            },
            {
              path: "validation-report",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/validation-report")).default,
              }),
            },
            {
              path: "api-request-log",
              lazy: async () => ({
                Component: (await import("@/app/pages/data-source/api-request-log"))
                  .default,
              }),
            },
          ],
        },
        {
          path: "/reports",
          children: [
            {
              index: true,
              element: <Navigate to="/reports/orders-datatable-1" />,
            },
            {
              path: "reports",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/reports/reports")
                ).default,
              }),
            },
            {
              path: "basic-table",
              lazy: async () => ({
                Component: (await import("@/app/pages/reports/basic-table"))
                  .default,
              }),
            },
            {
              path: "react-table",
              lazy: async () => ({
                Component: (await import("@/app/pages/reports/react-table"))
                  .default,
              }),
            },
            {
              path: "advanced-tables",
              lazy: async () => ({
                Component: (await import("@/app/pages/reports/advanced-table"))
                  .default,
              }),
            },
            {
              path: "orders-datatable-1",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/reports/orders-datatable-1")
                ).default,
              }),
            },
            {
              path: "courses-datatable",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/reports/courses-datatable")
                ).default,
              }),
            },
            {
              path: "users-datatable",
              lazy: async () => ({
                Component: (await import("@/app/pages/reports/users-datatable"))
                  .default,
              }),
            },
            {
              path: "projects-datatable",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/reports/projects-datatable")
                ).default,
              }),
            },
          ],
        },
        {
          path: "/prototypes",
          children: [
            {
              index: true,
              element: <Navigate to="/prototypes/users-card/users-card-1" />,
            },
            {
              path: "onboarding",
              children: [
                {
                  path: "onboarding-1",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/onboarding-1")
                    ).default,
                  }),
                },
                {
                  path: "onboarding-2",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/onboarding-2")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "users-card",
              children: [
                {
                  path: "users-card-1",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-1")
                    ).default,
                  }),
                },
                {
                  path: "users-card-2",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-2")
                    ).default,
                  }),
                },
                {
                  path: "users-card-3",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-3")
                    ).default,
                  }),
                },
                {
                  path: "users-card-4",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-4")
                    ).default,
                  }),
                },
                {
                  path: "users-card-5",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-5")
                    ).default,
                  }),
                },
                {
                  path: "users-card-6",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-6")
                    ).default,
                  }),
                },
                {
                  path: "users-card-7",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/users-card-7")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "blog-card",
              children: [
                {
                  path: "blog-card-1",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-1")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-2",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-2")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-3",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-3")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-4",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-4")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-5",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-5")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-6",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-6")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-7",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-7")
                    ).default,
                  }),
                },
                {
                  path: "blog-card-8",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/blog-card-8")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "post-details",
              lazy: async () => ({
                Component: (await import("@/app/pages/prototypes/post-details"))
                  .default,
              }),
            },
            {
              path: "price-list",
              children: [
                {
                  path: "price-list-1",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/price-list-1")
                    ).default,
                  }),
                },
                {
                  path: "price-list-2",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/price-list-2")
                    ).default,
                  }),
                },
                {
                  path: "price-list-3",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/price-list-3")
                    ).default,
                  }),
                },
                {
                  path: "price-list-4",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/price-list-4")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "help",
              children: [
                {
                  path: "help-1",
                  lazy: async () => ({
                    Component: (await import("@/app/pages/prototypes/help-1"))
                      .default,
                  }),
                },
                {
                  path: "help-2",
                  lazy: async () => ({
                    Component: (await import("@/app/pages/prototypes/help-2"))
                      .default,
                  }),
                },
                {
                  path: "help-3",
                  lazy: async () => ({
                    Component: (await import("@/app/pages/prototypes/help-3"))
                      .default,
                  }),
                },
              ],
            },
            {
              path: "invoice",
              children: [
                {
                  path: "invoice-1",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/invoice-1")
                    ).default,
                  }),
                },
                {
                  path: "invoice-2",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/invoice-2")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "errors",
              children: [
                {
                  path: "404-v4",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/prototypes/errors/404/v4")
                    ).default,
                  }),
                },
              ],
            },
          ],
        },
        {
          path: "dashboards",
          children: [
            {
              index: true,
              element: <Navigate to="/dashboards/home" />,
            },
            {
              path: "home",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/home"))
                  .default,
              }),
            },
            {
              path: "sector/banks",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/banks"))
                  .default,
              }),
            },
            {
              path: "sector/hotels",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/hotels"))
                  .default,
              }),
            },
            {
              path: "sector/power",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/power")
                ).default,
              }),
            },
            {
              path: "sector/telecoms",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/telecoms"))
                  .default,
              }),
            },
            {
              path: "regions",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/regions")
                ).default,
              }),
            },
            {
              path: "regions/:regionName",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/regions")).default,
              }),
            },
            {
              path: "businesses",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/businesses"))
                  .default,
              }),
            },
            {
              path: "branches",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/branches"))
                  .default,
              }),
            },
            {
              path: "banking/banking-1",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/banking-1"))
                  .default,
              }),
            },
            {
              path: "banking/banking-2",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/banking-2"))
                  .default,
              }),
            },
            {
              path: "personal",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/personal"))
                  .default,
              }),
            },
            {
              path: "teacher",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/teacher"))
                  .default,
              }),
            },
            {
              path: "education",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/education"))
                  .default,
              }),
            },
            {
              path: "authors",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/authors"))
                  .default,
              }),
            },
            {
              path: "doctor",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/doctor"))
                  .default,
              }),
            },
            {
              path: "employees",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/employees"))
                  .default,
              }),
            },
            {
              path: "workspaces",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/workspaces"))
                  .default,
              }),
            },
            {
              path: "meetings",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/meetings"))
                  .default,
              }),
            },
            {
              path: "projects-board",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/projects-board")
                ).default,
              }),
            },
            {
              path: "widget-ui",
              lazy: async () => ({
                Component: (await import("@/app/pages/dashboards/widget-ui"))
                  .default,
              }),
            },
            {
              path: "widget-contact",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/dashboards/widget-contact")
                ).default,
              }),
            },
          ],
        },
        {
          path: "apps",
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/list")).default,
              }),
            },
            {
              path: "nft-1",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/nft-1")).default,
              }),
            },
            {
              path: "nft-2",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/nft-2")).default,
              }),
            },
            {
              path: "travel",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/travel")).default,
              }),
            },
          ],
        },
        {
          path: "Docs",
          children: [
            {
              index: true,
              element: <Navigate to="/docs/getting-started" />,
            },
            {
              path: "getting-started",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/getting-started"))
                  .default,
              }),
            },
            {
              path: "shared-components/*",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/shared-components"))
                  .default,
              }),
            },
            {
              path: "hooks/*",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/hooks")).default,
              }),
            },
            {
              path: "utils/*",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/utils")).default,
              }),
            },
            {
              path: "attributions",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/attributions"))
                  .default,
              }),
            },
            {
              path: "changelogs",
              lazy: async () => ({
                Component: (await import("@/app/pages/docs/changelogs"))
                  .default,
              }),
            },
          ],
        },
      ],
    },
    // The app layout supports only the main layout. Avoid using it for other layouts.
    {
      Component: AppLayout,
      children: [
        {
          path: "apps",
          children: [
            {
              path: "pos",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/pos")).default,
              }),
            },
            {
              path: "filemanager",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/filemanager"))
                  .default,
              }),
            },
            {
              path: "chat",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/chat")).default,
              }),
            },
            {
              path: "ai-chat",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/ai-chat")).default,
              }),
            },
            {
              path: "mail",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/mail/Layout"))
                  .default,
              }),
              children: [
                {
                  index: true,
                  lazy: async () => ({
                    Component: (await import("@/app/pages/apps/mail/index"))
                      .default,
                  }),
                },
                {
                  path: ":mail-id",
                  lazy: async () => ({
                    Component: (
                      await import("@/app/pages/apps/mail/MailContent")
                    ).default,
                  }),
                },
              ],
            },
            {
              path: "todo",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/todo")).default,
              }),
            },
            {
              path: "kanban",
              lazy: async () => ({
                Component: (await import("@/app/pages/apps/kanban")).default,
              }),
            },
          ],
        },
        {
          path: "settings",
          lazy: async () => ({
            Component: (await import("@/app/pages/settings/Layout")).default,
          }),
          children: [
            {
              index: true,
              element: <Navigate to="/settings/general" />,
            },
            {
              path: "general",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/General")
                ).default,
              }),
            },
            {
              path: "appearance",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Appearance")
                ).default,
              }),
            },
            {
              path: "notifications",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Notifications")
                ).default,
              }),
            },
            {
              path: "applications",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Applications")
                ).default,
              }),
            },
            {
              path: "sessions",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Sessions")
                ).default,
              }),
            },
            {
              path: "billing",
              lazy: async () => ({
                Component: (
                  await import("@/app/pages/settings/sections/Billing")
                ).default,
              }),
            },
          ],
        },
      ],
    },
  ],
};

export { protectedRoutes };
