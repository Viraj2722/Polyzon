"use client";

import Header from "@/components/Header";
import Carousel from "@/components/CarouselSlide";
import Category from "@/components/Category";
import { useGetAllProductsQuery } from "../services/queries";
import Footer from "@/components/Footer";

const CATEGORIES = [
  {
    name: "Electronics",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/4da1d0d19350cc84.jpg?q=100",
  },
  {
    name: "Accessories",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/44e10b16e649b691.jpg?q=100",
  },
  {
    name: "Clothing",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/9d4e9c605fc1d2d3.jpg?q=100",
  },
  {
    name: "Furniture",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/7a5e96c10ada8a56.jpg?q=100",
  },
  {
    name: "Food",
    image:
      "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/25f400c36bc3487d.jpg?q=100",
  },
];

export default function Home() {
  const { data, isSuccess } = useGetAllProductsQuery();

  if (isSuccess) {
    console.log(data.map((e) => e));
  }

  const handleScrollToCategory = (categoryName) => {
    const element = document.getElementById(categoryName);
    if (element) {
      const offset = -50; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset + offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Header />
      <Category categories={CATEGORIES} onCategoryClick={handleScrollToCategory} />

      {CATEGORIES.map(({ name }) => (
        <div id={name} key={name} className="py-10"> 
          <Carousel category={name} />
        </div>
      ))}

      <Footer />
    </>
  );
}
