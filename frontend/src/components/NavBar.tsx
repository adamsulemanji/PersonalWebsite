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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LightDarkToggle from '@/components/theme/LightDarkToggle';

interface NavItem {
  title: string;
  redirect: string;
}

const leftNavItems: NavItem[] = [
  { title: 'About', redirect: '/page/about' },
  { title: 'Projects', redirect: '/page/projects' },
  { title: 'Pictures', redirect: '/page/pictures' },
];

const rightNavItems = [{ title: 'Dark Mode', action: 'toggleDarkMode' }];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 p-8 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='flex h-24 w-full items-center justify-between px-4 md:px-8'>
        <div className='mr-4 hidden md:flex'>
          <a
            className='m-2 mr-6 flex items-center space-x-2 rounded-md px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'
            href='/'
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
                    className='m-2 rounded-md bg-transparent px-4 py-2 text-base backdrop-blur hover:bg-gray-100 supports-[backdrop-filter]:bg-transparent dark:hover:bg-gray-800'
                    href={'redirect' in item ? item.redirect : '#'}
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
              className='mr-2 px-0 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 md:hidden'
            >
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='pr-0'>
            <div className='my-4 h-[calc(100vh-8rem)] pb-10 pl-6'>
              <div className='flex flex-col space-y-3'>
                {[...leftNavItems, ...rightNavItems].map((item, index) => (
                  <MobileLink
                    key={index}
                    href={'redirect' in item ? item.redirect : '#'}
                  >
                    {item.title}
                  </MobileLink>
                ))}
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
}

function MobileLink({ href, onClick, children }: MobileLinkProps) {
  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
      }}
      className='block py-2 text-lg font-medium'
    >
      {children}
    </a>
  );
}
