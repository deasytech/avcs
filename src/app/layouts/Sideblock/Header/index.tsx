// Import Dependencies
import clsx from "clsx";

// Local Imports
import { Notifications } from "@/components/template/Notifications";
import { SidebarToggleBtn } from "@/components/shared/SidebarToggleBtn";
import { useThemeContext } from "@/app/contexts/theme/context";
import { useLocation } from "react-router";

// Sample state data import
import states from "@/data/states.json";

// ----------------------------------------------------------------------

function getPageTitle(pathname: string): string {
  const routeTitles: Record<string, string> = {
    '/dashboards/home': 'Home',
    '/dashboards/regions': 'Revenue for All Regions',
    '/dashboards/businesses': 'Businesses',

    '/dashboards/sector/banks': 'Data for Banks',
    '/dashboards/sector/hotels': 'Data for Hotels',
    '/dashboards/sector/power': 'Data for Power',
    '/dashboards/sector/telecoms': 'Data for Telecoms',

    '/reports/reports': 'General Reports',

    '/data-source/connect-transfer': 'Connect & Transfer',
    '/data-source/data-transfer-log': 'Data Transfer Log',
    '/data-source/validation-report': 'Validation Report',
    '/data-source/api-request-log': 'API Request Log',
    '/data-source/server-push-log': 'Server Push Log',
    '/data-source/data-import-log': 'Data Import Log',
  };

  // Check for exact match first
  if (routeTitles[pathname]) return routeTitles[pathname];

  // Handle dynamic sector/state routes: /dashboards/sector/:sector/:state?
  const sectorStateMatch = pathname.match(
    /^\/dashboards\/regions\/([^/]+)(?:\/([^/]+))?$/
  );

  if (sectorStateMatch) {
    const sectorSlug = sectorStateMatch[1]; // e.g., "banks", "hotels"
    const stateSlug = sectorStateMatch[2]; // e.g., "lagos"

    // Capitalize sector name
    const sectorName = sectorSlug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());

    let title = `Data for ${sectorName}`;

    if (stateSlug) {
      const state = states.find((s) => s.slug === stateSlug.toLowerCase());
      if (state) {
        title += ` - ${state.name}`;
      }
    }

    return title;
  }

  return '';
}

export function Header() {
  const { cardSkin } = useThemeContext();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header
      className={clsx(
        "app-header transition-content sticky top-0 z-20 flex h-[65px] items-center gap-1 border-b border-gray-200 bg-white/80 px-(--margin-x) backdrop-blur-sm backdrop-saturate-150 dark:border-dark-600 max-sm:justify-between",
        cardSkin === "bordered" ? "dark:bg-dark-900/80" : "dark:bg-dark-700/80",
      )}
    >
      <div className="contents xl:hidden">
        <SidebarToggleBtn />
      </div>

      <div className="flex items-center gap-2 sm:flex-1">
        {pageTitle && (
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-100">
              {pageTitle}
            </h1>
          </div>
        )}
        <Notifications />
      </div>
    </header>
  );
}
