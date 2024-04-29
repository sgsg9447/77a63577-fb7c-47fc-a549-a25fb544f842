import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Currency, PerPage } from "./types";

//TODO : get<000> return 타입 정의 필요

export const getMarketCoins = async (
  currency: Currency,
  perPage: PerPage,
  page: number
) => {
  const locale = currency === "krw" ? "ko" : "en";
  return axios
    .get("api/v3/coins/markets", {
      params: {
        vs_currency: currency,
        per_page: perPage,
        locale,
        page,
        order: "market_cap_desc",
        price_change_percentage: "1h,24h,7d",
      },
      headers: {
        "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
      },
    })
    .then((res) => res.data);
};

export const marketCoinsQueryOptions = (
  currency: Currency,
  perPage: PerPage,
  page: number
) =>
  queryOptions({
    queryKey: ["marketCoins", currency, perPage, page],
    queryFn: () => getMarketCoins(currency, perPage, page),
  });

export const getMarketCoinDetail = async (marketCoinId: string) => {
  const reponse = await axios
    .get(`api/v3/coins/markets/${marketCoinId}`)
    .then((r) => r.data)
    .catch((err) => {
      console.error(err);
      return null;
    });

  return reponse;
};

export const marketCoinDetailQueryOptions = (marketCoinId: string) =>
  queryOptions({
    queryKey: ["marketCoinDetail", marketCoinId],
    queryFn: () => getMarketCoinDetail(marketCoinId),
  });
