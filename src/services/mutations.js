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
          "0xf3dae8BBC2BCE358474AcA6737c85c7CABD06Fe5",
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

// export function useLoginMutation() {
//   return useMutation({
//     mutationKey: ["loginMutation"],
//     mutationFn: async (data) => {
//       return (
//         await axios.post(`${API_URL}/auth/login`, data, {
//           headers: { "Content-Type": "application/json" },
//         })
//       ).data;
//     },
//   });
// }

// export function useRestoreHealthMutation() {
//   return useMutation({
//     mutationKey: ["restoreHealthMutation"],
//     mutationFn: async (data) => {
//       const { value } = await Preferences.get({ key: "token" });
//       return (
//         await axios.post(`${API_URL}/restore`, data, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${value}`,
//           },
//         })
//       ).data;
//     },
//   });
// }
