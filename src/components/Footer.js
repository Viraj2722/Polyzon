import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-muted/10 border-t">
      <div className="container px-4 md:px-6 py-6 sm:py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package2Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="font-semibold">Acme Inc</span>
        </div>
        <div className="text-sm text-muted-foreground">
          &copy; 2024 Acme Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
