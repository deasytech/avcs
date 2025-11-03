// Local Imports
import { Progress } from "@/components/ui";

// ----------------------------------------------------------------------

export function SplashScreen() {
  return (
    <>
      <div className="fixed grid h-full w-full place-content-center">
        <p className="text-gray-800 dark:text-dark-50 text-3xl font-bold inline-flex flex-col leading-tight">
          AVCS
          <span className="text-xs">Automated VAT Collection System</span>
        </p>
        <Progress
          color="primary"
          isIndeterminate
          animationDuration="1s"
          className="mt-2 h-1"
        />
      </div>
    </>
  );
}
