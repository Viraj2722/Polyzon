import { ethers } from "ethers";
import { useQuery } from "@tanstack/react-query";
import Esurf from "../../Esurf.json";

export function useGetAllProductsQuery() {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
          "0xf3dae8BBC2BCE358474AcA6737c85c7CABD06Fe5",
          Esurf.abi,
          provider
        );
        const signer = await provider.getSigner();
        const data = await contract.connect(signer).getAllProducts();
        return data.map((w) => w);
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
          "0xf3dae8BBC2BCE358474AcA6737c85c7CABD06Fe5",
          Esurf.abi,
          provider
        );
        const signer = await provider.getSigner();
        const data = await contract.connect(signer).getUserProfile();
        return { data, address: signer.address };
      } else {
        alert("install metamask");
      }
    },
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
