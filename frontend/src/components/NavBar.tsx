"use client";

import * as React from "react";
import { Menu, Sun, Moon } from "lucide-react"; // Import Sun and Moon icons

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  id: string;
  subItems?: { title: string; id: string }[];
}

const navItems: NavItem[] = [
  {
    title: "About",
    id: "section-about",
  },
  {
    title: "Projects",
    id: "section-projects",
  },
  {
    title: "Fun Things",
    id: "section-fun",
  },
  {
    title: "Contact",
    id: "section-contact",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [showBorders, setShowBorders] = React.useState(false);

  React.useEffect(() => {
    if (showBorders) {
      document.documentElement.classList.add("show-borders");
    } else {
      document.documentElement.classList.remove("show-borders");
    }
  }, [showBorders]);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 500 + window.innerHeight / 2 - element.clientHeight / 2;
      window.scrollTo({
        top: element.offsetTop - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-20 items-center justify-between w-full px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <a
            href="#section-intro"
            className="mr-6 flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("section-intro");
            }}
          >
            <span className="hidden font-bold sm:inline-block">Adam</span>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) =>
                item.subItems ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.title} className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                href={`#${subItem.id}`}
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                onClick={() => handleScroll(subItem.id)}
                              >
                                {subItem.title}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      onClick={() => handleScroll(item.id)}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0"
            onClick={() => setShowBorders(!showBorders)}
          >
            Toggle Borders
          </Button>
          <Button
            variant="ghost"
            className="p-2 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Button
            variant="ghost"
            className="p-2 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Dark Mode</span>
          </Button>
          <Button
            variant="ghost"
            className="px-0 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0"
            onClick={() => window.open("/resume.pdf", "_blank")}
          >
            Resume
          </Button>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus:outline-none focus:ring-0 focus:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="#section-intro"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <span className="font-bold">Adam</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) =>
                  item.subItems ? (
                    <div key={item.title}>
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="mt-2 flex flex-col space-y-2">
                        {item.subItems.map((subItem) => (
                          <MobileLink
                            key={subItem.title}
                            href={`#${subItem.id}`}
                            onOpenChange={setIsOpen}
                          >
                            {subItem.title}
                          </MobileLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <MobileLink
                      key={item.title}
                      href={`#${item.id}`}
                      onOpenChange={setIsOpen}
                    >
                      {item.title}
                    </MobileLink>
                  )
                )}
                <MobileLink
                  href="#"
                  onClick={() => setShowBorders(!showBorders)}
                  className="mt-4"
                >
                  Toggle Borders
                </MobileLink>
                <MobileLink
                  href="#"
                  onClick={() => setDarkMode(!darkMode)}
                  className="mt-4"
                >
                  Toggle Dark Mode
                </MobileLink>
                <MobileLink href="/resume.pdf" target="_blank" className="mt-4">
                  Resume
                </MobileLink>
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
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  target?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <a
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
