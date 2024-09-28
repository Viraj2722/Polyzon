import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Category({ categories, onCategoryClick }) {
  return (
    <div className="flex px-4 md:px-6 py-3 shadow-md justify-center">
      <div className="flex justify-evenly w-[50%]">
        {categories.map((e, index) => (
          <div
            className="flex flex-col text-sm items-center font-medium cursor-pointer px-10"
            key={index}
            onClick={() => onCategoryClick(e.name)}
          >
            <Avatar className="bg-slate-500 my-2 group-hover:bg-muted/50 transition-colors">
              <AvatarImage src={e.image || "https://picsum.photos/200"}></AvatarImage>
            </Avatar>
            <h3>{e.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
