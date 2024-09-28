import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React from "react";
import { Button } from "./ui/button";

function CarouselSlide() {
  return (
    <>
      <h1 className="text-3xl text-center font-black py-6">Electronics</h1>
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            autoplay: true,
            autoplayInterval: 5000,
          }}
          className="w-full max-w-6xl"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-[350px]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black font-serif">
                        Product Name
                      </CardTitle>
                      <CardDescription>Short Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src="https://picsum.photos/700/600"
                        className="rounded-lg drop-shadow-md"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <h1 className="text-lg font-bold">0.1 Ξ</h1>
                      <Button>Buy Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}

export default CarouselSlide;
