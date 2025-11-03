
// Import Dependencies
import clsx from "clsx";
import { useLocation } from "react-router";


// Local Imports
import { useThemeContext } from "@/app/contexts/theme/context";
import { Notifications } from "@/components/template/Notifications";
import { RightSidebar } from "@/components/template/RightSidebar";
import { LanguageSelector } from "@/components/template/LanguageSelector";
import { SidebarToggleBtn } from "@/components/shared/SidebarToggleBtn";

// ----------------------------------------------------------------------


function getPageTitle(pathname: string): string {
  const routeTitles: Record<string, string> = {
    '/dashboards/home': 'Home',
    '/dashboards/sector/banks': 'Banks',
    '/dashboards/sector/hotels': 'Hotels',
    '/dashboards/sector/power': 'Power',
    '/dashboards/sector/telecoms': 'Telecoms',
    '/dashboards/regions': 'Regions',
    '/dashboards/businesses': 'Businesses',
    '/dashboards/branches': 'Branches',
    '/tables/reports': 'General Reports',
  };

  return routeTitles[pathname] || '';
}

export function Header() {
  const { cardSkin } = useThemeContext();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header
      className={clsx(
        "app-header transition-content sticky top-0 z-20 flex h-[65px] shrink-0 items-center justify-between border-b border-gray-200 bg-white/80 px-(--margin-x) backdrop-blur-sm backdrop-saturate-150 dark:border-dark-600",
        cardSkin === "shadow" ? "dark:bg-dark-750/80" : "dark:bg-dark-900/80",
      )}
    >
      <SidebarToggleBtn />
      {pageTitle && (
        <div className="flex-1 text-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-dark-100">
            {pageTitle}
          </h1>
        </div>
      )}
      <div className="flex items-center gap-2 ltr:-mr-1.5 rtl:-ml-1.5">
        <Notifications />
        <RightSidebar />
        <LanguageSelector />
      </div>
    </header>
  );
}
