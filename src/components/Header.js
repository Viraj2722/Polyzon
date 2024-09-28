import Link from "next/link";
import React from "react";

import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Package2Icon, SearchIcon } from "lucide-react";
import AddProduct from "./AddProduct";

export default function Header() {
  return (
    <header className="flex bg-background border-b sticky top-0 z-40 justify-center">
      <div className="w-full bpx-4 md:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-2xl font-black font-serif">BlockMart</span>
        </Link>
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full bg-muted/10 pl-9 pr-6 rounded-full focus:bg-background focus:ring-1 focus:ring-primary text-sm sm:text-base"
          />
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger>
              <Button>Add products</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add a product</DialogTitle>
                <DialogDescription>
                  <AddProduct/>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Link href="/profile">
            <Button>Profile</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
