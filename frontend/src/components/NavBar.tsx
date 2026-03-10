'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LightDarkToggle from '@/components/theme/LightDarkToggle';
import { usePathname } from 'next/navigation';
import { analyticsAttributes } from '@/lib/analytics';

interface NavItem {
  title: string;
  redirect: string;
}

const leftNavItems: NavItem[] = [
  { title: 'About', redirect: '/page/about/' },
  { title: 'Projects', redirect: '/page/projects/' },
  { title: 'Pictures', redirect: '/page/pictures/' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='bg-white/95 dark:bg-neutral-950/95 sticky top-0 z-50 w-full border-b p-4 backdrop-blur sm:p-8'>
      <div className='flex h-8 w-full items-center justify-between px-4 md:px-8'>
        <div className='mr-4 hidden md:flex'>
          <a
            className='hover:bg-gray-100 dark:hover:bg-gray-800 m-2 mr-6 flex items-center space-x-2 rounded-md px-4 py-2'
            href='/'
            {...analyticsAttributes('nav_link_clicked', {
              label: 'home',
              section: 'desktop',
            })}
          >
            <span className='hidden text-left font-sans text-xl font-extrabold sm:inline-block'>
              Adam
              <br />
              Sulemanji
            </span>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              {leftNavItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink
                    className={`bg-transparent hover:bg-gray-100 supports-[backdrop-filter]:bg-transparent dark:hover:bg-gray-800 m-2 rounded-md px-4 py-2 text-base backdrop-blur ${
                      pathname === item.redirect
                        ? 'font-extrabold underline underline-offset-2'
                        : ''
                    }`}
                    href={'redirect' in item ? item.redirect : '#'}
                    {...analyticsAttributes('nav_link_clicked', {
                      label: item.title,
                      section: 'desktop',
                    })}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className='hidden items-center space-x-4 md:flex md:space-x-6'>
          <LightDarkToggle />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant='ghost'
              className='hover:bg-transparent mr-2 px-0 text-base focus:outline-none focus:ring-0 focus:ring-offset-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='bg-white text-black dark:bg-neutral-950 dark:text-white w-[85vw] border-r p-0 sm:max-w-sm'
          >
            <SheetTitle className='sr-only'>Mobile navigation</SheetTitle>
            <SheetDescription className='sr-only'>
              Navigate between pages or return to the homepage.
            </SheetDescription>
            <div className='bg-white dark:bg-neutral-950 flex h-full flex-col px-6 pb-8 pt-12'>
              <a
                className='mb-8 block text-left font-sans text-2xl font-extrabold'
                href='/'
                onClick={() => setIsOpen(false)}
                {...analyticsAttributes('nav_link_clicked', {
                  label: 'home',
                  section: 'mobile',
                })}
              >
                Adam
                <br />
                Sulemanji
              </a>
              <div className='flex flex-col space-y-2'>
                <MobileLink
                  href='/'
                  onClick={() => setIsOpen(false)}
                  active={pathname === '/'}
                >
                  Home
                </MobileLink>
                {leftNavItems.map((item) => (
                  <MobileLink
                    key={item.title}
                    href={item.redirect}
                    onClick={() => setIsOpen(false)}
                    active={pathname === item.redirect}
                  >
                    {item.title}
                  </MobileLink>
                ))}
              </div>
              <div className='mt-auto border-t px-1 pt-4'>
                <p className='mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground'>
                  Theme
                </p>
                <LightDarkToggle mobile />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

interface MobileLinkProps {
  href: string;
  onClick?: () => void;
  children: React.ReactNode;
  active?: boolean;
}

function MobileLink({ href, onClick, children, active }: MobileLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`block rounded-md px-3 py-3 text-lg font-medium ${
        active
          ? 'bg-black/5 dark:bg-white/10 font-bold'
          : 'hover:bg-black/5 dark:hover:bg-white/10'
      }`}
      {...analyticsAttributes('nav_link_clicked', {
        label: typeof children === 'string' ? children : 'mobile-link',
        section: 'mobile',
      })}
    >
      {children}
    </a>
  );
}
