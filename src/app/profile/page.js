"use client";

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
} from "@/components/ui/card";
import Link from "next/link";
import { Copy, MapPinHouse, UserRound, Wallet } from "lucide-react";
import { useGetUserProfileQuery } from "../../services/queries";

const Page = () => {
  const [user, setUser] = useState({ username: "", address: "", wallet: "" });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  function shortenAddress(address) {
    return address.slice(0, 4) + "..." + address.slice(-5);
  }

  const { data, isSuccess } = useGetUserProfileQuery();

  if (isSuccess)
    return (
      <>
        <Header />
        <div className="flex flex-row justify-between">
          <div className="w-[20vw] h-auto m-3 mt-[15vh] rounded-md p-3 bg-white border border-zinc-300">
            <div className="mb-3 flex flex-col gap-2">
              <div className="flex flex-row items-center justify-center">
                <div className="bg-zinc-100 border border-zinc-300 rounded-full w-[5vw] h-[5vw] flex justify-center items-center opacity-90">
                  <img
                    src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Felix"
                    className="w-[50px] h-[50px]"
                    alt=""
                  />
                </div>
                <div className="flex flex-col items-center h-full">
                  <h2 className="font-semibold text-2xl px-2">
                    {data.data[0]}
                  </h2>
                  <h2 className="font-semibold text-sm px-2 font-mono tracking-wider cursor-pointer">
                    {shortenAddress(data.address)}
                  </h2>
                </div>
              </div>
              <div className="h-[0.5px] w-[100%] flex items-center border"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row">
                <UserRound className="text-lg w-[20px]" />
                <input
                  type="text"
                  onChange={handleChange}
                  value={user.username ? user.username : ""}
                  name="username"
                  placeholder="username"
                  className="border border-zinc-500 p-1 mx-2 rounded-md"
                />
              </div>

              <div className="flex flex-row">
                <MapPinHouse className="text-lg w-[20px]" />
                <textarea
                  type="text"
                  onChange={handleChange}
                  value={user.address ? user.address : ""}
                  name="address"
                  placeholder="address"
                  rows={2}
                  className="border border-zinc-500 p-1 mx-2 rounded-md"
                />
              </div>
              <Button className="p-3 w-[40%] mx-7 my-3 rounded-sm">
                Update
              </Button>
            </div>
          </div>
          <div className="flex justify-end m-3">
            <Tabs defaultValue="listed" className="flex flex-col items-end">
              <TabsList className="grid w-[15vw] grid-cols-2 bg-slate-300">
                <TabsTrigger value="listed" className=" bg-zinc-300">
                  Listed
                </TabsTrigger>
                <TabsTrigger value="purchased" className=" bg-zinc-300">
                  Purchased
                </TabsTrigger>
              </TabsList>
              <TabsContent value="listed">
                <div>
                  <h2 className="text-xl font-bold mb-4">Listed Products</h2>
                  <div className="h-[0.5px] w-full bg-zinc-300"></div>
                  <div className="p-5 min-h-auto">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card>
                        <CardHeader>
                          <CardTitle>v0.dev</CardTitle>
                          <CardDescription>
                            A powerful platform for building and deploying web
                            applications.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>v0.dev</CardTitle>
                          <CardDescription>
                            A powerful platform for building and deploying web
                            applications.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>v0.dev</CardTitle>
                          <CardDescription>
                            A powerful platform for building and deploying web
                            applications.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Acme API</CardTitle>
                          <CardDescription>
                            A RESTful API for managing customer data.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Acme Dashboard</CardTitle>
                          <CardDescription>
                            A web-based dashboard for monitoring and managing
                            Acme services.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
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
                      <Card>
                        <CardHeader>
                          <CardTitle>v0.dev</CardTitle>
                          <CardDescription>
                            A powerful platform for building and deploying web
                            applications.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Acme API</CardTitle>
                          <CardDescription>
                            A RESTful API for managing customer data.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Acme Dashboard</CardTitle>
                          <CardDescription>
                            A web-based dashboard for monitoring and managing
                            Acme services.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Link
                            href="#"
                            className="text-primary"
                            prefetch={false}
                          >
                            View Project
                          </Link>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* <footer className='h-10 w-full bg-black'></footer> */}
      </>
    );
};

export default Page;
