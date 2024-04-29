import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { marketCoinsQueryOptions } from "../api";
import Table from "../components/Table";
import { Coin, Currency, PerPage, ViewMode } from "../types";

export const Route = createFileRoute("/markets/")({
  component: MarketsPage,
});

export function MarketsPage() {
  const [coinData, setCoinData] = useState<Map<string, Coin>>(() => new Map());
  const [currency, setCurrency] = useState<Currency>("krw");
  const [perPage, setPerPage] = useState<PerPage>(50);
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [page, setPage] = useState(1);

  const { data, refetch, isFetching } = useQuery(
    marketCoinsQueryOptions(currency, perPage, page)
  );
  useEffect(() => {
    if (data) {
      const newCoinData = new Map(coinData);
      data.forEach((coin: Coin) => newCoinData.set(coin.id, coin));
      setCoinData(newCoinData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setPage(1);
    setCoinData(new Map());
    refetch();
  };
  const handlePerPageChange = (newPerPage: PerPage) => {
    setPerPage(newPerPage);
    setPage(1);
    setCoinData(new Map());
    refetch();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
            onChange={(e) =>
              handlePerPageChange(Number(e.target.value) as PerPage)
            }
          >
            <option value="10">10개 보기</option>
            <option value="30">30개 보기</option>
            <option value="50">50개 보기</option>
          </select>
          <Table data={Array.from(coinData.values())} currency={currency} />
          <button onClick={handleLoadMore} disabled={isFetching}>
            + 더 보기
          </button>
        </>
      )}
    </>
  );
}
