import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, useOutletContext, useNavigate, Link, redirect, useSearchParams } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import React__default, { createElement, useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { createClient } from "@supabase/supabase-js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { index, layout, route } from "@react-router/dev/routes";
import { ChevronDownIcon, XIcon, Menu, Loader2, CheckIcon, AlertCircle, ChevronRight, ChevronLeft, SearchIcon, CircleIcon, CalendarIcon, ChevronsUpDown, Check, ArrowRight as ArrowRight$1, ArrowLeft, CircleAlert, Loader as Loader$1, SearchCheck, MapPinned } from "lucide-react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { FcGoogle } from "react-icons/fc";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { MdPets } from "react-icons/md";
import { ArrowRight, Paw, ClipboardHeart, MenuDotsCircle, Pen, TrashBinTrash, Flag, DangerCircle, PenNewRound, Calendar as Calendar$1 } from "@solar-icons/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { DayPicker } from "react-day-picker";
import { Command as Command$1 } from "cmdk";
import { FormProvider, Controller, useFormContext, useFormState, useForm } from "react-hook-form";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { z } from "zod";
import useEmblaCarousel from "embla-carousel-react";
import { Resend } from "resend";
import { Html, Head, Font, Preview, Tailwind, Body, Container, Section, Row, Column, Link as Link$1, Img, Text, Heading, Button as Button$1, Hr } from "@react-email/components";
import { format as format$1 } from "@formkit/tempo";
import { TbPasswordUser } from "react-icons/tb";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component2, props);
  };
}
function withHydrateFallbackProps(HydrateFallback2) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData()
    };
    return createElement(HydrateFallback2, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(Toaster, {
        richColors: true
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root
}, Symbol.toStringTag, { value: "Module" }));
function AspectRatio({
  ...props
}) {
  return /* @__PURE__ */ jsx(AspectRatioPrimitive.Root, { "data-slot": "aspect-ratio", ...props });
}
const supabaseUrl = "https://syroswcbkupydkbnuixs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cm9zd2Nia3VweWRrYm51aXhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTUyOTksImV4cCI6MjA2MDQ5MTI5OX0.X8m5FmUn-A7FNvqdTDTU4yiEYH0Q2be2Z8n70Ypnk9E";
const supabase = createClient(supabaseUrl, supabaseKey);
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const isPetDataAlreadyFilled = (pet2) => {
  return pet2.name && pet2.owner && pet2.sex && pet2.animal_type;
};
const calculateAge$1 = (birthDate) => {
  const today = /* @__PURE__ */ new Date();
  const birth = new Date(birthDate);
  const ageInMilliseconds = today.getTime() - birth.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1e3 * 60 * 60 * 24));
  const daysPerMonth = 30;
  const daysPerYear = 365;
  const years = Math.floor(ageInDays / daysPerYear);
  const remainingDays = ageInDays - years * daysPerYear;
  const months = Math.floor(remainingDays / daysPerMonth);
  const days = remainingDays - months * daysPerMonth;
  return { years, months, days };
};
const formatAge = ({ days, months, years }) => {
  if (years === 1) return "1 año";
  if (years !== 0) return `${years} años`;
  if (months === 1) return "1 mes";
  if (months !== 0) return `${months} meses`;
  return `${days} días`;
};
const formatAnimalSex = (sex) => {
  switch (sex) {
    case "male":
      return "Macho";
    case "female":
      return "Hembra";
    default:
      throw new Error("Unexpected sex value");
  }
};
const departmentsGuatemala = [
  "Alta Verapaz",
  "Baja Verapaz",
  "Chimaltenango",
  "Chiquimula",
  "El Progreso",
  "Escuintla",
  "Guatemala",
  "Huehuetenango",
  "Izabal",
  "Jalapa",
  "Jutiapa",
  "Petén",
  "Quetzaltenango",
  "Quiché",
  "Retalhuleu",
  "Sacatepéquez",
  "San Marcos",
  "Santa Rosa",
  "Sololá",
  "Suchitepéquez",
  "Totonicapán",
  "Zacapa"
];
const departmentsGuatemalaForDropdown = departmentsGuatemala.map(
  (city) => ({
    value: city,
    label: city
  })
);
const formatContactNumber = (contactNumber) => {
  const cleanedNumber = contactNumber.replace(/\D/g, "");
  const formattedNumber = cleanedNumber.replace(/(\d{4})(\d{4})/, "$1-$2");
  return formattedNumber;
};
const MAX_FILE_SIZE = 5e6;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp"
];
const uploadPortrait = async (files, storageBucket) => {
  if (!files || files.length === 0) {
    return null;
  }
  const file = files.item(0);
  const buffer = await file.arrayBuffer();
  const result = await supabase.storage.from(storageBucket).upload(v4(), buffer, { contentType: file.type });
  if (result.error !== null) return null;
  return result.data.path;
};
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/;
const numberRegex = /\d/;
function Avatar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Root,
    {
      "data-slot": "avatar",
      className: cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      ),
      ...props
    }
  );
}
function AvatarImage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Image,
    {
      "data-slot": "avatar-image",
      className: cn("aspect-square size-full", className),
      ...props
    }
  );
}
function AvatarFallback({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AvatarPrimitive.Fallback,
    {
      "data-slot": "avatar-fallback",
      className: cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      ),
      ...props
    }
  );
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const appRoutes = {
  landing: "/",
  dashboard: "/dashboard",
  myPets: "/my-pets",
  exploreLostPets: "/lost-pets",
  reportLostPet: "/report-lost-pet",
  reportFoundPet: "/report-found-pet",
  petDetails: "/pet",
  editPet: "/edit-pet",
  editUserProfile: "/edit-user",
  resetPassword: "/reset-password",
  login: "/login",
  signUp: "/sign-up"
};
[
  index("routes/landing.tsx"),
  layout("routes/auth_layout.tsx", [
    route(appRoutes.login, "routes/login.tsx"),
    route(appRoutes.signUp, "routes/signup.tsx")
  ]),
  layout("routes/protected_layout.tsx", [
    route(appRoutes.dashboard, "routes/dashboard.tsx"),
    route(appRoutes.myPets, "routes/my_pets.tsx"),
    route(`${appRoutes.petDetails}/:petId`, "routes/pet.tsx"),
    route(`${appRoutes.editPet}/:petId`, "routes/edit_pet.tsx"),
    route(appRoutes.reportLostPet, "routes/report_lost_pet.tsx"),
    route(
      `${appRoutes.reportLostPet}/:petId`,
      "routes/report_lost_pet_form.tsx"
    ),
    route(`${appRoutes.reportFoundPet}/:petId`, "routes/report_found_pet.tsx"),
    route(appRoutes.editUserProfile, "routes/edit_user_profile.tsx")
  ]),
  route(appRoutes.exploreLostPets, "routes/lost_pets.tsx"),
  route(appRoutes.resetPassword, "routes/reset_password.tsx")
];
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: cn("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm",
      ...props,
      children: /* @__PURE__ */ jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Root,
    {
      "data-slot": "navigation-menu",
      "data-viewport": viewport,
      className: cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className
      ),
      ...props,
      children: [
        children,
        viewport && /* @__PURE__ */ jsx(NavigationMenuViewport, {})
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.List,
    {
      "data-slot": "navigation-menu-list",
      className: cn(
        "group flex flex-1 list-none items-center justify-center gap-1",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Item,
    {
      "data-slot": "navigation-menu-item",
      className: cn("relative", className),
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    NavigationMenuPrimitive.Trigger,
    {
      "data-slot": "navigation-menu-trigger",
      className: cn(navigationMenuTriggerStyle(), "group", className),
      ...props,
      children: [
        children,
        " ",
        /* @__PURE__ */ jsx(
          ChevronDownIcon,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Content,
    {
      "data-slot": "navigation-menu-content",
      className: cn(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        className
      ),
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute top-full right-0 isolate z-50 flex justify-center"
      ),
      children: /* @__PURE__ */ jsx(
        NavigationMenuPrimitive.Viewport,
        {
          "data-slot": "navigation-menu-viewport",
          className: cn(
            "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
            className
          ),
          ...props
        }
      )
    }
  );
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    NavigationMenuPrimitive.Link,
    {
      "data-slot": "navigation-menu-link",
      className: cn(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(SheetPrimitive.Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  ...props
}) {
  return /* @__PURE__ */ jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxs(
      SheetPrimitive.Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          side === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          side === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          side === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          side === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          className
        ),
        ...props,
        children: [
          children,
          /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ jsx(XIcon, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SheetHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: cn("flex flex-col gap-1.5 p-4", className),
      ...props
    }
  );
}
function SheetTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SheetPrimitive.Title,
    {
      "data-slot": "sheet-title",
      className: cn("text-foreground font-semibold", className),
      ...props
    }
  );
}
const useUser = () => useOutletContext();
const Navbar = ({
  logo = {
    url: appRoutes.dashboard,
    src: "/PetTrackerLogo.png",
    alt: "logo",
    title: "Pet Tracker"
  },
  menu = [
    {
      title: "Explorar Mascotas Pérdidas",
      url: appRoutes.exploreLostPets
    },
    {
      title: "Mis Mascotas",
      url: appRoutes.myPets
    }
  ],
  auth = {
    login: { title: "Login", url: appRoutes.login },
    signup: { title: "Sign up", url: appRoutes.signUp }
  },
  hideMenu = false
}) => {
  const user = useUser();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("section", { className: "py-4 bg-white shadow-sm", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("nav", { className: "hidden justify-between lg:flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxs(Link, { to: logo.url, className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("img", { src: logo.src, className: "max-h-9", alt: logo.alt }),
          /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold tracking-tighter", children: logo.title })
        ] }),
        !hideMenu && /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(NavigationMenu, { children: /* @__PURE__ */ jsx(NavigationMenuList, { children: menu.map((item) => renderMenuItem(item)) }) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: !user ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", size: "default", children: /* @__PURE__ */ jsx(Link, { to: auth.login.url, children: auth.login.title }) }),
        /* @__PURE__ */ jsx(Button, { asChild: true, size: "default", children: /* @__PURE__ */ jsx(Link, { to: auth.signup.url, children: auth.signup.title }) })
      ] }) : /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          size: "default",
          onClick: async () => {
            await supabase.auth.signOut();
            navigate(appRoutes.landing);
          },
          children: "Cerrar sesión"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "block lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: logo.url, className: "flex items-center gap-2 ", children: [
        /* @__PURE__ */ jsx("img", { src: logo.src, className: "max-h-9", alt: logo.alt }),
        /* @__PURE__ */ jsx("span", { className: "text-2xl font-semibold tracking-tighter", children: logo.title })
      ] }),
      !hideMenu && /* @__PURE__ */ jsxs(Sheet, { children: [
        /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", children: /* @__PURE__ */ jsx(Menu, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxs(SheetContent, { className: "overflow-y-auto", children: [
          /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: /* @__PURE__ */ jsx(Link, { to: logo.url, className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: logo.src,
              className: "max-h-8",
              alt: logo.alt
            }
          ) }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 p-4", children: [
            /* @__PURE__ */ jsx(
              Accordion,
              {
                type: "single",
                collapsible: true,
                className: "flex w-full flex-col gap-4",
                children: menu.map((item) => renderMobileMenuItem(item))
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3", children: !user ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: auth.login.url, children: auth.login.title }) }),
              /* @__PURE__ */ jsx(Button, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: auth.signup.url, children: auth.signup.title }) })
            ] }) : /* @__PURE__ */ jsx(
              Button,
              {
                onClick: async () => {
                  await supabase.auth.signOut();
                  navigate(appRoutes.landing);
                },
                children: "Cerrar sesión"
              }
            ) })
          ] })
        ] })
      ] })
    ] }) })
  ] }) });
};
const renderMenuItem = (item) => {
  if (item.items) {
    return /* @__PURE__ */ jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsx(NavigationMenuTrigger, { children: item.title }),
      /* @__PURE__ */ jsx(NavigationMenuContent, { className: "bg-popover text-popover-foreground", children: item.items.map((subItem) => /* @__PURE__ */ jsx(NavigationMenuLink, { asChild: true, className: "w-80", children: /* @__PURE__ */ jsx(SubMenuLink, { item: subItem }) }, subItem.title)) })
    ] }, item.title);
  }
  return /* @__PURE__ */ jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsx(
    NavigationMenuLink,
    {
      href: item.url,
      className: "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground",
      children: item.title
    }
  ) }, item.title);
};
const renderMobileMenuItem = (item) => {
  if (item.items) {
    return /* @__PURE__ */ jsxs(AccordionItem, { value: item.title, className: "border-b-0", children: [
      /* @__PURE__ */ jsx(AccordionTrigger, { className: "text-md py-0 font-semibold hover:no-underline", children: item.title }),
      /* @__PURE__ */ jsx(AccordionContent, { className: "mt-2", children: item.items.map((subItem) => /* @__PURE__ */ jsx(SubMenuLink, { item: subItem }, subItem.title)) })
    ] }, item.title);
  }
  return /* @__PURE__ */ jsx("a", { href: item.url, className: "text-md font-semibold", children: item.title }, item.title);
};
const SubMenuLink = ({ item }) => {
  return /* @__PURE__ */ jsxs(
    "a",
    {
      className: "flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground lg:w-50",
      href: item.url,
      children: [
        /* @__PURE__ */ jsx("div", { className: "text-foreground", children: item.icon }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-semibold", children: item.title }),
          item.description && /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug text-muted-foreground", children: item.description })
        ] })
      ]
    }
  );
};
const LandingView = ({
  heading = "Encuentra. Conecta. Protege.",
  description = "Con PetTracker, vincula tu mascota a una placa inteligente y recibe alertas si alguien la encuentra. Tu compañero siempre estará un escaneo más cerca.",
  button = {
    text: "Vincula tu mascota",
    url: appRoutes.dashboard
  },
  testimonial = {
    quote: "Hasta que no hayas amado a un animal, una parte de tu alma permanece dormida.",
    author: "Anatole France",
    avatars: [
      {
        image: "https://shadcnblocks.com/images/block/avatar-1.webp",
        fallback: "AB"
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-2.webp",
        fallback: "CD"
      },
      {
        image: "https://shadcnblocks.com/images/block/avatar-3.webp",
        fallback: "EF"
      }
    ]
  },
  images = {
    first: "/asset1.png",
    second: "/asset2.png",
    third: "/asset3.png",
    fourth: "/asset4.png"
  }
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, { hideMenu: true }),
    /* @__PURE__ */ jsx("section", { className: "py-8", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-6 lg:px-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-8 md:flex-row", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 lg:gap-8", children: [
          /* @__PURE__ */ jsx("h1", { className: "max-w-[80%] text-5xl leading-none font-bold text-foreground lg:text-5xl xl:text-7xl", children: heading }),
          /* @__PURE__ */ jsx("p", { className: "text-lg leading-snug text-muted-foreground xl:text-2xl", children: description })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-6 lg:my-10", children: /* @__PURE__ */ jsx(
          Button,
          {
            className: "bg-blue-500 hover:bg-blue-600 text-white",
            asChild: true,
            size: "lg",
            children: /* @__PURE__ */ jsx(Link, { to: button.url, children: button.text })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "relative flex -space-x-[1.5rem]", children: testimonial.avatars.map((avatar, index2) => /* @__PURE__ */ jsxs(
            Avatar,
            {
              className: `relative z-${index2 + 1}0 flex h-12 w-12 flex-shrink-0 rounded-full border-2 border-white object-cover`,
              children: [
                /* @__PURE__ */ jsx(AvatarImage, { src: avatar.image, alt: "" }),
                /* @__PURE__ */ jsx(AvatarFallback, { children: avatar.fallback })
              ]
            },
            index2
          )) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "mb-1 text-sm text-muted-2-foreground italic", children: [
              '"',
              testimonial.quote,
              '"'
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-muted-2-foreground", children: testimonial.author })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex-1", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-[50rem]", children: /* @__PURE__ */ jsx(AspectRatio, { ratio: 1 / 1, className: "h-full w-full", children: /* @__PURE__ */ jsxs("div", { className: "grid h-full w-full grid-cols-2 grid-rows-2 gap-[3.5%]", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-[5.2%] border border-muted bg-muted", children: /* @__PURE__ */ jsx("img", { src: images.first, alt: "" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-[5.2%] border border-muted bg-muted", children: /* @__PURE__ */ jsx("div", { className: "relative top-[5%] left-[50%] w-[75%] max-w-[37.5rem] -translate-x-[50%]", children: /* @__PURE__ */ jsx("img", { src: images.second, alt: "" }) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-[5.2%] border border-muted bg-muted", children: /* @__PURE__ */ jsx("img", { src: images.third, alt: "" }) }),
        /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden rounded-[5.2%] border border-muted bg-muted", children: /* @__PURE__ */ jsx("div", { className: "relative top-[3%] left-[50%] w-[95%] max-w-[37.5rem] -translate-x-[50%]", children: /* @__PURE__ */ jsx("img", { src: images.fourth, alt: "" }) }) })
      ] }) }) }) })
    ] }) }) })
  ] });
};
const meta$2 = () => [{
  title: "Pet Tracker"
}];
const landing = withComponentProps(function LandingRoute() {
  return /* @__PURE__ */ jsx(LandingView, {});
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: landing,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
const Loader = ({ className, ...props }) => /* @__PURE__ */ jsx(Loader2, { className: cn("animate-spin", className), ...props });
const clientLoader$1 = async () => {
  const userResult = await supabase.auth.getUser();
  if (userResult.data.user) {
    return redirect(appRoutes.dashboard);
  } else {
    return;
  }
};
const HydrateFallback$1 = withHydrateFallbackProps(() => /* @__PURE__ */ jsx("div", {
  className: "flex flex-col items-center pt-7",
  children: /* @__PURE__ */ jsx(Loader, {})
}));
const LoginRegisterLayout = () => {
  return /* @__PURE__ */ jsx(Outlet, {});
};
const auth_layout = withComponentProps(LoginRegisterLayout);
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback: HydrateFallback$1,
  clientLoader: clientLoader$1,
  default: auth_layout
}, Symbol.toStringTag, { value: "Module" }));
function Checkbox({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    CheckboxPrimitive.Root,
    {
      "data-slot": "checkbox",
      className: cn(
        "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        CheckboxPrimitive.Indicator,
        {
          "data-slot": "checkbox-indicator",
          className: "flex items-center justify-center text-current transition-none",
          children: /* @__PURE__ */ jsx(CheckIcon, { className: "size-3.5" })
        }
      )
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
const Login = ({
  heading = "Iniciar sesión",
  subheading = "Bienvenido de nuevo",
  logo = {
    url: appRoutes.landing,
    src: "/PetTrackerLogo.png",
    alt: "PetTrackerLogo"
  },
  loginText = "Iniciar Sesión",
  googleText = "Acceder con Google",
  signupText = "¿Aún no tienes cuenta?",
  signupUrl = appRoutes.signUp,
  redirectRoute = appRoutes.dashboard
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login2 = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error === null) navigate(redirectRoute);
    else {
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
    }
    setLoading(false);
  };
  const handleGoogleSignIn = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google"
    });
  };
  return /* @__PURE__ */ jsx("section", { className: "h-screen flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 mx-5", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: logo.url, className: "mb-3 flex items-center gap-2", children: /* @__PURE__ */ jsx("img", { src: logo.src, className: "max-h-11", alt: logo.alt }) }),
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-3xl sm:text-4xl font-bold text-center", children: heading }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: subheading })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "email",
          placeholder: "Ingresa tu correo electrónico",
          required: true,
          value: email,
          onChange: (event) => setEmail(event.target.value)
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: showPassword ? "text" : "password",
          placeholder: "Ingresa tu contraseña",
          required: true,
          value: password,
          onChange: (event) => setPassword(event.target.value)
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(
            Checkbox,
            {
              id: "remember",
              className: "border-muted-foreground",
              checked: showPassword,
              onCheckedChange: (checked) => setShowPassword(checked)
            }
          ),
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "remember",
              className: "text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              children: "Mostrar contraseña"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: appRoutes.resetPassword,
            className: "text-sm text-primary text-right hover:underline leading-4",
            children: "Olvidé mi contraseña"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-col gap-3", children: [
      loading ? /* @__PURE__ */ jsxs(Button, { disabled: true, children: [
        /* @__PURE__ */ jsx(Loader2, { className: "animate-spin mr-2" }),
        "Iniciando sesión..."
      ] }) : /* @__PURE__ */ jsx(Button, { type: "submit", className: "mt-2 w-full", onClick: login2, children: loginText }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          className: "w-full",
          onClick: handleGoogleSignIn,
          children: [
            /* @__PURE__ */ jsx(FcGoogle, { className: "mr-2 size-5" }),
            googleText
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-7 mb-2 flex justify-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { children: signupText }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: signupUrl,
          className: "font-medium text-primary hover:underline",
          children: "Registrate"
        }
      )
    ] })
  ] }) }) }) });
};
const login = withComponentProps(function LoginRoute() {
  return /* @__PURE__ */ jsx(Login, {});
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
const Signup = ({
  heading = "Registrarse",
  subheading = "Crea una cuenta para comenzar",
  logo = {
    url: appRoutes.landing,
    src: "/PetTrackerLogo.png",
    alt: "PetTrackerLogo",
    title: "Pet Tracker"
  },
  googleText = "Registrarse con Google",
  signupText = "Crear cuenta",
  loginText = "¿Ya tienes una cuenta?",
  loginUrl = appRoutes.login
}) => {
  const handleGoogleSignUp = async () => {
    supabase.auth.signInWithOAuth({
      provider: "google"
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!emailRegex.test(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!numberRegex.test(password)) {
      toast.error("La contraseña debe incluir al menos un número.");
      return;
    }
    if (!specialCharactersRegex.test(password)) {
      toast.error("La contraseña debe incluir al menos un carácter especial.");
      return;
    }
    const { error } = await supabase.auth.signUp({
      email,
      password
    });
    if (error) {
      toast.error("Error al registrarse, por favor intenta de nuevo.");
      return;
    }
    toast.success(
      "Registro exitoso, verifica tu correo electrónico para confirmar tu cuenta."
    );
    navigate("/verify-email", { state: { userEmail: email } });
  };
  return /* @__PURE__ */ jsx("section", { className: "h-screen bg-muted", children: /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "flex w-full max-w-sm flex-col items-center gap-y-6 rounded-md border border-muted bg-white px-6 py-8 shadow-md mx-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-y-3", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 lg:justify-start", children: /* @__PURE__ */ jsx(Link, { to: logo.url, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: logo.src,
          alt: logo.alt,
          title: logo.title,
          className: "h-12"
        }
      ) }) }),
      /* @__PURE__ */ jsx("h1", { className: "mb-1 text-3xl sm:text-4xl font-bold", children: heading }),
      subheading && /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: subheading })
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "flex w-full flex-col gap-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsx(
        Input,
        {
          name: "email",
          type: "email",
          placeholder: "Correo Electrónico",
          required: true,
          className: "bg-white"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: /* @__PURE__ */ jsx(
        Input,
        {
          name: "password",
          type: "password",
          placeholder: "Contraseña",
          required: true,
          className: "bg-white"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(Button, { type: "submit", className: "mt-2 w-full", children: signupText }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "outline",
            className: "w-full",
            onClick: handleGoogleSignUp,
            children: [
              /* @__PURE__ */ jsx(FcGoogle, { className: "mr-2 size-5" }),
              googleText
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { children: loginText }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: loginUrl,
          className: "font-medium text-primary hover:underline",
          children: "Iniciar sesión"
        }
      )
    ] })
  ] }) }) });
};
const Component$6 = () => /* @__PURE__ */ jsx(Signup, {});
const signup = withComponentProps(Component$6);
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const clientLoader = async ({
  request
}) => {
  const userResult = await supabase.auth.getUser();
  if (request.url.includes(appRoutes.petDetails)) return userResult.data.user;
  if (userResult.error) return redirect(appRoutes.login);
  return userResult.data.user;
};
const HydrateFallback = withHydrateFallbackProps(() => {
  return /* @__PURE__ */ jsx("div", {
    className: "flex flex-col items-center pt-7",
    children: /* @__PURE__ */ jsx(Loader, {})
  });
});
const ProtectedLayoutRoute = ({
  loaderData: user
}) => /* @__PURE__ */ jsx(Outlet, {
  context: user
});
const protected_layout = withComponentProps(ProtectedLayoutRoute);
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  HydrateFallback,
  clientLoader,
  default: protected_layout
}, Symbol.toStringTag, { value: "Module" }));
const Dashboard = ({
  heading,
  description = "Consulta la actividad reciente, accede rápidamente a tus mascotas y mantente al tanto de cualquier novedad.",
  feature1: feature12,
  feature3: feature32,
  feature4: feature42
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto flex flex-col items-center justify-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-5 lg:mb-12 flex flex-col items-center gap-6", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-center text-3xl font-semibold max-w-5/6 md:max-w-2xl lg:max-w-3xl lg:text-5xl", children: heading }),
        /* @__PURE__ */ jsx("p", { className: "text-center text-lg font-medium text-muted-foreground max-w-5/6 md:max-w-2xl lg:max-w-4xl lg:text-xl", children: description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "border-muted2 relative flex w-5/6 flex-col border lg:w-full", children: [
        /* @__PURE__ */ jsx("div", { className: "relative flex flex-col lg:flex-row", children: /* @__PURE__ */ jsxs("div", { className: "border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:border-r lg:border-b-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: feature12.title }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature12.description }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: feature12.image,
              alt: feature12.title,
              className: "mt-8 aspect-[1.5] h-full w-full object-contain lg:aspect-[2.4] bg-muted"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "border-muted2 relative flex flex-col border-t border-solid lg:flex-row", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: feature32.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature32.description }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: feature32.image,
                alt: feature32.title,
                className: "mt-8 aspect-[1.45] h-full w-full object-contain bg-muted"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between p-10 lg:w-3/5", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: feature42.title }),
            /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: feature42.description }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: feature42.image,
                alt: feature42.title,
                className: "mt-8 aspect-[1.5] h-full w-full object-contain bg-muted lg:aspect-[2.4]"
              }
            )
          ] })
        ] })
      ] }) })
    ] }) })
  ] });
};
const dashboard = withComponentProps(function DashboardRoute() {
  return /* @__PURE__ */ jsx(Dashboard, {
    heading: "Panel de control",
    feature1,
    feature2,
    feature3,
    feature4
  });
});
const feature1 = {
  title: "Resumen general",
  description: "Consulta el estado actual de tus mascotas registradas. Aquí verás cuántas están activas, si alguna ha sido reportada como perdida, y el estado de tus placas NFC.",
  image: "/Resumen.png"
};
const feature2 = {
  title: "Estadísticas rápidas",
  description: "Visualiza datos clave como escaneos recientes, mascotas recuperadas y actividad mensual. Obtén una idea clara del movimiento en tu cuenta y del impacto de PetTracker.",
  image: "/Estadisticas.png"
};
const feature3 = {
  title: "Tus Puntos",
  description: "Gana puntos por registrar mascotas, mantener actualizados sus perfiles o ayudar a otros usuarios a encontrar mascotas. Acumúlalos y canjéalos próximamente por recompensas o beneficios exclusivos.",
  image: "/Puntos.png"
};
const feature4 = {
  title: "Comunidad",
  description: "Conoce historias de reencuentros, ayuda a otros usuarios reportando mascotas encontradas en tu zona y forma parte de una red que protege a los que no pueden hablar.",
  image: "/Comunidad.png"
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: dashboard
}, Symbol.toStringTag, { value: "Module" }));
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator-root",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const EmptyState = ({
  heading = "No se encontró a la mascota",
  description = "Vuelve a intentarlo. Asegúrate de que la mascota esté registrada en la aplicación.",
  url,
  variant = "outline",
  buttonText = "Continuar"
}) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen text-center", children: [
    /* @__PURE__ */ jsx(MdPets, { className: "h-16 w-16 mb-4" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold ", children: heading }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground w-5/6", children: description }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant,
        onClick: () => navigate(url),
        className: "mt-6 mb-30",
        children: buttonText
      }
    )
  ] });
};
const animalTypes = ["dog", "cat"];
const formatAnimalType = (animalType) => {
  switch (animalType) {
    case "dog":
      return "Perro";
    case "cat":
      return "Gato";
    default:
      throw new Error(`Unexpected animal type: ${animalType}`);
  }
};
const MyPetsView = () => {
  const [isLoadingPets, setIsLoadingPets] = useState(true);
  const [pets, setPets] = useState([]);
  const user = useUser();
  useEffect(() => {
    const loadPets = async () => {
      setIsLoadingPets(true);
      const result = await supabase.from("pet").select("*").eq("owner", user.id);
      setIsLoadingPets(false);
      if (result.error !== null) {
        toast.error("Ocurrió un error al obtener tus mascotas.");
        return;
      }
      setPets(result.data);
    };
    loadPets();
  }, [user]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("section", { className: "py-15", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5/6 md:max-w-screen-lg", children: [
      /* @__PURE__ */ jsx("div", { className: "text-center lg:text-left", children: /* @__PURE__ */ jsx("h1", { className: "text-left text-3xl font-medium md:text-4xl", children: "Mis mascotas" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 flex flex-col md:mt-14", children: [
        isLoadingPets && /* @__PURE__ */ jsx(Loader, {}),
        !isLoadingPets && pets.length === 0 && /* @__PURE__ */ jsx(
          EmptyState,
          {
            url: appRoutes.myPets,
            heading: "No tienes mascotas",
            description: "Dirígete a un punto de venta y adquiere tu tag para tu mascota",
            variant: "destructive"
          }
        ),
        !isLoadingPets && pets.length !== 0 && pets.map((pet2) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-xl", children: pet2.name }),
              /* @__PURE__ */ jsx("span", { className: "text-sm", children: formatAnimalType(pet2.animal_type) })
            ] }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", children: /* @__PURE__ */ jsxs(
              Link,
              {
                to: `${appRoutes.petDetails}/${pet2.id}`,
                className: "flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Ver" }),
                  /* @__PURE__ */ jsx(ArrowRight, {})
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(Separator, { className: "my-5" })
        ] }, pet2.id))
      ] })
    ] }) }) })
  ] });
};
function meta$1() {
  return [{
    title: "Mis mascotas"
  }];
}
const my_pets = withComponentProps(function MyPetsRoute() {
  return /* @__PURE__ */ jsx(MyPetsView, {});
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: my_pets,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}
const ErrorView = ({ message }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Alert, { variant: "destructive", className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 mb-3" }),
    /* @__PURE__ */ jsx(AlertTitle, { children: "Oops! Ha ocurrido un error" }),
    /* @__PURE__ */ jsx(AlertDescription, { children: message }),
    /* @__PURE__ */ jsx(Button, { className: "mt-3", variant: "outline", onClick: () => navigate(-1), children: "Regresar" })
  ] });
};
function DropdownMenu({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Root, { "data-slot": "dropdown-menu", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Trigger,
    {
      "data-slot": "dropdown-menu-trigger",
      ...props
    }
  );
}
function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        className
      ),
      ...props
    }
  ) });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DropdownMenuPrimitive.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function AlertDialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Root, { "data-slot": "alert-dialog", ...props });
}
function AlertDialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Trigger, { "data-slot": "alert-dialog-trigger", ...props });
}
function AlertDialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(AlertDialogPrimitive.Portal, { "data-slot": "alert-dialog-portal", ...props });
}
function AlertDialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Overlay,
    {
      "data-slot": "alert-dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function AlertDialogContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
    /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
    /* @__PURE__ */ jsx(
      AlertDialogPrimitive.Content,
      {
        "data-slot": "alert-dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props
      }
    )
  ] });
}
function AlertDialogHeader({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function AlertDialogFooter({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function AlertDialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Title,
    {
      "data-slot": "alert-dialog-title",
      className: cn("text-lg font-semibold", className),
      ...props
    }
  );
}
function AlertDialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Description,
    {
      "data-slot": "alert-dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function AlertDialogAction({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Action,
    {
      className: cn(buttonVariants(), className),
      ...props
    }
  );
}
function AlertDialogCancel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Cancel,
    {
      className: cn(buttonVariants({ variant: "outline" }), className),
      ...props
    }
  );
}
const ReportFoundPetAlertDialog = ({
  children,
  pet: pet2,
  report,
  onMarked
}) => {
  const markPetAsFound = async () => {
    const result = await supabase.from("lost_pet_report").update({ found_date: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", report.id);
    if (result.error !== null) {
      toast.error("Ocurrió un error. Inténtalo de nuevo.");
      return;
    }
    onMarked();
  };
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { className: "leading-6", children: [
          "¿Estás seguro de marcar a ",
          pet2.name,
          " como encontrado?"
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { className: "leading-5", children: "El reporte de desaparición de tu mascota ya no será visible en la sección de mascotas perdidas y otras personas no podrán ayudarte a encontrarla." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: markPetAsFound, children: "Continuar" })
      ] })
    ] })
  ] });
};
const ReportLostPetAlertDialog = ({ children, pet: pet2 }) => {
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { className: "leading-6", children: [
          "¿Estás seguro de marcar a ",
          pet2.name,
          " como perdido?"
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { className: "leading-5", children: "Esto marcará a tu mascota como perdida. Será visible en la sección de mascotas reportadas y otras personas podrán ayudarte a encontrarla." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: `${appRoutes.reportLostPet}/${pet2.id}`, children: "Continuar" }) })
      ] })
    ] })
  ] });
};
const ConfirmDeleteDialog = ({ children, pet: pet2 }) => {
  const deletePet = async () => {
    const result = await supabase.from("pet").delete().eq("id", pet2.id);
    if (result.error !== null) {
      toast.error("Ocurrió un error. Inténtalo de nuevo.");
      return;
    }
    toast.success(`La mascota ${pet2.name} ha sido eliminada.`);
  };
  return /* @__PURE__ */ jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsx(AlertDialogTrigger, { asChild: true, children }),
    /* @__PURE__ */ jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxs(AlertDialogTitle, { className: "leading-6", children: [
          "¿Estás seguro de que deseas eliminar a ",
          pet2.name,
          "?"
        ] }),
        /* @__PURE__ */ jsx(AlertDialogDescription, { className: "leading-5", children: "Esta acción no se puede deshacer." })
      ] }),
      /* @__PURE__ */ jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsx(AlertDialogCancel, { children: "Cancelar" }),
        /* @__PURE__ */ jsx(AlertDialogAction, { onClick: deletePet, asChild: true, children: /* @__PURE__ */ jsx(Link, { to: appRoutes.myPets, children: "Eliminar" }) })
      ] })
    ] })
  ] });
};
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
function CardFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className),
      ...props
    }
  );
}
const LostPetAlert = ({ pet: pet2, ...props }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(Card, { ...props, children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl sm:text-4xl", children: "Esta mascota se encuentra perdida" }) }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      "Por favor repórtala como encontrada y ayuda a ",
      pet2.name,
      " a regresar a casa"
    ] }),
    /* @__PURE__ */ jsx(CardFooter, { className: "flex justify-stretch", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: () => navigate(`${appRoutes.reportFoundPet}/${pet2.id}`),
        className: "w-full",
        children: "Reportar"
      }
    ) })
  ] });
};
const FilledPetDataView = ({
  pet: pet2,
  wasScannedFromTag,
  isOwner,
  ...props
}) => {
  const tabs = [
    {
      id: "tab-1",
      icon: /* @__PURE__ */ jsx(Paw, { size: 18, weight: "Linear" }),
      label: "Perfil",
      content: {
        title: "Perfil",
        attributes: [
          {
            label: "Edad",
            value: formatAge(calculateAge$1(pet2.birth_date))
          },
          { label: "Sexo", value: formatAnimalSex(pet2.sex) },
          {
            label: "Especie",
            value: formatAnimalType(pet2.animal_type)
          },
          { label: "Raza", value: pet2.breed ?? "No especificada" },
          { label: "Notas", value: pet2.notes }
        ]
      }
    },
    {
      id: "tab-2",
      icon: /* @__PURE__ */ jsx(ClipboardHeart, { size: 18, weight: "Linear" }),
      label: "Información médica",
      content: {
        title: "Ficha médica",
        attributes: [
          {
            label: "Castrado/Esterilizada",
            value: pet2.spayed_or_neutered ? "Sí" : "No"
          },
          { label: "Alergias", value: "No especificadas" }
        ]
      }
    }
  ];
  const petImageUrl = pet2.image ? supabase.storage.from("pets-portraits").getPublicUrl(pet2.image).data.publicUrl : null;
  return /* @__PURE__ */ jsx("section", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
      wasScannedFromTag && props.activeLostReport !== null && /* @__PURE__ */ jsx(LostPetAlert, { pet: pet2, className: "mb-5 mx-7" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flow-row items-baseline justify-center mx-2", children: [
        isOwner && /* @__PURE__ */ jsx(Options, { pet: pet2, ...props, className: "mr-1" }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: cn(
              "max-w max-w-5/6 md:max-w-2xl text-3xl font-semibold md:text-4xl",
              isOwner && "mr-7"
            ),
            children: pet2.name
          }
        )
      ] }),
      petImageUrl && /* @__PURE__ */ jsx("div", { className: "relative h-[200px] w-full lg:h-[400px] sm:hidden px-5 sm:px-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: petImageUrl,
          alt: "Foto de la mascota",
          className: "h-full w-full rounded-xl object-contain",
          width: 600,
          height: 400
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: tabs[0].id, className: "mt-6", children: [
      /* @__PURE__ */ jsx(TabsList, { className: "container flex flex-col items-center justify-center gap-2 sm:flex-row md:gap-10", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
        TabsTrigger,
        {
          value: tab.id,
          className: "flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary",
          children: [
            tab.icon,
            " ",
            tab.label
          ]
        },
        tab.id
      )) }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-5 md:mt-8 max-w-5/6 md:max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16", children: /* @__PURE__ */ jsx("div", { className: "relative", children: tabs.map((tab) => /* @__PURE__ */ jsxs(
        TabsContent,
        {
          value: tab.id,
          className: "grid place-items-start gap-7 lg:grid-cols-2 lg:gap-10",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-5 w-full lg:w-4/5 h-full justify-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-3xl font-semibold lg:text-5xl", children: tab.content.title }),
              /* @__PURE__ */ jsxs("ul", { className: "text-muted-foreground lg:text-lg", children: [
                /* @__PURE__ */ jsx(Separator, { className: "my-2" }),
                tab.content.attributes.map((attribute, index2) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
                  /* @__PURE__ */ jsxs("li", { className: "flex", children: [
                    /* @__PURE__ */ jsxs("span", { className: "font-medium w-2/5", children: [
                      attribute.label,
                      ":"
                    ] }),
                    /* @__PURE__ */ jsx("span", { className: "w-3/5 text-right", children: attribute.value })
                  ] }),
                  /* @__PURE__ */ jsx(Separator, { className: "my-2" })
                ] }, index2))
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "relative h-[300px] w-full lg:h-[400px] hidden sm:block", children: petImageUrl && /* @__PURE__ */ jsx("div", { className: "relative h-[300px] w-full lg:h-[400px] ", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: petImageUrl,
                alt: "Foto de la mascota",
                className: "h-full w-full rounded-xl object-cover",
                width: 600,
                height: 400
              }
            ) }) })
          ]
        },
        tab.id
      )) }) })
    ] })
  ] }) });
};
const Options = ({
  pet: pet2,
  activeLostReport,
  onMarkPetAsFound,
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "ghost",
        className: cn(
          "flex text-muted-foreground data-[state=open]:bg-muted",
          className
        ),
        size: "icon",
        ...props,
        children: [
          /* @__PURE__ */ jsx(MenuDotsCircle, { weight: "Linear", size: 52 }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Open menu" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "center", className: "w-40", children: [
      /* @__PURE__ */ jsx(DropdownMenuItem, { onSelect: (event) => event.preventDefault(), asChild: true, children: /* @__PURE__ */ jsxs(Link, { to: `${appRoutes.editPet}/${pet2.id}`, className: "flex w-full", children: [
        /* @__PURE__ */ jsx(Pen, {}),
        "Editar"
      ] }) }),
      /* @__PURE__ */ jsx(ConfirmDeleteDialog, { pet: pet2, children: /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: (event) => event.preventDefault(), children: [
        /* @__PURE__ */ jsx(TrashBinTrash, {}),
        "Eliminar"
      ] }) }),
      activeLostReport !== null && /* @__PURE__ */ jsx(
        ReportFoundPetAlertDialog,
        {
          pet: pet2,
          report: activeLostReport,
          onMarked: onMarkPetAsFound,
          children: /* @__PURE__ */ jsxs(DropdownMenuItem, { onSelect: (event) => event.preventDefault(), children: [
            /* @__PURE__ */ jsx(Flag, { weight: "Linear" }),
            "Reportar como encontrada"
          ] })
        }
      ),
      activeLostReport === null && /* @__PURE__ */ jsx(ReportLostPetAlertDialog, { pet: pet2, children: /* @__PURE__ */ jsxs(
        DropdownMenuItem,
        {
          variant: "destructive",
          onSelect: (event) => event.preventDefault(),
          children: [
            /* @__PURE__ */ jsx(DangerCircle, { weight: "Linear" }),
            "Reportar como perdido"
          ]
        }
      ) })
    ] })
  ] });
};
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronLeft, { className: cn("size-4", className2), ...props2 }),
        IconRight: ({ className: className2, ...props2 }) => /* @__PURE__ */ jsx(ChevronRight, { className: cn("size-4", className2), ...props2 })
      },
      ...props
    }
  );
}
function Command({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md",
        className
      ),
      ...props
    }
  );
}
function CommandInput({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        /* @__PURE__ */ jsx(SearchIcon, { className: "size-4 shrink-0 opacity-50" }),
        /* @__PURE__ */ jsx(
          Command$1.Input,
          {
            "data-slot": "command-input",
            className: cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              className
            ),
            ...props
          }
        )
      ]
    }
  );
}
function CommandList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Empty,
    {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        "text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium",
        className
      ),
      ...props
    }
  );
}
function CommandItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const Form = FormProvider;
const FormFieldContext = React.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = React.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = React.useId();
  return /* @__PURE__ */ jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String((error == null ? void 0 : error.message) ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-destructive text-sm", className),
      ...props,
      children: body
    }
  );
}
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
function RadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Root,
    {
      "data-slot": "radio-group",
      className: cn("grid gap-3", className),
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      "data-slot": "radio-group-item",
      className: cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        RadioGroupPrimitive.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ jsx(CircleIcon, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" })
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
var AnimalSex = /* @__PURE__ */ ((AnimalSex2) => {
  AnimalSex2["Male"] = "male";
  AnimalSex2["Female"] = "female";
  return AnimalSex2;
})(AnimalSex || {});
const formSchemaForRegister = z.object({
  name: z.string({ required_error: "El nombre de tu mascota es requerido." }).trim().min(2, "El nombre debe contener al menos 2 caracteres."),
  birthDate: z.date({
    required_error: "Es necesaria la fecha de nacimiento/adopción de tu mascota para aproximar su edad."
  }),
  sex: z.nativeEnum(AnimalSex, {
    required_error: "Selecciona el sexo de tu mascota."
  }),
  animalType: z.enum(animalTypes, {
    required_error: "La especie de tu mascota es requerida para su registro."
  }),
  breed: z.string().optional(),
  spayedOrNeutered: z.boolean(),
  portrait: (typeof window === "undefined" ? z.any() : z.instanceof(FileList)).refine(
    (files) => (files == null ? void 0 : files.length) === 1,
    "La imagen de tu mascota es requerida."
  ).refine(
    (files) => {
      var _a;
      return ACCEPTED_IMAGE_TYPES.includes(((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.type) ?? "");
    },
    "Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados."
  ).refine(
    (files) => {
      var _a;
      return (((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.size) ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE;
    },
    "El tamaño máximo de la foto es 5MB."
  ),
  notes: z.string().optional()
});
const formSchemaForUpdate = z.object({
  name: z.string({ required_error: "El nombre de tu mascota es requerido." }).trim().min(2, "El nombre debe contener al menos 2 caracteres."),
  birthDate: z.date({
    required_error: "Es necesaria la fecha de nacimiento/adopción de tu mascota para aproximar su edad."
  }),
  sex: z.nativeEnum(AnimalSex, {
    required_error: "Selecciona el sexo de tu mascota."
  }),
  animalType: z.enum(animalTypes, {
    required_error: "La especie de tu mascota es requerida para su registro."
  }),
  breed: z.string().optional(),
  spayedOrNeutered: z.boolean(),
  portrait: (typeof window === "undefined" ? z.any() : z.instanceof(FileList)).optional().refine(
    (files) => (files == null ? void 0 : files.length) === 0 || (files == null ? void 0 : files.length) === 1,
    "La imagen de tu mascota es requerida."
  ).refine(
    (files) => {
      var _a;
      return (files == null ? void 0 : files.length) === 0 || ACCEPTED_IMAGE_TYPES.includes(((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.type) ?? "");
    },
    "Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados."
  ).refine(
    (files) => {
      var _a;
      return (files == null ? void 0 : files.length) === 0 || (((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.size) ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE;
    },
    "El tamaño máximo de la foto es 5MB."
  ),
  notes: z.string().optional()
});
const RegisterPetForm = ({
  petId,
  onRegisterUpdated,
  submitButtonText = "Actualizar información",
  previousValues,
  isUpdate = false
}) => {
  const formSchema2 = isUpdate ? formSchemaForUpdate : formSchemaForRegister;
  const [isLoading, setIsLoading] = useState(false);
  const petImageUrl = (previousValues == null ? void 0 : previousValues.image) ? supabase.storage.from("pets-portraits").getPublicUrl(previousValues.image).data.publicUrl : void 0;
  const [imagePreview, setImagePreview] = useState(
    petImageUrl
  );
  const user = useUser();
  const form = useForm({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      name: (previousValues == null ? void 0 : previousValues.name) || "",
      birthDate: (previousValues == null ? void 0 : previousValues.birthDate) || void 0,
      sex: (previousValues == null ? void 0 : previousValues.sex) || void 0,
      animalType: (previousValues == null ? void 0 : previousValues.animalType) || void 0,
      breed: (previousValues == null ? void 0 : previousValues.breed) || void 0,
      spayedOrNeutered: (previousValues == null ? void 0 : previousValues.spayedOrNeutered) || false,
      notes: (previousValues == null ? void 0 : previousValues.notes) || void 0
    }
  });
  const portraitReference = form.register("portrait");
  const handleImageChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (values) => {
    var _a;
    setIsLoading(true);
    let uploadedImagePath = ((_a = values.portrait) == null ? void 0 : _a.length) ? await uploadPortrait(values.portrait, "pets-portraits") : previousValues == null ? void 0 : previousValues.image;
    if (uploadedImagePath === null) {
      toast.error(
        "Ocurrió un error al editar la información de tu mascota. Inténtalo de nuevo."
      );
      return;
    }
    const updateResult = await supabase.from("pet").update({
      name: values.name.trim(),
      birth_date: values.birthDate.toISOString(),
      sex: values.sex,
      animal_type: values.animalType,
      breed: values.breed,
      spayed_or_neutered: values.spayedOrNeutered,
      notes: values.notes,
      owner: user.id,
      image: uploadedImagePath
    }).eq("id", petId).select().single();
    setIsLoading(false);
    if (updateResult.error === null) {
      onRegisterUpdated(updateResult.data);
      return;
    }
    toast.error(
      "Ocurrió un error al editar la información de tu mascota. Inténtalo de nuevo."
    );
    console.error(updateResult.error);
  };
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "name",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Nombre" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "birthDate",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Fecha de nacimiento/adopción" }),
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                className: cn(
                  "pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                ),
                children: [
                  field.value ? format(field.value, "PPP", { locale: es }) : /* @__PURE__ */ jsx("span", { children: "Selecciona una fecha" }),
                  /* @__PURE__ */ jsx(CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
              Calendar,
              {
                mode: "single",
                selected: field.value,
                onSelect: field.onChange,
                disabled: (date) => date > /* @__PURE__ */ new Date() || date < /* @__PURE__ */ new Date("1900-01-01"),
                initialFocus: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(FormDescription, { children: "Selecciona la fecha más aproximada de nacimiento o adopción de tu mascota. Esto nos servirá para aproximar su edad." }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "sex",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Sexo" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
            RadioGroup,
            {
              onValueChange: field.onChange,
              defaultValue: field.value,
              className: "flex flex-col space-y-1",
              children: [
                /* @__PURE__ */ jsxs(FormItem, { className: "flex items-center space-x-3 space-y-0", children: [
                  /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RadioGroupItem, { value: AnimalSex.Male }) }),
                  /* @__PURE__ */ jsx(FormLabel, { children: "Macho" })
                ] }),
                /* @__PURE__ */ jsxs(FormItem, { className: "flex items-center space-x-3 space-y-0", children: [
                  /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(RadioGroupItem, { value: AnimalSex.Female }) }),
                  /* @__PURE__ */ jsx(FormLabel, { children: "Hembra" })
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "animalType",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Especie" }),
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                role: "combobox",
                className: cn(
                  "justify-between",
                  !field.value && "text-muted-foreground"
                ),
                children: [
                  field.value ? formatAnimalType(field.value) : "Selecciona la especie de tu mascota",
                  /* @__PURE__ */ jsx(ChevronsUpDown, { className: "opacity-50" })
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-[200px] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
              /* @__PURE__ */ jsx(
                CommandInput,
                {
                  placeholder: "Busca la especie...",
                  className: "h-9"
                }
              ),
              /* @__PURE__ */ jsxs(CommandList, { children: [
                /* @__PURE__ */ jsx(CommandEmpty, { children: "No está disponible la especie de tu mascota." }),
                /* @__PURE__ */ jsx(CommandGroup, { children: animalTypes.map((type) => /* @__PURE__ */ jsxs(
                  CommandItem,
                  {
                    value: type,
                    onSelect: () => {
                      form.setValue("animalType", type);
                    },
                    children: [
                      formatAnimalType(type),
                      /* @__PURE__ */ jsx(
                        Check,
                        {
                          className: cn(
                            "ml-auto",
                            type === field.value ? "opacity-100" : "opacity-0"
                          )
                        }
                      )
                    ]
                  },
                  type
                )) })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "breed",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Raza (opcional)" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "spayedOrNeutered",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0", children: [
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Checkbox,
            {
              checked: field.value,
              onCheckedChange: field.onChange
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1 leading-none", children: [
            /* @__PURE__ */ jsx(FormLabel, { children: "Castrado/esterilizada" }),
            /* @__PURE__ */ jsx(FormDescription, { children: "Si no estás seguro, deja la casilla desmarcada." })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "portrait",
        render: () => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Foto" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
            imagePreview && /* @__PURE__ */ jsx(
              "img",
              {
                src: imagePreview,
                alt: "Vista previa",
                className: "h-32 w-32 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "file",
                ...portraitReference,
                onChange: (event) => {
                  handleImageChange(event);
                }
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "notes",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Notas" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            Textarea,
            {
              placeholder: "Dinos qué hace peculiar y única a tu mascota",
              ...field
            }
          ) }),
          /* @__PURE__ */ jsx(FormDescription, { children: "Puedes mencionar datos como apodos a los que responde, rasgos de su comportamiento, gustos y observaciones al convivir con tu mascota." }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(PenNewRound, { weight: "LineDuotone" }),
      " ",
      submitButtonText
    ] }) })
  ] }) });
};
const RegisterPetIntroductionView = ({
  className,
  petId,
  onPetRegistered,
  ...props
}) => {
  return /* @__PURE__ */ jsxs(Card, { className: cn("m-3", className), ...props, children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl sm:text-4xl", children: "Registra a tu mascota" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Notamos que tu mascota aún no tiene un perfil creado. Llena la siguiente información para que cualquier persona que encuentre a tu mascota y escanee su collar pueda acceder a la información más esencial." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "grid gap-4", children: /* @__PURE__ */ jsx(
      RegisterPetForm,
      {
        petId,
        onRegisterUpdated: onPetRegistered,
        submitButtonText: "Registrar"
      }
    ) })
  ] });
};
const PetDetailsView = () => {
  const { petId } = useParams();
  const [queryParameters] = useSearchParams();
  const [isLoadingPet, setIsLoadingPet] = useState(true);
  const [error, setError] = useState(null);
  const [pet2, setPet] = useState(null);
  const [activeLostReport, setActiveLostReport] = useState(null);
  const encryptedPetId = queryParameters.get("pet");
  const wasScannedFromTag = encryptedPetId !== null && encryptedPetId === petId;
  const user = useUser();
  const isOwner = (user == null ? void 0 : user.id) === (pet2 == null ? void 0 : pet2.owner);
  const onRegisteredPet = (pet22) => {
    setPet(pet22);
    toast.success("Tu mascota ha sido registrada");
  };
  const onMarkPetAsFound = () => {
    setActiveLostReport(null);
    toast.success("Tu mascota ha sido marcada como encontrada. ¡Felicidades!");
  };
  useEffect(() => {
    const loadPet = async () => {
      setIsLoadingPet(true);
      if (!petId) {
        setIsLoadingPet(false);
        return;
      }
      const { data, error: error2 } = await supabase.from("pet").select("*").eq("id", petId).single();
      if (error2 !== null) {
        setError("Mascota no encontrada");
        return;
      }
      setPet(data);
      loadPetActiveLostReports(data);
    };
    const loadPetActiveLostReports = async (pet22) => {
      const result = await supabase.from("lost_pet_report").select("*").eq("pet", pet22.id);
      setIsLoadingPet(false);
      if (result.error !== null) {
        setError("Mascota no encontrada");
        return;
      }
      const reports = result.data;
      const activeReports = reports.filter(
        (report) => report.found_date === null
      );
      if (activeReports.length >= 1) setActiveLostReport(activeReports.at(0));
    };
    loadPet();
  }, [petId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    isLoadingPet && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-10", children: [
      /* @__PURE__ */ jsx(Loader, { className: "mb-3" }),
      /* @__PURE__ */ jsx("p", { children: "Cargando mascota..." })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "p-3", children: /* @__PURE__ */ jsx(ErrorView, { message: error }) }),
    !isLoadingPet && pet2 && isPetDataAlreadyFilled(pet2) && /* @__PURE__ */ jsx(
      FilledPetDataView,
      {
        pet: pet2,
        activeLostReport,
        onMarkPetAsFound,
        wasScannedFromTag,
        isOwner
      }
    ),
    !isLoadingPet && pet2 && !isPetDataAlreadyFilled(pet2) && /* @__PURE__ */ jsx(
      RegisterPetIntroductionView,
      {
        petId,
        onPetRegistered: onRegisteredPet
      }
    )
  ] });
};
const PetRoute = () => /* @__PURE__ */ jsx(PetDetailsView, {});
const pet = withComponentProps(PetRoute);
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: pet
}, Symbol.toStringTag, { value: "Module" }));
const EditPetDetailsView = ({
  className,
  ...props
}) => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [isLoadingPet, setIsLoadingPet] = useState(true);
  const [pet2, setPet] = useState(null);
  const onPetRegistered = () => {
    toast.success("Tu mascota ha sido registrada");
    navigate(appRoutes.myPets);
  };
  useEffect(() => {
    const loadPet = async () => {
      setIsLoadingPet(true);
      if (!petId) {
        setIsLoadingPet(false);
        return;
      }
      const { data, error } = await supabase.from("pet").select("*").eq("id", petId).single();
      if (error !== null) {
        return;
      }
      setPet(data);
      setIsLoadingPet(false);
    };
    loadPet();
  }, [petId]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    isLoadingPet && /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-10", children: [
      /* @__PURE__ */ jsx(Loader, { className: "mb-3" }),
      /* @__PURE__ */ jsx("p", { children: "Cargando..." })
    ] }),
    !isLoadingPet && /* @__PURE__ */ jsxs(Card, { className: cn("m-3", className), ...props, children: [
      /* @__PURE__ */ jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl sm:text-4xl", children: "Editar Información" }),
        /* @__PURE__ */ jsx(CardDescription, { children: "Edita la información de tu mascota. Asegúrate de que todos los detalles sean correctos." })
      ] }),
      /* @__PURE__ */ jsx(CardContent, { className: "grid gap-4", children: /* @__PURE__ */ jsx(
        RegisterPetForm,
        {
          petId,
          onRegisterUpdated: onPetRegistered,
          previousValues: {
            name: (pet2 == null ? void 0 : pet2.name) || "",
            birthDate: (pet2 == null ? void 0 : pet2.birth_date) ? new Date(pet2.birth_date) : void 0,
            sex: pet2 == null ? void 0 : pet2.sex,
            animalType: (pet2 == null ? void 0 : pet2.animal_type) ?? void 0,
            breed: (pet2 == null ? void 0 : pet2.breed) ?? void 0,
            spayedOrNeutered: (pet2 == null ? void 0 : pet2.spayed_or_neutered) ?? void 0,
            image: (pet2 == null ? void 0 : pet2.image) ?? void 0,
            notes: pet2 == null ? void 0 : pet2.notes
          },
          isUpdate: true
        }
      ) })
    ] })
  ] });
};
const Component$5 = () => /* @__PURE__ */ jsx(EditPetDetailsView, {});
const edit_pet = withComponentProps(Component$5);
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: edit_pet
}, Symbol.toStringTag, { value: "Module" }));
const CarouselContext = React.createContext(null);
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const onSelect = React.useCallback((api2) => {
    if (!api2) return;
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = React.useCallback(() => {
    api == null ? void 0 : api.scrollPrev();
  }, [api]);
  const scrollNext = React.useCallback(() => {
    api == null ? void 0 : api.scrollNext();
  }, [api]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  React.useEffect(() => {
    if (!api || !setApi) return;
    setApi(api);
  }, [api, setApi]);
  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api == null ? void 0 : api.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || ((opts == null ? void 0 : opts.axis) === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          "data-slot": "carousel",
          ...props,
          children
        }
      )
    }
  );
}
function CarouselContent({ className, ...props }) {
  const { carouselRef, orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: carouselRef,
      className: "overflow-hidden",
      "data-slot": "carousel-content",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className
          ),
          ...props
        }
      )
    }
  );
}
function CarouselItem({ className, ...props }) {
  const { orientation } = useCarousel();
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      "data-slot": "carousel-item",
      className: cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      ),
      ...props
    }
  );
}
const CarouselItemCard = ({ userPet }) => {
  const imageUrl = supabase.storage.from("pets-portraits").getPublicUrl(userPet.image).data.publicUrl;
  return /* @__PURE__ */ jsx(CarouselItem, { className: "pl-4 md:max-w-[452px]", children: /* @__PURE__ */ jsx(ReportLostPetAlertDialog, { pet: userPet, children: /* @__PURE__ */ jsxs("div", { className: "group flex flex-col justify-between", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "flex aspect-[3/2] overflow-clip rounded-xl", children: /* @__PURE__ */ jsx("div", { className: "relative h-full w-full origin-bottom transition duration-300 group-hover:scale-105", children: userPet.image ? /* @__PURE__ */ jsx(
      "img",
      {
        src: imageUrl,
        alt: userPet.name,
        loading: "lazy",
        className: "h-full w-full object-cover object-center"
      }
    ) : /* @__PURE__ */ jsx(MdPets, { className: "h-full w-full p-10 text-muted-foreground" }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-2 line-clamp-3 pt-4 text-lg font-medium break-words md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl", children: userPet.name }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 line-clamp-2 text-sm text-muted-foreground md:mb-12 md:text-base lg:mb-9", children: [
      userPet.breed ? `${formatAnimalType(userPet.animal_type)} - ${userPet.breed}` : formatAnimalType(userPet.animal_type),
      /* @__PURE__ */ jsx("br", {}),
      formatAnimalSex(userPet.sex)
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm", children: [
      "Reportar como perdida",
      " ",
      /* @__PURE__ */ jsx(ArrowRight$1, { className: "ml-2 size-5 transition-transform group-hover:translate-x-1" })
    ] })
  ] }) }) }, userPet.id);
};
const CarouselControls = ({
  carouselApi,
  canScrollPrev,
  canScrollNext
}) => /* @__PURE__ */ jsxs("div", { className: "mt-8 flex shrink-0 items-center justify-start gap-2", children: [
  /* @__PURE__ */ jsx(
    Button,
    {
      size: "icon",
      variant: "outline",
      onClick: () => {
        carouselApi == null ? void 0 : carouselApi.scrollPrev();
      },
      disabled: !canScrollPrev,
      className: "disabled:pointer-events-auto",
      children: /* @__PURE__ */ jsx(ArrowLeft, { className: "size-5" })
    }
  ),
  /* @__PURE__ */ jsx(
    Button,
    {
      size: "icon",
      variant: "outline",
      onClick: () => {
        carouselApi == null ? void 0 : carouselApi.scrollNext();
      },
      disabled: !canScrollNext,
      className: "disabled:pointer-events-auto",
      children: /* @__PURE__ */ jsx(ArrowRight$1, { className: "size-5" })
    }
  )
] });
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
const SkeletonLoader = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4 py-15 mx-10 lg:mx-15", children: [
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[200px] h-[35px] mb-2" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "w-[300px] h-[25px]" }),
  /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mt-4", children: [
    /* @__PURE__ */ jsx("div", { className: "sm:block md:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2 w-15/16 h-[300px] bg-gray-300 rounded-md animate-pulse", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-[210px] w-full bg-gray-200 rounded-md" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 rounded-md mx-auto mt-3" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2 rounded-md mx-auto" })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:grid md:grid-cols-2 gap-4 lg:hidden", children: Array(2).fill(null).map((_, index2) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col gap-2 w-full h-[300px] bg-gray-300 rounded-md animate-pulse",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-[210px] w-full bg-gray-200 rounded-md" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 rounded-md mx-auto mt-3" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2 rounded-md mx-auto" })
        ]
      },
      index2
    )) }),
    /* @__PURE__ */ jsx("div", { className: "hidden lg:grid lg:grid-cols-3 gap-4", children: Array(3).fill(null).map((_, index2) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex flex-col gap-2 w-full h-[300px] bg-gray-300 rounded-md animate-pulse",
        children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-[210px] w-full bg-gray-200 rounded-md" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/4 rounded-md mx-auto mt-3" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2 rounded-md mx-auto" })
        ]
      },
      index2
    )) })
  ] })
] });
const ReportLostPetPage = ({ heading = "Reportar Mascota" }) => {
  const user = useUser();
  const [petsWithNotActiveLostReports, setPetsWithNotActiveLostReports] = useState([]);
  const [carouselApi, setCarouselApi] = useState();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const allUserPetsResult = await supabase.from("pet").select("*").eq("owner", user.id);
      if (allUserPetsResult.error !== null) {
        toast.error(
          "Ocurrió un error al obtener tus mascotas. Inténtalo de nuevo."
        );
        setLoading(false);
        return;
      }
      for (const pet2 of allUserPetsResult.data) {
        const reportsResult = await supabase.from("lost_pet_report").select("*").eq("pet", pet2.id);
        if (reportsResult.error !== null) {
          toast.error(
            "Ocurrió un error al obtener tus mascotas. Inténtalo de nuevo."
          );
          setLoading(false);
          setPetsWithNotActiveLostReports([]);
          break;
        }
        const reports = reportsResult.data;
        if (reports.length === 0 || reports.every((report) => report.found_date !== null)) {
          setPetsWithNotActiveLostReports((currentPets) => [
            ...currentPets,
            pet2
          ]);
        }
      }
      setLoading(false);
    };
    if (!user) return;
    fetchData();
  }, [user]);
  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    loading && /* @__PURE__ */ jsx(SkeletonLoader, {}),
    !loading && petsWithNotActiveLostReports.length > 0 && /* @__PURE__ */ jsxs("section", { className: "py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "mb-8 ml-7 lg:ml-15 flex flex-col justify-between md:mb-14 md:flex-row md:items-end lg:mb-16", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-3 text-3xl font-semibold md:mb-4 md:text-4xl", children: heading }),
          /* @__PURE__ */ jsx("div", { className: "group flex items-center gap-1 text-sm font-medium md:text-base lg:text-lg", children: "Mascotas que puedes reportar como perdidas" })
        ] }),
        /* @__PURE__ */ jsx(
          CarouselControls,
          {
            carouselApi,
            canScrollPrev,
            canScrollNext
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(
        Carousel,
        {
          setApi: setCarouselApi,
          opts: {
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true
              }
            }
          },
          className: "relative left-[-1rem]",
          children: /* @__PURE__ */ jsx(CarouselContent, { className: "-mr-4 ml-8 2xl:mr-[max(0rem,calc(50vw-700px-1rem))] 2xl:ml-[max(8rem,calc(50vw-700px+1rem))]", children: petsWithNotActiveLostReports.map((userPet) => /* @__PURE__ */ jsx(CarouselItemCard, { userPet }, userPet.id)) })
        }
      ) })
    ] }),
    !loading && petsWithNotActiveLostReports.length === 0 && /* @__PURE__ */ jsx(
      EmptyState,
      {
        heading: "No tienes mascotas mascotas para reportar",
        description: "Adquiere tu tag NFC en nuestros puntos de venta y registra a tu mascota!",
        url: appRoutes.myPets
      }
    )
  ] });
};
const Component$4 = () => /* @__PURE__ */ jsx(ReportLostPetPage, {});
const report_lost_pet = withComponentProps(Component$4);
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: report_lost_pet
}, Symbol.toStringTag, { value: "Module" }));
const formSchema = z.object({
  lastSeenDate: z.date({
    required_error: "Es importante que indiques la fecha en la que viste por última vez a tu mascota"
  }),
  lastSeenAddress: z.string({
    required_error: "Es importante que indiques la dirección en la que viste por última vez a tu mascota"
  }).trim().min(2),
  contactNumber: z.string({
    required_error: "El teléfono de contacto es requerido"
  }).regex(/^\d{8}$/, "Ingresa un número de teléfono válido"),
  notes: z.string().optional()
});
const ReportLostPetView = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const [isReporting, setIsReporting] = useState(false);
  const [isLoadingPet, setIsLoadingPet] = useState(true);
  const [pet2, setPet] = useState(null);
  useEffect(() => {
    const fetchPet = async () => {
      setIsLoadingPet(true);
      const result = await supabase.from("pet").select("*").eq("id", petId);
      setIsLoadingPet(false);
      if (result.error !== null) {
        toast.error("Ocurrió un error. Inténtalo de nuevo.");
        return;
      }
      if (result.data.length === 0) {
        toast.error("La mascota que intentas reportar como perdida no existe.");
        return;
      }
      setPet(result.data.at(0));
    };
    if (petId === null) return;
    fetchPet();
  }, [petId]);
  const handleSubmit = async (values) => {
    setIsReporting(true);
    const result = await supabase.from("lost_pet_report").insert({
      pet: pet2.id,
      last_seen_address: values.lastSeenAddress,
      last_seen_date: values.lastSeenDate.toISOString(),
      contact_number: values.contactNumber,
      notes: values.notes
    });
    setIsReporting(false);
    if (result.error !== null) {
      toast.error(
        "Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo."
      );
      console.error(result.error);
      return;
    }
    toast.info("Tu mascota ha sido reportada como perdida.");
    navigate(`${appRoutes.petDetails}/${pet2.id}`, { replace: true });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    isLoadingPet && /* @__PURE__ */ jsx(Loader, { className: "mx-auto mt-5" }),
    !isLoadingPet && !pet2 && /* @__PURE__ */ jsx(EmptyState, { url: appRoutes.landing, buttonText: "Entendido" }),
    !isLoadingPet && pet2 && /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs("h2", { className: "font-bold text-3xl mb-8", children: [
        "Reportar a ",
        pet2.name,
        " como",
        " ",
        pet2.sex === "male" ? "perdido" : "perdida"
      ] }),
      /* @__PURE__ */ jsx(
        ReportLostPetForm,
        {
          onReport: handleSubmit,
          isReporting
        }
      )
    ] })
  ] });
};
const ReportLostPetForm = ({
  onReport,
  isReporting
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastSeenDate: void 0,
      lastSeenAddress: void 0,
      contactNumber: void 0
    }
  });
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onReport), className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "lastSeenDate",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Última fecha en la que fue vista tu mascota" }),
          /* @__PURE__ */ jsxs(Popover, { children: [
            /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsxs(
              Button,
              {
                variant: "outline",
                className: cn(
                  "pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                ),
                children: [
                  field.value ? format(field.value, "PPP", { locale: es }) : /* @__PURE__ */ jsx("span", { children: "Selecciona una fecha" }),
                  /* @__PURE__ */ jsx(Calendar$1, { className: "ml-auto h-4 w-4" })
                ]
              }
            ) }) }),
            /* @__PURE__ */ jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: /* @__PURE__ */ jsx(
              Calendar,
              {
                mode: "single",
                selected: field.value,
                onSelect: field.onChange,
                disabled: (date) => date > /* @__PURE__ */ new Date() || date < /* @__PURE__ */ new Date("1900-01-01"),
                initialFocus: true
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "lastSeenAddress",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Dirección donde fue vista tu mascota por última vez" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: "Ej.: Zona 10, Ciudad Capital" }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "contactNumber",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Teléfono de contacto" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field, placeholder: "Ej.: 12345678" }) }),
          /* @__PURE__ */ jsx(FormDescription, { children: "Indica un número de teléfono en donde la persona que encuentre a tu mascota pueda contactarte. Este número solo será visible si la persona escanea el tag físico de tu mascota. Ingrésalo sin guiones ni espacios." }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "notes",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Notas" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Textarea, { ...field }) }),
          /* @__PURE__ */ jsx(FormDescription, { children: "Puedes mencionar datos como cuidados especiales, medicamentos que está tomando actualmente u otra información para que la persona que encuentre a tu mascota la tome en cuenta." }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", disabled: isReporting, children: isReporting ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsx("span", { children: "Reportar" }) })
  ] }) });
};
const Component$3 = () => /* @__PURE__ */ jsx(ReportLostPetView, {});
const report_lost_pet_form = withComponentProps(Component$3);
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: report_lost_pet_form
}, Symbol.toStringTag, { value: "Module" }));
const baseUrl = "https://www.reactemailtemplate.com/";
const PetFoundNotification = ({
  petName,
  petSex,
  finderName,
  finderLastName,
  city,
  location,
  contactNumber,
  notes,
  link
}) => {
  const heading = petSex === "male" ? `¡${petName} ha sido reportado como encontrado!` : `¡${petName} ha sido reportada como encontrada!`;
  const found = petSex === "male" ? "encontrado" : "encontrada";
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, { children: /* @__PURE__ */ jsx(
      Font,
      {
        fontFamily: "Inter",
        fallbackFontFamily: "Helvetica",
        webFont: {
          url: "https://fonts.googleapis.com/css2?family=Inter&display=swap",
          format: "woff2"
        },
        fontWeight: 400,
        fontStyle: "normal"
      }
    ) }),
    /* @__PURE__ */ jsx(Preview, { children: heading }),
    /* @__PURE__ */ jsx(Tailwind, { children: /* @__PURE__ */ jsx(Body, { className: "mx-auto my-auto bg-white font-sans antialiased", children: /* @__PURE__ */ jsxs(Container, { className: "mx-auto my-[40px] rounded border border-solid border-gray-200 bg-white px-8", children: [
      /* @__PURE__ */ jsx(Section, { className: "py-10", children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsx(Column, { className: "w-[80%]", children: /* @__PURE__ */ jsx(Link$1, { href: "https://pet-tracker-eosin.vercel.app/", children: /* @__PURE__ */ jsx(
          Img,
          {
            src: "https://pet-tracker-eosin.vercel.app/PetTrackerLogo.png",
            width: "62",
            height: "60",
            alt: "PetTracker Logo"
          }
        ) }) }),
        /* @__PURE__ */ jsx(Column, { align: "right", children: /* @__PURE__ */ jsxs(Row, { align: "right", children: [
          /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
            Img,
            {
              src: `${baseUrl}/facebook-logo.png`,
              width: "36",
              height: "36",
              className: "mx-1"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
            Img,
            {
              src: `${baseUrl}/twitter-logo.png`,
              width: "36",
              height: "36",
              className: "mx-1"
            }
          ) }) }),
          /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
            Img,
            {
              src: `${baseUrl}/instagram-logo.png`,
              width: "36",
              height: "36",
              className: "ml-1"
            }
          ) }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx(Section, { className: "rounded-xl bg-blue-500", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto my-auto p-10", children: [
        /* @__PURE__ */ jsx(Text, { className: "m-0 text-white" }),
        /* @__PURE__ */ jsx(Heading, { className: "m-0 mt-1 leading-[35px] font-bold text-white", as: "h1", children: heading }),
        /* @__PURE__ */ jsxs(Text, { className: "mb-1 text-[16px] italic leading-[20px] mt-3 text-white", children: [
          "Reporta a ",
          petName,
          " como ",
          found,
          " para que se elimine de mascotas perdidas. ",
          /* @__PURE__ */ jsx("br", {})
        ] }),
        /* @__PURE__ */ jsxs(
          Button$1,
          {
            className: "mt-4 rounded-lg bg-white px-10 py-3 font-semibold text-indigo-600 text-center",
            href: link,
            rel: "noopener noreferrer",
            children: [
              "Reportar como ",
              found
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(Hr, { className: "mx-0 my-10 w-full border border-solid border-gray-200" }),
      /* @__PURE__ */ jsxs(Section, { children: [
        /* @__PURE__ */ jsxs(Row, { className: "mt-8", children: [
          /* @__PURE__ */ jsxs(Text, { className: "m-0 text-xl font-semibold text-gray-900 leading-[24px]", children: [
            petName,
            " ha sido ",
            found,
            " por:"
          ] }),
          /* @__PURE__ */ jsxs(Text, { className: "mt-2 text-[16.5px] text-gray-500", children: [
            finderName,
            " ",
            finderLastName
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Row, { className: "mt-8", children: [
          /* @__PURE__ */ jsx(Text, { className: "m-0 text-xl font-semibold text-gray-900", children: "Número de contacto:" }),
          /* @__PURE__ */ jsx(Text, { className: "mt-2 text-[16.5px] text-gray-500", children: formatContactNumber(contactNumber) })
        ] }),
        /* @__PURE__ */ jsxs(Row, { className: "mt-8", children: [
          /* @__PURE__ */ jsxs(Text, { className: "m-0 text-xl font-semibold text-gray-900", children: [
            "Lugar donde fue ",
            found,
            ":"
          ] }),
          /* @__PURE__ */ jsxs(Text, { className: "mt-2 text-[16.5px] text-gray-500", children: [
            location,
            ", ",
            city,
            " "
          ] }),
          /* @__PURE__ */ jsx(
            Link$1,
            {
              href: `https://www.google.com/maps?q=${encodeURIComponent(
                location
              )},${encodeURIComponent(city)}`,
              rel: "noopener noreferrer",
              className: "text-indigo-600 underline",
              children: "Ver en Google Maps"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Row, { className: "mt-8", children: [
          /* @__PURE__ */ jsx(Text, { className: "m-0 text-xl font-semibold text-gray-900", children: "Notas" }),
          /* @__PURE__ */ jsx(Text, { className: "mt-2 text-[16.5px] text-gray-500", children: notes ?? `${finderName} no añadió notas adicionales` })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Hr, { className: "mx-0 mb-8 w-full border border-solid border-gray-200" }),
      /* @__PURE__ */ jsx(Section, { className: "pb-10", children: /* @__PURE__ */ jsxs(Row, { children: [
        /* @__PURE__ */ jsxs(Column, { className: "w-[45%]", children: [
          /* @__PURE__ */ jsx(
            Img,
            {
              src: "https://pet-tracker-eosin.vercel.app/PetTrackerLogo.png",
              width: "60",
              height: "60",
              alt: "PetTracker Logo"
            }
          ),
          /* @__PURE__ */ jsx(Text, { className: "my-2 text-[18px] font-semibold text-gray-900", children: "Pet Tracker" }),
          /* @__PURE__ */ jsxs(Text, { className: "mt-1 italic text-[16px] leading-[20px] text-gray-500", children: [
            "Encuentra. Conecta. ",
            /* @__PURE__ */ jsx("br", {}),
            "Protege."
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Column, { align: "left", className: "table-cell align-bottom", children: [
          /* @__PURE__ */ jsxs(Row, { className: "table-cell h-[42px] w-[56px] align-bottom", children: [
            /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
              Img,
              {
                src: `${baseUrl}/facebook-logo.png`,
                className: "-ml-1 mr-1",
                width: "36",
                height: "36"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
              Img,
              {
                src: `${baseUrl}/twitter-logo.png`,
                className: "mx-1",
                width: "36",
                height: "36"
              }
            ) }) }),
            /* @__PURE__ */ jsx(Column, { children: /* @__PURE__ */ jsx(Link$1, { href: "#", children: /* @__PURE__ */ jsx(
              Img,
              {
                src: `${baseUrl}/instagram-logo.png`,
                className: "mx-1",
                width: "36",
                height: "36"
              }
            ) }) })
          ] }),
          /* @__PURE__ */ jsxs(Row, { children: [
            /* @__PURE__ */ jsx(Text, { className: "my-2 text-[16px] text-gray-500", children: "Universidad Galileo" }),
            /* @__PURE__ */ jsx(Text, { className: "mt-1 text-[16px] text-gray-500", children: "Ciudad de Guatemala, Guatemala" })
          ] })
        ] })
      ] }) })
    ] }) }) })
  ] });
};
PetFoundNotification.PreviewProps = {
  petName: "Chocobanano",
  finderName: "Samuel Marroquin",
  city: "Ciudad de Guatemala",
  location: "Calle 1-23, Zona 1",
  contactNumber: "1234-5678",
  ownerName: "Andres Tobar",
  finderImage: "https://static.vecteezy.com/system/resources/previews/003/428/270/non_2x/businessman-explain-pose-character-design-free-vector.jpg",
  petImage: "https://cdn.sanity.io/images/5vm5yn1d/pro/5cb1f9400891d9da5a4926d7814bd1b89127ecba-1300x867.jpg?fm=webp&q=80"
};
const resend = new Resend("re_THFJVak7_Mjmiarjs4BH1i8YvSd5PFpx8");
const SendPetFoundNotification = async ({
  petName,
  petSex,
  finderName,
  finderLastName,
  city,
  location,
  contactNumber,
  notes,
  link,
  ownerEmail
}) => {
  const subject = `¡Tu mascota ${petName} ha sido encontrada!`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ownerEmail,
    subject,
    react: PetFoundNotification({
      petName,
      petSex,
      finderName,
      finderLastName,
      city,
      location,
      contactNumber,
      notes,
      link
    })
  });
  if (error) {
    toast.error("Hubo un error al notificar al dueño. Inténtalo de nuevo.");
    return console.error({ error });
  }
  console.log({ data });
};
const reportFoundPetSchema = z.object({
  city: z.enum(departmentsGuatemala, {
    required_error: "La ciudad es requerida"
  }),
  location: z.string({ required_error: "La ubicación es requerida" }).trim().min(5, "La ubicación debe contener al menos 5 caracteres."),
  contactPhone: z.string({
    required_error: "El teléfono de contacto es requerido",
    invalid_type_error: "Ingresa únicamente números"
  }).regex(/^\d{8}$/, "Ingresa un número de teléfono válido"),
  notes: z.string().optional()
});
function CitiesGuatemalaDropdown({
  departments,
  value,
  onChange
}) {
  var _a;
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": open,
        className: "w-full sm:w-1/2 lg:w-1/5 justify-between",
        children: [
          value ? (_a = departments.find((city) => city.value === value)) == null ? void 0 : _a.label : "Seleccionar...",
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { className: "w-[200px] p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(CommandInput, { placeholder: "Search city...", className: "h-9" }),
      /* @__PURE__ */ jsxs(CommandList, { children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: "Sin resultados." }),
        /* @__PURE__ */ jsx(CommandGroup, { children: departments.map((city) => /* @__PURE__ */ jsxs(
          CommandItem,
          {
            value: city.value,
            onSelect: (currentValue) => {
              onChange(currentValue);
              setOpen(false);
            },
            children: [
              city.label,
              /* @__PURE__ */ jsx(
                Check,
                {
                  className: cn(
                    "ml-auto",
                    value === city.value ? "opacity-100" : "opacity-0"
                  )
                }
              )
            ]
          },
          city.value
        )) })
      ] })
    ] }) })
  ] });
}
const ReportFoundPetForm = ({
  petName,
  submitButtonText = "Reportar",
  onReport,
  isLoading
}) => {
  const form = useForm({
    resolver: zodResolver(reportFoundPetSchema),
    defaultValues: {
      city: void 0,
      location: void 0,
      contactPhone: void 0,
      notes: void 0
    }
  });
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(onReport), className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "city",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Departamento" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            CitiesGuatemalaDropdown,
            {
              departments: departmentsGuatemalaForDropdown,
              value: field.value,
              onChange: field.onChange
            }
          ) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "location",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Ubicación" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsxs(FormDescription, { children: [
            `Indica la dirección donde encontraste a ${petName}.`,
            " Ej: Calle 1-23, Zona 1"
          ] }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "contactPhone",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Teléfono de contacto" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { type: "tel", ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "notes",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Notas adicionales" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(
            "textarea",
            {
              ...field,
              rows: 3,
              className: "w-full rounded-md border border-gray-200 p-2"
            }
          ) }),
          /* @__PURE__ */ jsx(FormDescription, { children: `Si tienes alguna información adicional sobre ${petName}, puedes incluirla aquí.` }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(CircleAlert, {}),
      " ",
      submitButtonText
    ] }) })
  ] }) });
};
const ReportFoundPetView = () => {
  const navigate = useNavigate();
  const { petId } = useParams();
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPet, setIsLoadingPet] = useState(true);
  const [pet2, setPet] = useState(null);
  useEffect(() => {
    const fetchPet = async () => {
      setIsLoadingPet(true);
      const result = await supabase.from("pet").select("*").eq("id", petId);
      setIsLoadingPet(false);
      if (result.error !== null) {
        toast.error("Ocurrió un error. Inténtalo de nuevo.");
        return;
      }
      if (result.data.length === 0) {
        toast.error(
          "La mascota que intentas reportar como encontrada no existe."
        );
        return;
      }
      setPet(result.data.at(0));
    };
    if (petId === null) return;
    fetchPet();
  }, [petId]);
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const { error } = await supabase.from("found_pet_report").insert({
      pet: pet2.id,
      found_by: user.id,
      location: values.location,
      contact_number: values.contactPhone,
      notes: values.notes,
      city: values.city.trim()
    });
    const ownerEmail = await supabase.from("profiles").select("email").eq("id", pet2.owner).single();
    const existingProfile = await supabase.from("profiles").select("first_name, last_name").eq("id", user.id).single();
    if (existingProfile.error) {
      console.error("Error fetching profile:", existingProfile.error.message);
      toast.error(
        "Ocurrió un error al obtener tu información de perfil. Inténtalo de nuevo."
      );
      setIsLoading(false);
      return;
    }
    if (ownerEmail.error) {
      console.error("Error fetching owner email:", ownerEmail.error.message);
      toast.error(
        "Ocurrió un error al obtener la información del propietario de la mascota. Inténtalo de nuevo."
      );
      setIsLoading(false);
      return;
    }
    const ownerEmailAddress = ownerEmail.data.email;
    const first_name = existingProfile.data.first_name;
    const last_name = existingProfile.data.last_name;
    setIsLoading(false);
    if (error) {
      toast.error(
        "Ocurrió un error al reportar tu mascota como perdida. Inténtalo de nuevo."
      );
      console.error(error);
      return;
    }
    await SendPetFoundNotification({
      petName: pet2.name,
      petSex: pet2.sex,
      finderName: first_name,
      finderLastName: last_name ? last_name : " ",
      city: values.city,
      location: values.location,
      contactNumber: values.contactPhone,
      notes: values.notes,
      link: `${appRoutes.petDetails}/${pet2.id}`,
      ownerEmail: ownerEmailAddress
    });
    toast.success(`Gracias por reportar a ${pet2.name} como encontrada.`);
    navigate(`${appRoutes.petDetails}/${pet2.id}`, { replace: true });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    isLoadingPet && /* @__PURE__ */ jsx(Loader$1, { className: "mx-auto mt-5" }),
    !isLoadingPet && !pet2 && /* @__PURE__ */ jsx(EmptyState, { url: appRoutes.landing }),
    !isLoadingPet && pet2 && /* @__PURE__ */ jsxs("div", { className: "p-5 mt-5 w-6/7 sm:w-3/4 md:w-2/3 mx-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-5", children: [
        /* @__PURE__ */ jsx(SearchCheck, { className: "mr-3 h-10 w-10 hidden sm:block" }),
        /* @__PURE__ */ jsxs("h2", { className: "font-bold text-3xl mb-1", children: [
          "Reportar a ",
          pet2.name,
          " como",
          " ",
          pet2.sex === "male" ? "encontrado" : "encontrada"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Separator, { className: "mb-8" }),
      /* @__PURE__ */ jsx(
        ReportFoundPetForm,
        {
          petName: pet2.name,
          onReport: handleSubmit,
          isLoading
        }
      )
    ] })
  ] });
};
const Component$2 = () => /* @__PURE__ */ jsx(ReportFoundPetView, {});
const report_found_pet = withComponentProps(Component$2);
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: report_found_pet
}, Symbol.toStringTag, { value: "Module" }));
const userProfileSchema = z.object({
  first_name: z.string({ required_error: "El nombre es requerido" }).trim().nonempty("El nombre no puede estar vacío"),
  last_name: z.string().trim().optional(),
  image_url: z.instanceof(FileList).optional().refine(
    (files) => {
      var _a;
      return (files == null ? void 0 : files.length) === 0 || ACCEPTED_IMAGE_TYPES.includes(((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.type) ?? "");
    },
    "Solo archivos en formato .jpg, .jpeg, .png y .webp son aceptados."
  ).refine(
    (files) => {
      var _a;
      return (files == null ? void 0 : files.length) === 0 || (((_a = files == null ? void 0 : files.item(0)) == null ? void 0 : _a.size) ?? MAX_FILE_SIZE + 1) <= MAX_FILE_SIZE;
    },
    "El tamaño máximo permitido de la foto es 5MB."
  )
});
const CompleteProfileForm = ({
  userId,
  submitButtonText = "Continuar"
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    void 0
  );
  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: "",
      last_name: ""
    }
  });
  const handleImageChange = (event) => {
    var _a;
    const file = (_a = event.target.files) == null ? void 0 : _a[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const uploadedImagePath = values.image_url ? await uploadPortrait(values.image_url, "profiles-pictures") : null;
    const updateResult = await supabase.from("profiles").update({
      first_name: values.first_name,
      last_name: values.last_name,
      image_url: uploadedImagePath
    }).eq("id", userId);
    setIsLoading(false);
    if (updateResult.error === null) {
      toast.success("Tu perfil ha sido actualizado");
      navigate(`${appRoutes.dashboard}`);
      return;
    }
    toast.error(
      "Ocurrió un error al editar la información de tu perfil. Inténtalo de nuevo."
    );
    console.error(updateResult.error);
  };
  const profilePictureReference = form.register("image_url");
  return /* @__PURE__ */ jsx(Form, { ...form, children: /* @__PURE__ */ jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "first_name",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Nombre" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "last_name",
        render: ({ field }) => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Apellido" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      FormField,
      {
        control: form.control,
        name: "image_url",
        render: () => /* @__PURE__ */ jsxs(FormItem, { children: [
          /* @__PURE__ */ jsx(FormLabel, { children: "Foto" }),
          /* @__PURE__ */ jsx(FormControl, { children: /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center space-y-4", children: [
            imagePreview && /* @__PURE__ */ jsx(
              "img",
              {
                src: imagePreview,
                alt: "Vista previa",
                className: "h-32 w-32 rounded-full object-cover"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "file",
                ...profilePictureReference,
                onChange: (event) => {
                  handleImageChange(event);
                }
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full", children: isLoading ? /* @__PURE__ */ jsx(Loader, {}) : /* @__PURE__ */ jsx(Fragment, { children: submitButtonText }) })
  ] }) });
};
const CompleteProfileCard = ({ className, userId, ...props }) => {
  return /* @__PURE__ */ jsxs(Card, { className: cn("m-5", className), ...props, children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl sm:text-4xl", children: "Completa tu perfil" }),
      /* @__PURE__ */ jsx(CardDescription, { children: "Llena la siguiente información para que podamos brindarte una mejor experiencia." })
    ] }),
    /* @__PURE__ */ jsx(CardContent, { className: "grid gap-4", children: /* @__PURE__ */ jsx(CompleteProfileForm, { userId, submitButtonText: "Listo" }) })
  ] });
};
const CompleteProfileView = () => {
  const user = useUser();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    !loading && /* @__PURE__ */ jsx(CompleteProfileCard, { userId: user.id })
  ] });
};
const Component$1 = () => /* @__PURE__ */ jsx(CompleteProfileView, {});
const edit_user_profile = withComponentProps(Component$1);
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: edit_user_profile
}, Symbol.toStringTag, { value: "Module" }));
const LostPetsList = ({ heading, lostPets }) => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("section", { className: "py-7 sm:py-12", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-row items-center justify-center px-3 sm:px-0 sm:justify-between mb-2 md:mb-4 lg:mb-5", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl mb-5 font-semibold md:text-4xl text-center", children: heading }),
      /* @__PURE__ */ jsx("div", { className: "fixed bottom-7 right-6 sm:static", children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "destructive",
          onClick: () => navigate(appRoutes.reportLostPet),
          className: "bg-red-700 text-white rounded-md p-5 shadow-lg sm:rounded-md sm:p-1",
          children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "h-10 w-10 sm:h-8 sm:w-8" }),
            /* @__PURE__ */ jsx("span", { children: "Reportar mascota perdida" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsx(Separator, {}),
      lostPets.map((lostPet, index2) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-4 px-4 py-5 md:grid-cols-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "order-2 flex items-center gap-2 md:order-none md:col-span-2", children: [
            /* @__PURE__ */ jsx("span", { className: "flex mr-2 h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted", children: lostPet.image ? /* @__PURE__ */ jsx(
              "img",
              {
                src: supabase.storage.from("pets-portraits").getPublicUrl(lostPet.image).data.publicUrl,
                alt: lostPet.name ?? "Mascota perdida",
                loading: "lazy",
                className: "h-full w-full rounded-md object-cover"
              }
            ) : /* @__PURE__ */ jsx(MdPets, { className: "h-9 w-9 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full ", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-[18px] font-semibold", children: lostPet.name }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] text-muted-foreground", children: formatAnimalType(lostPet.species) }),
              /* @__PURE__ */ jsx("span", { className: "text-[15px] font-semibold  text-red-400", children: lostPet.created_at })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-4 md:order-none md:col-span-3", children: [
            /* @__PURE__ */ jsx(MapPinned, {}),
            /* @__PURE__ */ jsx("p", { className: "order-1 text-2xl font-semibold md:order-none md:col-span-2 line-clamp-2", children: lostPet.last_seen_address })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => navigate(`${appRoutes.petDetails}/${lostPet.petId}`),
              className: "order-3 ml-auto w-fit gap-2 md:order-none",
              children: [
                /* @__PURE__ */ jsx("span", { children: "Ver más" }),
                /* @__PURE__ */ jsx(ArrowRight$1, { className: "h-4 w-4" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Separator, {})
      ] }, index2))
    ] })
  ] }) });
};
const NoLostPets = () => {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center h-screen text-center", children: [
    /* @__PURE__ */ jsx(MdPets, { className: "h-16 w-16 mb-4" }),
    /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold ", children: "No hay mascotas perdidas" }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground w-5/6", children: "Parece que no hay reportes de mascotas perdidas en este momento." }),
    /* @__PURE__ */ jsx(
      Button,
      {
        variant: "destructive",
        onClick: () => navigate(appRoutes.reportLostPet),
        className: "mt-6 mb-30 bg-red-700 text-white ",
        children: "Reportar una mascota perdida"
      }
    )
  ] });
};
const SkeletonExploreLostPets = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsx(Separator, {}),
    Array(3).fill(null).map((_, index2) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-4 px-4 py-5 md:grid-cols-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "order-2 flex items-center gap-2 md:order-none md:col-span-2", children: [
          /* @__PURE__ */ jsx("span", { className: "flex mr-2 h-20 w-22 shrink-0 items-center justify-center rounded-md bg-muted", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-full w-full rounded-md" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col w-full", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-3/4 mb-2" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2 mb-1" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-4 md:order-none md:col-span-3", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-5 w-full" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "order-3 ml-auto w-fit gap-2 md:order-none", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-20 rounded-md" }) })
      ] }),
      /* @__PURE__ */ jsx(Separator, {})
    ] }, index2))
  ] });
};
const fetchLostPets = async () => {
  const lostPetsQuery = supabase.from("lost_pet_report").select(
    `
        id,
        created_at,
        last_seen_date,
        found_date,
        last_seen_address,
        contact_number,
        pet (
          id,
          name,
          image,
          owner,
          sex,
          animal_type,
          breed,
          spayed_or_neutered,
          notes,
          birth_date
        )
      `
  ).is("found_date", null).order("created_at", { ascending: false });
  const { data, error } = await lostPetsQuery;
  console.log("Lost pets data:", data);
  if (error) {
    console.error("Error fetching lost pets:", error.message);
    return [];
  }
  if (!data) {
    return [];
  }
  const lostPets = data;
  return lostPets.map((lostPet) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    return {
      id: lostPet.id,
      created_at: format$1(new Date(lostPet.created_at), "long", "es"),
      last_seen_date: lostPet.last_seen_date,
      found_date: lostPet.found_date ? format$1(new Date(lostPet.found_date), "long", "es") : null,
      last_seen_address: lostPet.last_seen_address,
      contact_number: lostPet.contact_number,
      petId: (_a = lostPet.pet) == null ? void 0 : _a.id,
      name: ((_b = lostPet.pet) == null ? void 0 : _b.name) ?? "",
      image: ((_c = lostPet.pet) == null ? void 0 : _c.image) ?? "",
      owner: ((_d = lostPet.pet) == null ? void 0 : _d.owner) ?? "",
      sex: ((_e = lostPet.pet) == null ? void 0 : _e.sex) ?? "",
      species: ((_f = lostPet.pet) == null ? void 0 : _f.animal_type) ?? "",
      breed: ((_g = lostPet.pet) == null ? void 0 : _g.breed) ?? "",
      spayed_or_neutered: ((_h = lostPet.pet) == null ? void 0 : _h.spayed_or_neutered) ?? false,
      notes: lostPet.pet.notes,
      age: ((_i = lostPet.pet) == null ? void 0 : _i.birth_date) ? calculateAge(lostPet.pet.birth_date) : null
    };
  });
};
const calculateAge = (birthDate) => {
  const today = /* @__PURE__ */ new Date();
  const birth = new Date(birthDate);
  const ageInMilliseconds = today.getTime() - birth.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1e3 * 60 * 60 * 24));
  if (ageInDays < 30) {
    return `${ageInDays} dias`;
  } else if (ageInDays < 365) {
    return Math.floor(ageInDays / 30) === 1 ? `${Math.floor(ageInDays / 30)} mes` : `${Math.floor(ageInDays / 30)} meses`;
  } else {
    return `${Math.floor(ageInDays / 365)} años`;
  }
};
const ExploreLostPets = ({ heading = "Mascotas Perdidas" }) => {
  const [lostPets, setLostPets] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLostPets();
        setLostPets(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching lost pets:", error);
      }
    };
    fetchData();
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    loading && /* @__PURE__ */ jsx("section", { className: "py-8", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-center md:text-start mb-8 px-4 text-3xl font-semibold md:text-4xl", children: heading }),
      /* @__PURE__ */ jsx(SkeletonExploreLostPets, {})
    ] }) }),
    !loading && lostPets.length === 0 && /* @__PURE__ */ jsx(NoLostPets, {}),
    !loading && lostPets.length > 0 && /* @__PURE__ */ jsx(LostPetsList, { heading, lostPets })
  ] });
};
const meta = () => [{
  title: "Mascotas perdidas"
}];
const LostPetsRoute = () => /* @__PURE__ */ jsx(ExploreLostPets, {});
const lost_pets = withComponentProps(LostPetsRoute);
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lost_pets,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const ResetPassword = ({
  heading = "Restablecer contraseña",
  subheading = "Ingresa tu correo electrónico para restablecer tu contraseña",
  resetText = "Enviar correo de restablecimiento",
  loginText = "¿Recuerdas tu contraseña?",
  loginUrl = appRoutes.login,
  logoUrl = appRoutes.landing
}) => {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    if (!emailRegex.test(email)) {
      toast.error("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://pet-tracker-eosin.vercel.app/update-password"
    });
    if (error) {
      toast.error("Error al enviar el correo de restablecimiento.");
    } else {
      toast.success("Correo de restablecimiento enviado.");
    }
  };
  return /* @__PURE__ */ jsx("section", { className: "h-screen flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 mx-5", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-sm rounded-md p-6 shadow bg-white", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx(Link, { to: logoUrl, children: /* @__PURE__ */ jsx(TbPasswordUser, { className: "size-10" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mb-5 mt-3 text-4xl font-bold text-center leading-9", children: heading }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground text-center", children: subheading })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          name: "email",
          type: "email",
          value: email,
          onChange: (event) => setEmail(event.target.value),
          placeholder: "Ingresa tu correo electrónico",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          className: "mt-2 w-full",
          onClick: handleResetPassword,
          children: resetText
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-6 mb-2 flex justify-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("p", { children: loginText }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: loginUrl,
          className: "font-medium text-primary hover:underline",
          children: "Iniciar Sesión"
        }
      )
    ] })
  ] }) }) }) });
};
const Component = () => /* @__PURE__ */ jsx(ResetPassword, {});
const reset_password = withComponentProps(Component);
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: reset_password
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-BHNHhhw4.js", "imports": ["/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/index-BPjMvHEu.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-BP7SQNJh.js", "imports": ["/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/index-BPjMvHEu.js", "/assets/with-props-C_P4RWeF.js", "/assets/index-DlVqQRiW.js"], "css": ["/assets/root-B12xiaMz.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/landing": { "id": "routes/landing", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/landing-CjkBzrwJ.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/index-CGXivZb0.js", "/assets/routes-CTRM3soR.js", "/assets/button-BwhTU3xm.js", "/assets/navbar-mFlRC7PZ.js", "/assets/index-BPjMvHEu.js", "/assets/createLucideIcon-BXJY-pLu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/auth_layout": { "id": "routes/auth_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/auth_layout-CSMW1ok1.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/routes-CTRM3soR.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "routes/auth_layout", "path": "/login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-tDm7B8gD.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/button-BwhTU3xm.js", "/assets/checkbox-WSwXXcMV.js", "/assets/input-Cc9Stvst.js", "/assets/routes-CTRM3soR.js", "/assets/index-DYjHuzbX.js", "/assets/index-DlVqQRiW.js", "/assets/loader-circle-4zLNCx83.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/index-DA7cR2i0.js", "/assets/check-CcO5qCS6.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/iconBase-DWGiJmbw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "routes/auth_layout", "path": "/sign-up", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-DVbbs47l.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/index-DYjHuzbX.js", "/assets/button-BwhTU3xm.js", "/assets/input-Cc9Stvst.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/iconBase-DWGiJmbw.js", "/assets/index-BPjMvHEu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/protected_layout": { "id": "routes/protected_layout", "parentId": "root", "path": void 0, "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/protected_layout-BOkZN9hO.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/routes-CTRM3soR.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/dashboard": { "id": "routes/dashboard", "parentId": "routes/protected_layout", "path": "/dashboard", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/dashboard-3pwtPx6Y.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/navbar-mFlRC7PZ.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/button-BwhTU3xm.js", "/assets/routes-CTRM3soR.js", "/assets/createLucideIcon-BXJY-pLu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/my_pets": { "id": "routes/my_pets", "parentId": "routes/protected_layout", "path": "/my-pets", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/my_pets-Dt0L_4as.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/navbar-mFlRC7PZ.js", "/assets/button-BwhTU3xm.js", "/assets/separator-BHgjR1J0.js", "/assets/EmptyState-CNQYyuMY.js", "/assets/animalTypes-zlv_8E1P.js", "/assets/routes-CTRM3soR.js", "/assets/IconBase-2_1jK8r0.js", "/assets/index-DlVqQRiW.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/index-2UufBPTQ.js", "/assets/iconBase-DWGiJmbw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/pet": { "id": "routes/pet", "parentId": "routes/protected_layout", "path": "/pet/:petId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/pet-DoV-i6CQ.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/navbar-mFlRC7PZ.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/button-BwhTU3xm.js", "/assets/circle-alert-CwKWgOV7.js", "/assets/index-CGXivZb0.js", "/assets/index-BAY9dnVF.js", "/assets/index-CpYXc7B6.js", "/assets/RegisterPetForm-MvXL-jgZ.js", "/assets/popover-BE-t_-9Y.js", "/assets/separator-BHgjR1J0.js", "/assets/ReportLostPetAlertDialog-BC7E2wsx.js", "/assets/animalTypes-zlv_8E1P.js", "/assets/IconBase-2_1jK8r0.js", "/assets/card-Cx2DBwdG.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/index-BPjMvHEu.js", "/assets/textarea-C0jHllX4.js", "/assets/checkbox-WSwXXcMV.js", "/assets/index-DA7cR2i0.js", "/assets/check-CcO5qCS6.js", "/assets/command-BV_hcrUj.js", "/assets/index-CMz1EfI-.js", "/assets/input-Cc9Stvst.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/edit_pet": { "id": "routes/edit_pet", "parentId": "routes/protected_layout", "path": "/edit-pet/:petId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/edit_pet-z0t0faCK.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/navbar-mFlRC7PZ.js", "/assets/card-Cx2DBwdG.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/RegisterPetForm-MvXL-jgZ.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/button-BwhTU3xm.js", "/assets/textarea-C0jHllX4.js", "/assets/checkbox-WSwXXcMV.js", "/assets/index-DA7cR2i0.js", "/assets/check-CcO5qCS6.js", "/assets/command-BV_hcrUj.js", "/assets/index-CpYXc7B6.js", "/assets/index-CMz1EfI-.js", "/assets/input-Cc9Stvst.js", "/assets/popover-BE-t_-9Y.js", "/assets/index-BAY9dnVF.js", "/assets/animalTypes-zlv_8E1P.js", "/assets/IconBase-2_1jK8r0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/report_lost_pet": { "id": "routes/report_lost_pet", "parentId": "routes/protected_layout", "path": "/report-lost-pet", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/report_lost_pet-D_8X7E4p.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/navbar-mFlRC7PZ.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/animalTypes-zlv_8E1P.js", "/assets/index-2UufBPTQ.js", "/assets/ReportLostPetAlertDialog-BC7E2wsx.js", "/assets/skeleton-CpORVbC8.js", "/assets/button-BwhTU3xm.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/EmptyState-CNQYyuMY.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/iconBase-DWGiJmbw.js", "/assets/index-BAY9dnVF.js", "/assets/index-CpYXc7B6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/report_lost_pet_form": { "id": "routes/report_lost_pet_form", "parentId": "routes/protected_layout", "path": "/report-lost-pet/:petId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/report_lost_pet_form-CZ_s8x3Z.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/Loader-CXAdXc2l.js", "/assets/navbar-mFlRC7PZ.js", "/assets/button-BwhTU3xm.js", "/assets/textarea-C0jHllX4.js", "/assets/index-CMz1EfI-.js", "/assets/input-Cc9Stvst.js", "/assets/popover-BE-t_-9Y.js", "/assets/routes-CTRM3soR.js", "/assets/IconBase-2_1jK8r0.js", "/assets/index-DlVqQRiW.js", "/assets/EmptyState-CNQYyuMY.js", "/assets/loader-circle-4zLNCx83.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/index-CpYXc7B6.js", "/assets/index-BAY9dnVF.js", "/assets/index-DA7cR2i0.js", "/assets/index-2UufBPTQ.js", "/assets/iconBase-DWGiJmbw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/report_found_pet": { "id": "routes/report_found_pet", "parentId": "routes/protected_layout", "path": "/report-found-pet/:petId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/report_found_pet-CWF6esaS.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/navbar-mFlRC7PZ.js", "/assets/separator-BHgjR1J0.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/EmptyState-CNQYyuMY.js", "/assets/index-CMz1EfI-.js", "/assets/Loader-CXAdXc2l.js", "/assets/button-BwhTU3xm.js", "/assets/input-Cc9Stvst.js", "/assets/command-BV_hcrUj.js", "/assets/popover-BE-t_-9Y.js", "/assets/check-CcO5qCS6.js", "/assets/circle-alert-CwKWgOV7.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/index-2UufBPTQ.js", "/assets/iconBase-DWGiJmbw.js", "/assets/index-CpYXc7B6.js", "/assets/loader-circle-4zLNCx83.js", "/assets/index-BAY9dnVF.js", "/assets/index-DA7cR2i0.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/edit_user_profile": { "id": "routes/edit_user_profile", "parentId": "routes/protected_layout", "path": "/edit-user", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/edit_user_profile-B23egpsG.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/navbar-mFlRC7PZ.js", "/assets/card-Cx2DBwdG.js", "/assets/routes-CTRM3soR.js", "/assets/Loader-CXAdXc2l.js", "/assets/button-BwhTU3xm.js", "/assets/index-CMz1EfI-.js", "/assets/input-Cc9Stvst.js", "/assets/index-DlVqQRiW.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/loader-circle-4zLNCx83.js", "/assets/index-CpYXc7B6.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/lost_pets": { "id": "routes/lost_pets", "parentId": "root", "path": "/lost-pets", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/lost_pets-DX1fsDv0.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/navbar-mFlRC7PZ.js", "/assets/button-BwhTU3xm.js", "/assets/separator-BHgjR1J0.js", "/assets/animalTypes-zlv_8E1P.js", "/assets/routes-CTRM3soR.js", "/assets/index-2UufBPTQ.js", "/assets/circle-alert-CwKWgOV7.js", "/assets/createLucideIcon-BXJY-pLu.js", "/assets/skeleton-CpORVbC8.js", "/assets/index-CGXivZb0.js", "/assets/index-BPjMvHEu.js", "/assets/iconBase-DWGiJmbw.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/reset_password": { "id": "routes/reset_password", "parentId": "root", "path": "/reset-password", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/reset_password-kgB6vCe6.js", "imports": ["/assets/with-props-C_P4RWeF.js", "/assets/chunk-LSOULM7L-DOIZURii.js", "/assets/iconBase-DWGiJmbw.js", "/assets/button-BwhTU3xm.js", "/assets/input-Cc9Stvst.js", "/assets/routes-CTRM3soR.js", "/assets/index-DlVqQRiW.js", "/assets/index-BPjMvHEu.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-eeada563.js", "version": "eeada563", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/landing": {
    id: "routes/landing",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/auth_layout": {
    id: "routes/auth_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/login": {
    id: "routes/login",
    parentId: "routes/auth_layout",
    path: "/login",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "routes/auth_layout",
    path: "/sign-up",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/protected_layout": {
    id: "routes/protected_layout",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/dashboard": {
    id: "routes/dashboard",
    parentId: "routes/protected_layout",
    path: "/dashboard",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/my_pets": {
    id: "routes/my_pets",
    parentId: "routes/protected_layout",
    path: "/my-pets",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/pet": {
    id: "routes/pet",
    parentId: "routes/protected_layout",
    path: "/pet/:petId",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/edit_pet": {
    id: "routes/edit_pet",
    parentId: "routes/protected_layout",
    path: "/edit-pet/:petId",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/report_lost_pet": {
    id: "routes/report_lost_pet",
    parentId: "routes/protected_layout",
    path: "/report-lost-pet",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/report_lost_pet_form": {
    id: "routes/report_lost_pet_form",
    parentId: "routes/protected_layout",
    path: "/report-lost-pet/:petId",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/report_found_pet": {
    id: "routes/report_found_pet",
    parentId: "routes/protected_layout",
    path: "/report-found-pet/:petId",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/edit_user_profile": {
    id: "routes/edit_user_profile",
    parentId: "routes/protected_layout",
    path: "/edit-user",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/lost_pets": {
    id: "routes/lost_pets",
    parentId: "root",
    path: "/lost-pets",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/reset_password": {
    id: "routes/reset_password",
    parentId: "root",
    path: "/reset-password",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
