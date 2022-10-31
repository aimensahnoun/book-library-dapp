import * as BookLibrary from "./BookLibrary.json";

export const contractConfig = {
  address: process.env.NEXT_PUBLIC_POLYGON_CONTRACT_ADDRESS as string,
  abi: BookLibrary.abi,
};
