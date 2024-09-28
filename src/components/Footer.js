import { Package2Icon } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-muted/10 border-t mt-5">
      <div className="flex w-full justify-between px-4 py-4 ">
        <div className="flex items-center gap-2">
          <Package2Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-2xl font-black font-serif">BlockMart</span>
        </div>
        <div className="text-sm text-muted-foreground">&copy; BlockMart.</div>
      </div>
    </footer>
  );
}
