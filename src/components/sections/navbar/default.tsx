import { Menu } from "lucide-react";
import LaunchUI from "../../logos/launch-ui";
import { ReactNode } from "react";

interface NavbarLink {
  text: string;
  href: string;
}

interface NavbarActionProps {
  text: string;
  href: string;
  variant?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  isButton?: boolean;
}

interface NavbarProps {
  logo?: ReactNode;
  name?: string;
  homeUrl?: string;
  mobileLinks?: NavbarLink[];
  actions?: NavbarActionProps[];
  showNavigation?: boolean;
  customNavigation?: ReactNode;
  className?: string;
}

export default function Navbar({
  logo = <LaunchUI />,
  name = "Launch UI",
  homeUrl = "https://www.launchuicomponents.com/",
  mobileLinks = [
    { text: "Getting Started", href: "https://www.launchuicomponents.com/" },
    { text: "Components", href: "https://www.launchuicomponents.com/" },
    { text: "Documentation", href: "https://www.launchuicomponents.com/" },
  ],
  actions = [
    { text: "Sign in", href: "https://www.launchuicomponents.com/", isButton: false },
    {
      text: "Get Started",
      href: "https://www.launchuicomponents.com/",
      isButton: true,
      variant: "default",
    },
  ],
  showNavigation = true,
  customNavigation,
  className,
}: NavbarProps) {
  return (
    <header className={`sticky top-0 z-50 -mb-4 px-4 pb-4 ${className || ""}`}>
      <div className="fade-bottom bg-background/15 absolute left-0 h-24 w-full backdrop-blur-lg"></div>
      <div className="max-w-container relative mx-auto">
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center justify-start gap-4">
            <a
              href={homeUrl}
              className="flex items-center gap-2 text-xl font-bold"
            >
              {logo}
              {name}
            </a>
            {showNavigation && customNavigation}
          </div>
          <div className="flex items-center justify-end gap-4">
            {actions.map((action, index) =>
              action.isButton ? (
                <a
                  key={index}
                  href={action.href}
                  className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${action.variant === 'destructive' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-primary text-primary-foreground hover:bg-primary/90'} h-10 px-4 py-2`}
                >
                  {action.icon}
                  {action.text}
                  {action.iconRight}
                </a>
              ) : (
                <a
                  key={index}
                  href={action.href}
                  className="hidden text-sm md:block"
                >
                  {action.text}
                </a>
              ),
            )}
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 shrink-0 md:hidden"
              onClick={() => {
                // This would need proper functionality if implementing a mobile drawer
                console.log("Mobile menu clicked");
              }}
            >
              <Menu className="size-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </button>
            {/* Mobile menu would need to be implemented with useState */}
            <div className="hidden">
              <nav className="grid gap-6 text-lg font-medium">
                  <a
                    href={homeUrl}
                    className="flex items-center gap-2 text-xl font-bold"
                  >
                    <span>{name}</span>
                  </a>
                  {mobileLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
