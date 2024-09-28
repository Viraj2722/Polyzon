'use client'

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import CarouselSlide from "@/components/CarouselSlide"
import { Input } from "@/components/ui/input"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function HomeScreen() {
  return (
    <>
      <Header/>
      <div className="flex pt-16 items-center justify-evenly" >
        <div>
          <img src="https://picsum.photos/500" className="rounded-3xl border border-black drop-shadow-2xl" />
        </div>
        <div className="justify-start w-auto">
          <h1 className="text-4xl font-extrabold py-3">Product 1</h1>
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>
                <h3 className="font-semibold text-xl">786 Ξ</h3>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, assumenda corporis. Atque quis ducimus necessitatibus quibusdam similique quod totam iure fugit fugiat quos. Facere vel, illum cumque odio excepturi molestias?e</h3>

            </CardContent>
            <CardFooter className="flex">
              <Button>Buy With Polygon</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="pt-32">
        <CarouselSlide category="Similar Products" />
      </div>

      <div className="w-full pt-32">
        <div className="flex content-between justify-around">
          <h1 className="font-black text-3xl mb-4">
            Product Reviews
          </h1>
          <Dialog asChild>
            <DialogTrigger>
              <Button>
                Leave a Review
            </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Leave a review </DialogTitle>
                <DialogDescription>
                  <Input />
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        {
          Array.from({ length: 10 }).map((_, index) => (
            <div className="flex flex-col mt-4 text-sm items-center font-medium">
              <Card className="w-[900px]">
                <CardHeader>
                  <CardTitle className=" flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src="https://picsum.photos/500"></AvatarImage>
                      </Avatar>
                      <h1 className="pl-3" >Username</h1>
                    </div>
                    <h1>11/09/2001</h1>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium, assumenda corporis. Atque quis ducimus necessitatibus quibusdam similique quod totam iure fugit fugiat quos. Facere vel, illum cumque odio excepturi molestias?e</h3>

                </CardContent>
              </Card>
            </div>
          ))
        }
      </div>
      <Footer/>
    </>

  )
}
