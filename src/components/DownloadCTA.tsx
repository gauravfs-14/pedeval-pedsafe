import { Download } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { HOME_SECTIONS, PAPER_LINK } from "@/data/site";

export default function DownloadCTA() {
  return (
    <Card className="bg-accent/20 shadow-sm rounded-2xl text-center mx-10 p-10">
      <CardHeader className="text-3xl font-bold -mb-5">
        {HOME_SECTIONS.find((section) => section.type === "cta")?.title || ""}
      </CardHeader>
      <CardContent className="text-muted-foreground text-base leading-relaxed max-w-[90%] mx-auto -mb-2">
        {HOME_SECTIONS.find((section) => section.type === "cta")?.description ||
          ""}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          href={PAPER_LINK}
          className={cn(buttonVariants({ variant: "default" }), "gap-2")}
        >
          <Download className="w-5 h-5" />
          <span>Download Paper</span>
        </Link>
      </CardFooter>
    </Card>
  );
}
