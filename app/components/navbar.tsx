'use client'

import supabase from '@/lib/supabase'
import { appRoutes } from '@/routes'
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarUI,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from 'components/ui/resizable-navbar'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Button } from './ui/button'
import useUser from '@/hooks/useUser'

export function Navbar({ hideMenu = false }: { hideMenu?: boolean }) {
  const navItems = [
    {
      name: 'Dashboard',
      link: appRoutes.dashboard,
    },
    {
      name: 'Explorar Mascotas Pérdidas',
      link: appRoutes.exploreLostPets,
    },
    {
      name: 'Mis Mascotas',
      link: appRoutes.myPets,
    },
  ]

  const auth = {
    login: { title: 'Login', url: appRoutes.login },
    signup: { title: 'Sign up', url: appRoutes.signUp },
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const user = useUser()
  const navigate = useNavigate()

  return (
    <div className="relative w-full pt-3">
      <NavbarUI>
        <NavBody>
          <NavbarLogo />
          {!hideMenu && <NavItems items={navItems} />}
          <div className="flex items-center gap-4">
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
              <>
                <NavbarButton
                  onClick={() => {
                    navigate(appRoutes.editUserProfile)
                  }}
                  variant="secondary"
                >
                  Editar Perfil
                </NavbarButton>
                <NavbarButton
                  onClick={async () => {
                    await supabase.auth.signOut()
                    navigate(appRoutes.landing)
                  }}
                  variant="primary"
                >
                  Cerrar Sesión
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          {!hideMenu && (
            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
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
                  <>
                    <NavbarButton
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        navigate(appRoutes.editUserProfile)
                      }}
                      variant="primary"
                      className="w-full"
                    >
                      Editar Perfil
                    </NavbarButton>
                    <NavbarButton
                      onClick={async () => {
                        setIsMobileMenuOpen(false)
                        await supabase.auth.signOut()
                        navigate(appRoutes.landing)
                      }}
                      variant="primary"
                      className="w-full"
                    >
                      Cerrar Sesión
                    </NavbarButton>
                  </>
                )}
              </div>
            </MobileNavMenu>
          )}
        </MobileNav>
      </NavbarUI>
      {/* Navbar */}
    </div>
  )
}

export default Navbar
