import { useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { PricesClient } from "../services/ApiClientInstances";
import { PriceResponse } from "../models/PriceResponse";
import priceStore from "../stores/priceStore";
import { useState } from "react";

const usePriceQuery = (coinId: number, paginate: boolean = false) => {
  const { page } = priceStore();
  const [currentPage, setCurrentPage] = useState(page);

  const fetchPrices = async (page?: number): Promise<PriceResponse> => {
    console.log("COINID", coinId);

    const options = paginate ? { page } : undefined;
    const priceData: PriceResponse = await PricesClient.get(coinId, options);
    return priceData;
  };

  const queryKey = paginate ? ["coin", coinId, "prices"] : ["coin", coinId, "prices", currentPage]

  return {
    ...useQuery<PriceResponse, Error>({
      queryKey,
      queryFn: () => fetchPrices(currentPage),
      placeholderData: keepPreviousData,// Retains the previous data while fetching the new page
    }),
    currentPage,
    setCurrentPage,
  };
};

export default usePriceQuery;