"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { BookText, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PAPER_LINK, SITE_CONFIG } from "@/data/site";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-6 inset-x-0 container mx-auto">
      <div className="max-w-7xl w-[90%] mx-auto px-6 py-4 bg-accent/25 rounded-full shadow-md backdrop-blur-sm flex flex-col items-center">
        <div className="w-full flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link href="/">PEDEVAL</Link>
          </div>
          <div className="flex items-center">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "rounded-full ml-3 hidden md:inline-flex"
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href={PAPER_LINK}
              className={cn(
                buttonVariants(),
                "rounded-full ml-3 hidden md:inline-flex"
              )}
              target="_blank"
            >
              <BookText className="inline mr" />
              Read Paper
            </Link>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>{SITE_CONFIG.name}</SheetTitle>
                  </SheetHeader>
                  <SheetDescription className="flex flex-col items-center gap-4">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "rounded-full ml-3"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      href={PAPER_LINK}
                      className={cn(buttonVariants(), "rounded-full ml-3")}
                      target="_blank"
                    >
                      <BookText className="inline mr" />
                      Read Paper
                    </Link>
                  </SheetDescription>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
