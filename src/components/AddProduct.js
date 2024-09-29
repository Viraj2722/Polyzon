import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { useAddProductMutation } from "../services/mutations";

export default function AddProduct() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: 0,
    stock: 0,
    image: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

    console.log({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setError("Please select an image first.");
      return;
    }

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=4c2bd0059dfad5d914592764b3fea53b",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setImageUrl(data.data.url);
      setProduct((p) => {
        return { ...p, image: data.data.url };
      });
    } catch (err) {
      setError("Failed to upload image. Please try again.");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const mutation = useAddProductMutation();

  async function submitProduct() {
    mutation.mutateAsync(product, {
      onSuccess: () => {
        // show modal
      },
    });
  }

  return (
    <div>
      <Label htmlFor="picture">Product Name</Label>
      <Input className="mb-3" type="text" onChange={handleChange} name="name" />
      <Label htmlFor="picture">Price</Label>
      <Input
        className="mb-3"
        type="number"
        onChange={handleChange}
        name="price"
      />
      <Label htmlFor="picture">Description</Label>
      <Input
        className="mb-3"
        type="text"
        onChange={handleChange}
        name="description"
      />
      <Label htmlFor="picture">Category</Label>
      <Select
        name="category"
        onValueChange={(e) =>
          setProduct((p) => {
            return { ...p, category: e };
          })
        }
      >
        <SelectTrigger className="w-[180px] mb-3">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Electronics</SelectItem>
          <SelectItem value="1">Accesories</SelectItem>
          <SelectItem value="2">Clothing</SelectItem>
          <SelectItem value="3">Furniture</SelectItem>
          <SelectItem value="4">Food</SelectItem>
        </SelectContent>
      </Select>
      <Label htmlFor="picture">Stock</Label>
      <Input
        className="mt-3 mb-3"
        type="text"
        onChange={handleChange}
        name="stock"
      />

      <Label htmlFor="picture">Image</Label>
      <Input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        name="image"
      />
      <Button
        className="mt-3"
        variant="outline"
        onClick={uploadImage}
        disabled={isLoading}
      >
        {isLoading ? "Uploading..." : "Upload Product Image"}
      </Button>
      <Button className="mt-3" onClick={submitProduct}>
        Submit
      </Button>
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
