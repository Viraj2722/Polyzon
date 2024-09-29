import { useMutation } from "@tanstack/react-query";
import { ethers } from "ethers";
import Esurf from "../../Esurf.json";

export function useCreateOrEditUserProfileMutation() {
  return useMutation({
    mutationKey: ["createOrEditUserProfile"],
    mutationFn: async ({ name, address }) => {
      console.log({ name, address });
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0x3f7d3254902b3C1Cfc8fdb28F5E8bb30a69DD2BD",
          Esurf.abi,
          signer
        );
        return await contract.createOrEditUserProfile(name, address);
      } else {
        alert("install metamask");
      }
    },
  });
}

export function useAddProductMutation() {
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: async ({
      name,
      price,
      description,
      category,
      stock,
      image,
    }) => {
      console.log({
        name,
        price,
        description,
        category,
        stock,
        image,
      });
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0x3f7d3254902b3C1Cfc8fdb28F5E8bb30a69DD2BD",
          Esurf.abi,
          signer
        );
        return await contract.addProduct(
          name,
          ethers.parseUnits(price.toString(), 18),
          description,
          category,
          BigInt(stock),
          image
        );
      } else {
        alert("install metamask");
      }
    },
  });
}

export function useAddReviewMutation() {
  return useMutation({
    mutationKey: ["addReview"],
    mutationFn: async ({ id, review }) => {
      console.log({ id, review });
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          "0x3f7d3254902b3C1Cfc8fdb28F5E8bb30a69DD2BD",
          Esurf.abi,
          signer
        );
        return await contract.addReview(BigInt(id), review);
      } else {
        alert("install metamask");
      }
    },
  });
}
