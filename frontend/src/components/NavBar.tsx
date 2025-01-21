"use client";

import * as React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavItem {
  title: string;
  id: string;
  subItems?: { title: string; id: string }[];
}

const leftNavItems: NavItem[] = [
  { title: "About", id: "section-about" },
  { title: "Projects", id: "section-projects" },
  { title: "Pictures", id: "section-fun" },
  { title: "Contact", id: "section-contact" },
];

const rightNavItems = [{ title: "Dark Mode", action: "toggleDarkMode" }];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

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
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAction = (action: string) => {
    if (action === "toggleDarkMode") setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pt-24">
      <div className="flex h-24 items-center justify-between w-full px-4 md:px-8">
        <div className="mr-4 hidden md:flex">
          <a
            className="mr-6 flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              handleScroll("section-intro");
            }}
          >
            <span className="hidden sm:inline-block font-extrabold font-sans text-left text-xl">
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
                    className="px-4 py-2 m-2 rounded-md text-base bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => handleScroll(item.id)}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4 md:space-x-6">
          <Button
            key={darkMode ? "dark" : "light"}
            variant="ghost"
            className="text-base bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent px-4 py-2 m-2"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun /> : <Moon />}
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
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {[...leftNavItems, ...rightNavItems].map((item, index) => (
                  <MobileLink
                    key={index}
                    href={
                      item.hasOwnProperty("id")
                        ? `#${(item as NavItem).id}`
                        : "#"
                    }
                    onClick={() =>
                      item.hasOwnProperty("id")
                        ? handleScroll((item as NavItem).id)
                        : "action" in item
                        ? handleAction(item.action)
                        : null
                    }
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
      className="block py-2 text-lg font-medium"
    >
      {children}
    </a>
  );
}
