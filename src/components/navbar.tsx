import { routes } from '@/routes'
import { Link, useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import useUser from '@/hooks/useUser'
import supabase from '@/lib/supabase'

interface MenuItem {
  title: string
  url: string
  description?: string
  icon?: React.ReactNode
  items?: MenuItem[]
}

interface NavbarProps {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  menu?: MenuItem[]
  auth?: {
    login: {
      title: string
      url: string
    }
    signup: {
      title: string
      url: string
    }
  }
  hideMenu?: boolean
}

const Navbar = ({
  logo = {
    url: routes.dashboard,
    src: './src/assets/PetTrackerLogo.png',
    alt: 'logo',
    title: 'Pet Tracker',
  },
  menu = [
    {
      title: 'Explorar Mascotas Pérdidas',
      url: routes.exploreLostPets,
    },
    {
      title: 'Mis Mascotas',
      url: routes.myPets,
    },
  ],
  auth = {
    login: { title: 'Login', url: routes.logIn },
    signup: { title: 'Sign up', url: routes.signUp },
  },
  hideMenu = false,
}: NavbarProps) => {
  const user = useUser()
  const navigate = useNavigate()

  return (
    <section className="py-4 bg-white shadow-sm">
      <div className="container mx-auto">
        {/* Menu Escritorio */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-9" alt={logo.alt} />
              <span className="text-2xl font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            {!hideMenu && (
              <div className="flex items-center">
                <NavigationMenu>
                  <NavigationMenuList>
                    {menu.map((item) => renderMenuItem(item))}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            {!user ? (
              <>
                <Button asChild variant="outline" size="default">
                  <Link to={auth.login.url}>{auth.login.title}</Link>
                </Button>
                <Button asChild size="default">
                  <Link to={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="default"
                onClick={async () => {
                  await supabase.auth.signOut()
                  navigate(routes.home)
                }}
              >
                Cerrar sesión
              </Button>
            )}
          </div>
        </nav>

        {/* Menu Para Telefonos */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between px-6">
            <Link to={logo.url} className="flex items-center gap-2 ">
              <img src={logo.src} className="max-h-9" alt={logo.alt} />
              <span className="text-2xl font-semibold tracking-tighter">
                {logo.title}
              </span>
            </Link>
            {!hideMenu && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to={logo.url} className="flex items-center gap-2">
                        <img
                          src={logo.src}
                          className="max-h-8"
                          alt={logo.alt}
                        />
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 p-4">
                    <Accordion
                      type="single"
                      collapsible
                      className="flex w-full flex-col gap-4"
                    >
                      {menu.map((item) => renderMobileMenuItem(item))}
                    </Accordion>

                    <div className="flex flex-col gap-3">
                      {!user ? (
                        <>
                          <Button asChild variant="outline">
                            <Link to={auth.login.url}>{auth.login.title}</Link>
                          </Button>
                          <Button asChild>
                            <Link to={auth.signup.url}>
                              {auth.signup.title}
                            </Link>
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={async () => {
                            await supabase.auth.signOut()
                            navigate(routes.home)
                          }}
                        >
                          Cerrar sesión
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-popover text-popover-foreground">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    )
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    )
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold">
      {item.title}
    </a>
  )
}

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground lg:w-50"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </a>
  )
}

export default Navbar
