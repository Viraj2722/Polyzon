import Link from "next/link";
import React, { useState } from "react";

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

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "./ui/button";
import { Package2Icon, SearchIcon } from "lucide-react";
import AddProduct from "./AddProduct";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className="flex bg-background border-b sticky top-0 z-40 justify-center">
      <div className="w-full bpx-4 md:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="text-2xl font-black font-serif">BlockMart</span>
        </Link>
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          
          <Dialog asChild>
            <DialogTrigger>
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full bg-muted/10 pl-9 pr-6 rounded-full focus:bg-background focus:ring-1 focus:ring-primary text-sm sm:text-base"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search any product</DialogTitle>
                <DialogDescription>
                  <Command>
                    <CommandInput placeholder="Type anything to search..." />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandSeparator />
                    </CommandList>
                  </Command>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
              <Button>Add products</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl text-center">Add a product</DialogTitle>
                <DialogDescription>
                  <AddProduct modal={{ openModal, setOpenModal }} />
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
