"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CarouselSlide from "@/components/CarouselSlide";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <div className="flex pt-16 items-center justify-evenly">
        <div>
          <img
            src="https://picsum.photos/500"
            className="rounded-3xl border border-black drop-shadow-2xl"
          />
        </div>
        <div className="justify-start w-auto">
          <span className="text-4xl font-extrabold py-3">Product 1</span>
          <Card className="w-[550px]">
            <CardHeader>
              <CardTitle>
                <span className="font-semibold text-xl">786 Ξ</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Accusantium, assumenda corporis. Atque quis ducimus
                necessitatibus quibusdam similique quod totam iure fugit fugiat
                quos. Facere vel, illum cumque odio excepturi molestias?e
              </span>
            </CardContent>
            <CardFooter className="flex">
              <Button>Buy With Polygon</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="pt-32">
        <CarouselSlide heading="Similar Products" />
      </div>

      <div className=" pt-32">
        <span className="font-black text-3xl text-center mb-4">
          Product Reviews
        </span>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="flex flex-col mt-4 text-sm items-center font-medium"
            key={index}
          >
            <Card className="w-[900px]">
              <CardHeader>
                <CardTitle className=" flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/500"></AvatarImage>
                    </Avatar>
                    <span className="pl-3">Username</span>
                  </div>
                  <span>11/09/2001</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Accusantium, assumenda corporis. Atque quis ducimus
                  necessitatibus quibusdam similique quod totam iure fugit
                  fugiat quos. Facere vel, illum cumque odio excepturi
                  molestias?e
                </span>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
