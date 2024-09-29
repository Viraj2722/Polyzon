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
import Link from "next/link";

function CarouselSlide({ category, data }) {
  console.log(data);
  return (
    <>
      <h1 className="text-3xl text-center font-black py-6">{category}</h1>
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
            {data.map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="w-[350px] hover:bg-zinc-100">
                    <CardHeader>
                      <CardTitle className="text-2xl font-black font-serif text-ellipsis">
                        {data[index].name}
                      </CardTitle>
                      <CardDescription>Click to know more</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={
                          !data[index].image
                            ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                            : data[index].image
                        }
                        className="rounded-lg drop-shadow-md w-[300px] h-[300px]"
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <h1 className="text-lg font-bold">{data[index].price} Ξ</h1>
                      <Link href={`/product/${data[index].id}`}>
                        <Button>Buy Now</Button>
                      </Link>
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
