import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import Esurf from "../../Esurf.json";

function bigIntToWei(weiValue) {
  const weiString = weiValue.toString();
  const paddedWeiString = weiString.padStart(10, "0");
  const gweiPart = paddedWeiString.slice(0, -18);
  const fractionalPart = paddedWeiString.slice(-18);
  const gweiValue = parseFloat(gweiPart + "." + fractionalPart);
  return gweiValue;
}

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0x902e06232fa95B2AAE963E3E335576d750Acffea",
          Esurf.abi,
          provider
        );

        const allProducts = (await contract.getAllProducts()).map((e) => {
          return {
            id: Number(e[0]),
            name: e[1],
            price: bigIntToWei(e[2]),
            description: e[3],
            category: Number(e[4]),
            seller: e[5],
            stock: Number(e[6]),
            image: e[7],
          };
        });

        return allProducts;
      } else {
        alert("install metamask");
      }
    },
    refetchOnWindowFocus: "always",
    retry: false,
  });
}

export function useGetUserProfileQuery() {
  return useQuery({
    queryKey: ["getUserProfile"],
    queryFn: async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0x902e06232fa95B2AAE963E3E335576d750Acffea",
          Esurf.abi,
          provider
        );
        const signer = await provider.getSigner();
        const data = await contract.connect(signer).getUserProfile();

        const listedProductsIds = data[2].map((e) => Number(e));
        const purchasedProductsIds = data[3].map((e) => Number(e));

        const allProducts = (await contract.getAllProducts()).map((e) => {
          return {
            id: Number(e[0]),
            name: e[1],
            price: bigIntToWei(e[2]),
            description: e[3],
            category: Number(e[4]),
            seller: e[5],
            stock: Number(e[6]),
            image: e[7],
          };
        });

        const listedProducts = allProducts.filter((e) =>
          listedProductsIds.includes(e.id)
        );

        const orderedItems = (
          await contract.connect(signer).getUserOrders()
        ).map((e) => e);

        const purchasedProducts = allProducts.filter((e) =>
          purchasedProductsIds.includes(e.id)
        );

        return {
          name: data[0],
          delivery_address: data[1],
          listedProducts,
          purchasedProducts,
          orderedItems,
          address: signer.address,
        };
      } else {
        alert("install metamask");
      }
    },
    retry: false,
  });
}

export function useGetProductQuery({ id }) {
  return useQuery({
    queryKey: ["getProduct"],
    queryFn: async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0x902e06232fa95B2AAE963E3E335576d750Acffea",
          Esurf.abi,
          provider
        );
        return await contract.getProduct(id);
      } else {
        alert("install metamask");
      }
    },
    refetchOnWindowFocus: "always",
    retry: false,
  });
}

export function useGetProductReviewsQuery({ id }) {
  return useQuery({
    queryKey: ["getProductReviews"],
    queryFn: async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0x902e06232fa95B2AAE963E3E335576d750Acffea",
          Esurf.abi,
          provider
        );
        return await contract.getProductReviews(id);
      } else {
        alert("install metamask");
      }
    },
    refetchOnWindowFocus: "always",
    retry: false,
  });
}
// export function useLoginQuery() {
//   return useQuery({
//     queryKey: ["loginQuery"],
//     queryFn: async () => {
//       return (
//         await Preferences.get({ key: "token" })
//       ).value;
//     },
//   });
// }
