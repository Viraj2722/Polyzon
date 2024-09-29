"use client";

import RelativeTime from "@yaireo/relative-time";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Header from "../../components/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ard,
} from "@/components/ui/card";
import Link from "next/link";
import { MapPinHouse, UserRound } from "lucide-react";
import { useGetUserProfileQuery } from "../../services/queries";
import { useCreateOrEditUserProfileMutation } from "../../services/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { Badge } from "../../components/ui/badge";

const Page = () => {
  const [user, setUser] = useState({ name: "", address: "" });

  const relativeTime = new RelativeTime();

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  function shortenAddress(address) {
    return address.slice(0, 4) + "..." + address.slice(-5);
  }

  const DELIVERY_STATUS = [
    "Shipped",
    "Out For Delivery",
    "Delivered",
    "Cancelled",
  ];

  const [visible, setVisible] = useState("hidden");

  const { isSuccess, data } = useGetUserProfileQuery();
  const mutation = useCreateOrEditUserProfileMutation();
  const queryClient = useQueryClient();

  async function editProfile() {
    mutation.mutateAsync(user, {
      onSuccess: () => {
        setVisible("hidden");
        queryClient.invalidateQueries({ queryKey: ["getUserProfile"] });
      },
    });
  }

  if (isSuccess) {
    console.log(data);
    return (
      <>
        <Header />
        <div className="flex flex-row">
          <div className="w-[20vw] h-auto m-3 mt-[15vh] rounded-md p-3 bg-white border border-zinc-300">
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex flex-row items-center justify-center">
                <div className="bg-zinc-100 border border-zinc-300 rounded-full w-[5vw] h-[5vw] flex justify-center items-center opacity-90">
                  <img
                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${data.address}`}
                    className="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-center h-full">
                  <h2 className="font-semibold text-2xl px-2">
                    {data.name || "User X"}
                  </h2>
                  <h2 className="font-semibold text-sm px-2 font-mono tracking-wider">
                    {shortenAddress(data.address)}
                  </h2>
                </div>
              </div>
              <div className="h-[0.5px] w-[100%] flex items-center border"></div>
            </div>
            <span className="text-sm py-2">{data.delivery_address}</span>
            <div
              className={`flex justify-center w-full pt-4 ${
                visible === "hidden" ? "block" : "hidden"
              }`}
            >
              <Button
                className="rounded-sm"
                onClick={() => {
                  setVisible("block");
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div className={`flex flex-col gap-1 mt-2 ${visible}`}>
              <div className="flex flex-row justify-center">
                <UserRound className="text-lg w-[20px]" />
                <textarea
                  type="text"
                  onChange={handleChange}
                  value={user.name ? user.name : ""}
                  name="name"
                  placeholder="name"
                  rows={1}
                  className="resize-none w-2/3 border border-zinc-500 p-1 mx-2 rounded-md"
                />
              </div>

              <div className="flex flex-row justify-center">
                <MapPinHouse className="text-lg w-[20px]" />
                <textarea
                  type="text"
                  onChange={handleChange}
                  name="address"
                  value={user.address ? user.address : ""}
                  placeholder="address"
                  rows={3}
                  className="border w-2/3 border-zinc-500 p-1 mx-2 rounded-md"
                />
              </div>

              <div className="flex gap-x-3 justify-center">
                <Button
                  className="p-3 w-[40%] my-3 rounded-sm"
                  onClick={editProfile}
                >
                  Update
                </Button>
                <Button
                  variant="destructive"
                  className="p-3 w-[40%] my-3 rounded-sm"
                  onClick={() => setVisible("hidden")}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
          {/* Tabs Start */}
          <div className="flex m-3 w-full">
            <Tabs defaultValue="listed" className="flex flex-col w-full">
              <div className="flex w-full justify-end">
                <TabsList className="grid w-[15vw] grid-cols-2 bg-slate-300 items-end">
                  <TabsTrigger value="listed" className=" bg-zinc-300">
                    Listed
                  </TabsTrigger>
                  <TabsTrigger value="purchased" className=" bg-zinc-300">
                    Purchased
                  </TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="listed">
                <div>
                  <h2 className="text-xl font-bold mb-4 text-start">
                    Listed Products
                  </h2>
                  <div className="h-[0.5px] w-full bg-zinc-300"></div>
                  <div className="p-5 min-h-auto">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {data.listedProducts.length == 0 ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>No Products Found</CardTitle>
                          </CardHeader>
                        </Card>
                      ) : (
                        data.listedProducts.map((e) => {
                          return (
                            <Card>
                              <CardHeader>
                                <CardTitle>{e.name}</CardTitle>
                                <CardDescription>
                                  {e.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <Link
                                  href={`/product/${e.id}`}
                                  className="text-primary"
                                  prefetch={false}
                                >
                                  <Button variant="outline">
                                    View Product
                                  </Button>
                                </Link>
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="purchased">
                <div>
                  <h2 className="text-xl font-bold mb-4">Purchased Products</h2>
                  <div className="h-[0.5px] w-full bg-zinc-300"></div>
                  <div className="p-5 min-h-auto">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {data.purchasedProducts.length == 0 ? (
                        <Card>
                          <CardHeader>
                            <CardTitle>No Products Found</CardTitle>
                          </CardHeader>
                        </Card>
                      ) : (
                        data.purchasedProducts.map((e, i) => {
                          return (
                            <Card>
                              <CardHeader>
                                <CardTitle>
                                  {e.name}
                                  {` (${Number(data.orderedItems[i][3])})`}
                                  <Badge className="ml-2">
                                    {
                                      DELIVERY_STATUS[
                                        Number(data.orderedItems[i][2])
                                      ]
                                    }
                                  </Badge>
                                </CardTitle>
                                <CardDescription>
                                  {e.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex w-full items-center justify-between">
                                  <Link
                                    href={`/product/${e.id}`}
                                    className="text-primary"
                                    prefetch={false}
                                  >
                                    <Button variant="outline">
                                      View Product
                                    </Button>
                                  </Link>
                                  <span className="text-sm font-semibold">
                                    Ordered{" "}
                                    {relativeTime.from(
                                      new Date(
                                        Number(data.orderedItems[i][4]) * 1000
                                      )
                                    )}
                                  </span>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* <Footer */}
      </>
    );
  }
};

export default Page;
