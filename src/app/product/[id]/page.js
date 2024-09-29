"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CarouselSlide from "@/components/CarouselSlide";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  useAddReviewMutation,
  useBuyProductMutation,
} from "@/services/mutations";
import {
  useGetProductQuery,
  useGetProductReviewsQuery,
} from "@/services/queries";
import { useGetAllProductsQuery } from "../../../services/queries";

export default function HomeScreen({ params: { id } }) {

  const [review, setReview] = useState("");
  const [count, setCount] = useState(0);

  const { isSuccess, data } = useGetProductQuery({ id });
  const { data: alldata, isSuccess: isSuccessfull } = useGetAllProductsQuery();
  const reviewQuery = useGetProductReviewsQuery({ id });

  console.log(alldata)


  function bigIntToWei(weiValue) {
    const weiString = weiValue.toString();
    const paddedWeiString = weiString.padStart(10, "0");
    const gweiPart = paddedWeiString.slice(0, -18);
    const fractionalPart = paddedWeiString.slice(-18);
    const gweiValue = parseFloat(gweiPart + "." + fractionalPart);
    return gweiValue;
  }

  function shortenAddress(address) {
    return address.slice(0, 4) + "..." + address.slice(-5);
  }

  function convertBlockTime(blockTime) {
    const milliseconds = blockTime * 1000;
    const date = new Date(milliseconds);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return formattedDate;
  }

  const mutation = useAddReviewMutation();
  const buyMutation = useBuyProductMutation();

  async function addReview() {
    mutation.mutateAsync(
      { id, review },
      {
        onSuccess: () => { },
      }
    );
  }

  if (isSuccess) {
    async function buyProduct() {
      buyMutation.mutateAsync(
        { id, quantity: 1, price: data[2] },
        {
          onSuccess: () => {
            console.log("purchased!!");
          },
        }
      );

      if (isSuccessfull) {
        const groupedProducts = alldata.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});

        const categoryArrays = Object.values(groupedProducts);

        console.log(categoryArrays);
      }

    }

    return (
      <>
        <Header />
        <div className="flex pt-16 items-center justify-evenly">
          <div>
            <img
              src={data[7]}
              width={500}
              height={500}
              className="rounded-3xl border-2 drop-shadow-2xl"
            />
          </div>
          <div className="justify-start w-auto">
            <h1 className="flex items-center text-4xl font-extrabold py-3 gap-4">
              <span>{data[1]}</span>{" "}
              {Number(data[6]) ? (
                <Badge variant="secondary">In Stock: {Number(data[6])}</Badge>
              ) : (
                <Badge variant="destructive">Out Of Stock</Badge>
              )}
            </h1>
            <Card className="w-[550px]">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-2xl">
                      {bigIntToWei(data[2])} ETH
                    </span>
                    <span className="">listed by</span>
                    <Badge
                      variant="secondary"
                      className="text-sm font-mono tracking-wider cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://cardona-zkevm.polygonscan.com/address/${data[5]}`,
                          "_blank"
                        )
                      }
                    >
                      Ξ {shortenAddress(data[5])}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3>{data[3]}</h3>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex flex-row mx-5 border border-zinc-300 rounded-md">
                  <Button
                    variant="outline"
                    className="text-xl"
                    onClick={() =>
                      setCount((prevCount) => Math.max(prevCount - 1, 0))
                    }
                  >
                    -
                  </Button>
                  <div className="px-3 w-10 text-center flex justify-center items-center">
                    {count}
                  </div>
                  <Button
                    variant="outline"
                    className="text-xl"
                    onClick={() =>
                      setCount((prevCount) =>
                        Math.min(prevCount + 1, Number(data[6]))
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <Button disabled={count == 0} onClick={buyProduct}>
                  Buy With Polygon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="pt-32">
          <CarouselSlide category="Similar Products" data={data} />
        </div>

        <div className="w-full pt-32">
          <div className="flex content-between justify-around">
            <h1 className="font-black text-3xl mb-4">Product Reviews</h1>
            <Dialog asChild>
              <DialogTrigger>
                <Button>Leave a Review</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-3">Leave a review </DialogTitle>
                  <DialogDescription>
                    <Input
                      name="review"
                      value={review}
                      placeholder="Write a review..."
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button onClick={addReview}>Submit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          {/* reviews */}
          <div className="flex flex-col text-sm items-center">
            {reviewQuery.isSuccess && reviewQuery.data.length != 0 ? (
              reviewQuery.data.map((e) => {
                return (
                  <Card className="w-[900px] mt-4">
                    <CardHeader>
                      <CardTitle className=" flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${e[0]}`}
                            ></AvatarImage>
                          </Avatar>
                          <Badge
                            variant="outline"
                            className="ml-3 font-mono cursor-pointer"
                            onClick={() =>
                              window.open(
                                `https://cardona-zkevm.polygonscan.com/address/${e[0]}`,
                                "_blank"
                              )
                            }
                          >
                            {e[0]}
                          </Badge>
                        </div>
                        <h1>{convertBlockTime(Number(e[2]))}</h1>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <h3>{e[1]}</h3>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <span className="text-xl font-bold text-center">
                No reviews found, add one!
              </span>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
