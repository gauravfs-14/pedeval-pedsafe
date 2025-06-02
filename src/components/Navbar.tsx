import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { BookText } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PAPER_LINK } from "@/data/site";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-6 inset-x-0">
      <div className="max-w-7xl mx-auto px-6 py-4 bg-accent/25 rounded-full shadow-md backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link href="/">PEDEVAL</Link>
          </div>
          <div className="">
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
          </div>
        </div>
      </div>
    </nav>
  );
}
