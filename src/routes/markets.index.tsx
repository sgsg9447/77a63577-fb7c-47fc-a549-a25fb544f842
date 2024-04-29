import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { marketCoinsQueryOptions } from "../api";
import Table from "../components/Table";
import { Coin, Currency, ViewMode } from "../types";

export const Route = createFileRoute("/markets/")({
  component: MarketsPage,
});

export function MarketsPage() {
  const [currency, setCurrency] = useState<Currency>("krw");
  const [perPage, setPerPage] = useState(50);
  const [viewMode, setViewMode] = useState<ViewMode>("all");

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
  const handleViewModeChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode);
  };
  return (
    <>
      {coinData && (
        <>
          <select
            value={viewMode}
            onChange={(e) => handleViewModeChange(e.target.value as ViewMode)}
          >
            <option value="all">전체 보기</option>
            <option value="bookmarks">북마크 보기</option>
          </select>
          <select
            value={currency}
            onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
          >
            <option value="krw">KRW</option>
            <option value="usd">USD</option>
          </select>
          <select
            value={perPage.toString()}
            onChange={(e) => handlePerPageChange(Number(e.target.value))}
          >
            <option value="10">10개 보기</option>
            <option value="30">30개 보기</option>
            <option value="50">50개 보기</option>
          </select>
          <Table data={coinData} currency={currency} />
        </>
      )}
    </>
  );
}
