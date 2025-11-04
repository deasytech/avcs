// Local Imports
import { DemoLayout } from "@/components/docs/demo/DemoLayout";
// import { Demo, DemoLayout } from "@/components/docs/demo/DemoLayout";
// import { Basic } from "./Basic";
// import { Yup } from "./Yup";
// import { BreadcrumbItem } from "@/components/shared/Breadcrumbs";

// ----------------------------------------------------------------------

// const breadcrumbs: BreadcrumbItem[] = [
//   { title: "Forms", path: "/forms" },
//   { title: "Connect & Transfer" },
// ];

// const markdownPath = "forms/form-validation";

// const demos: Demo[] = [
//   {
//     title: "React Hook Form",
//     description: "",
//     "<a href='https://react-hook-form.com/' class='text-primary-600 dark:text-primary-400 hover:underline'>React Hook Form</a> is a perfect library for validating forms in React. It is a minimal library without any other dependencies, while being performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries.",
//     Component: Basic,
//     markdownName: "Basic",
//   },
//   {
//     title: "Yup Example",
//     description:
//       "<a href='https://github.com/jquense/yup' class='text-primary-600 dark:text-primary-400 hover:underline'>Yup</a> is a perfect library for schema builder for runtime value parsing and validation. It allows you to define a schema, transform a value to match, assert the shape of an existing value, or both",
//     Component: Yup,
//     markdownName: "Yup",
//   },
// ];

export default function FormValidation() {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <p className="text-xl text-center max-w-4xl">
          This function will enable the AVCS Process Server to open a port and retrieve data from the AVCS Gateway Server, then process and store the data ready for realtime reporting.
        </p>
      </div>
      <DemoLayout
        title="Connect & Transfer"
      // breadcrumbs={breadcrumbs}
      // markdownPath={markdownPath}
      // demos={demos}
      />
    </>
  );
}
