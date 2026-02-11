"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import CLink from "./CLink"

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
              <ListItem href="/groups/revetement-et-sol" title="Revêtement et Sole">
                Parquet, Plinthe et Accessoires
              </ListItem>
              <ListItem href="/placards" title="Placards et Dressings">
                Placards et Dressing sur mesure
              </ListItem>
              <ListItem href="/salles-de-bain" title="Salles de bain">
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
        <CLink
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
        </CLink>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
