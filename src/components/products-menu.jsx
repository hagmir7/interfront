"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import CLink from "./CLink"

const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function ProductsMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-[#f2f2f2] hover:bg-[#f2f2f2]">
        <NavigationMenuItem className="bg-[#f2f2f2] hover:bg-[#f2f2f2]">
          <NavigationMenuTrigger className="bg-[#f2f2f2] hover:bg-[#f2f2f2]">
            <p className="inline-flex cursor-pointer py-2 gap-2 items-center text-[17px] bg-[#f2f2f2] hover:bg-[#f2f2f2]">Produits</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <CLink href='/groups/meuble-de-cuisine'
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <Image width={100} height={100} src="https://cdn-icons-png.flaticon.com/512/7860/7860152.png" alt="Produits" className="w-full" />
                    <div className="mt-4 text-lg font-semibold leading-none">
                      Meuble Cuisine
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Armoires de cuisine, façades, accessoires et plans de travail
                    </p>
                  </CLink>
                </NavigationMenuLink>
              </li>
              <ListItem href="/groups/revetement-et-sole" title="Revêtement et Sole">
                Parquet, Plinthe et Accessoires
              </ListItem>
              <ListItem href="/placards" title="Placards et Dressings">
                Placards et Dressing sur mesure
              </ListItem>
              <ListItem href="" title="Salles de bain">
                Meubles et Accessoires de Salle de bain
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef(function ListItem({ className, title, children, ...props }, ref) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-lg font-bold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
