import Link from 'next/link';
import React from 'react';

import { Input } from './ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Package2Icon } from 'lucide-react';
import { SearchIcon } from 'lucide-react';
import ConnectWallet from './ConnectWallet';

export default function Header() {
  return (
    <header className="flex bg-background border-b shadow-sm sticky top-0 z-40 justify-center">
      <div className="container bpx-4 md:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <Package2Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Acme Inc</span>
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
            <DialogTrigger asChild>
              <ConnectWallet />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign In</DialogTitle>
                <DialogDescription>
                  Sign into your Polygon Account
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
