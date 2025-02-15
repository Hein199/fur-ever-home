'use client'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navData = [
  { title: "Home", href: "/" },
  { title: "Pets", href: "/app/pets" },
  { title: "Shelters", href: "/app/shelters" },
];

export default function SiteNav() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navData.map((item) => {
          const isActive = pathname === item.href ? "text-primary font-bold" : "";
          return (
            <NavigationMenuItem key={item.title}>
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} ${isActive}`}
                >
                  {item.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}