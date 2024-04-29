import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { marketCoinsQueryOptions } from "../api";
import Table from "../components/Table";
import { Coin, Currency } from "../types";

export const Route = createFileRoute("/markets/")({
  component: MarketsPage,
});

export function MarketsPage() {
  const [currency, setCurrency] = useState<Currency>("krw");
  const [perPage, setPerPage] = useState(50);

  const [coinData, setCoinData] = useState<Coin[]>([]);

  const { data } = useQuery(marketCoinsQueryOptions(currency, perPage));
  useEffect(() => {
    setCoinData(data);
  }, [data]);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
  };
  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
  };

  return <>{coinData && <Table data={coinData} currency={currency} />}</>;
}
