import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { FOOTER_LINKS, SITE_CONFIG } from "@/data/site";

export default function Footer() {
  return (
    <footer className="py-6 mt-12 border-t border-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
          reserved.
        </p>
        <div className="flex">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              {...(link.isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                buttonVariants({ variant: "link" }),
                "text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
