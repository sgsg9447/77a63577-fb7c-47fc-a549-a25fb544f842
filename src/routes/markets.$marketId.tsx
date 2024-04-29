import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { marketCoinDetailQueryOptions } from "../api";
import "../style/markets.css";
import { Bookmark } from "../components/Bookmark";
import Loader from "../components/Loader";
import { Currency } from "../types";
import { formatCurrency } from "../utils";

export const Route = createFileRoute("/markets/$marketId")({
  component: MarketDetailPage,
});

function MarketDetailPage() {
  const marketId = Route.useParams().marketId;
  const [currency, setCurrency] = useState<Currency>("krw");
  const { data, isLoading } = useSuspenseQuery(
    marketCoinDetailQueryOptions(marketId)
  );
  const [showDescription, setShowDescription] = useState(false);
  const [btc, setBtc] = useState("");
  const [krw, setKrw] = useState("");

  const handleBtcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^\d*\.?\d{0,8}$/.test(value)) {
      setBtc(value);
    }
  };

  const handleKrwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (/^[1-9]\d*$/.test(value) || value === "") {
      setKrw(value);
    }
  };

  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    setKrw("");
    setBtc("");
  };

  const handleExchangeClick = () => {
    let convertedValue;
    if (!data) return;

    if (currency === "krw") {
      if (btc) {
        // BTC에서 KRW로 변환
        convertedValue = parseFloat(btc) * data.market_data.current_price.krw;
        setKrw(convertedValue.toFixed(2));
        setBtc("");
      } else if (krw) {
        // KRW에서 BTC로 변환
        convertedValue = parseFloat(krw) / data.market_data.current_price.krw;
        setBtc(convertedValue.toFixed(8));
        setKrw("");
      }
    } else {
      if (btc) {
        // BTC에서 USD로 변환
        convertedValue = parseFloat(btc) * data.market_data.current_price.usd;
        setKrw(convertedValue.toFixed(2));
        setBtc("");
      } else if (krw) {
        // USD에서 BTC로 변환
        convertedValue = parseFloat(krw) / data.market_data.current_price.usd;
        setBtc(convertedValue.toFixed(8));
        setKrw("");
      }
    }
  };

  const getInputTitle = (currency: Currency) => currency.toUpperCase();

  return (
    <>
      {isLoading && <Loader />}

      <div className="wrapper">
        <div className="title-wrapper">
          <Bookmark coinId={marketId} />
          {data?.image.thumb && (
            <img src={data.image.thumb} alt="Thumb Image" />
          )}
          <div>{data?.name}</div>
          <div>({data?.symbol})</div>
        </div>
        <select
          className="currency-select"
          value={currency}
          onChange={(e) => handleCurrencyChange(e.target.value as Currency)}
        >
          <option value="krw">KRW 보기 ▵</option>
          <option value="usd">USD 보기 ▵</option>
        </select>
      </div>

      <div className="info-currency-wrapper">
        <div className="info-box">
          <div className="info-row">
            <div className="info-title">시가총액 Rank</div>
            <div className="info-value">Rank #{data?.market_cap_rank}</div>
          </div>
          <div className="info-row">
            <div className="info-title">웹사이트</div>
            <a
              href={data?.links?.homepage[0]}
              rel="noopener noreferrer"
              className="info-value"
            >
              {data?.links?.homepage[0]}
            </a>
          </div>
        </div>

        <div className="currency-box">
          <div className="currency-value">
            {formatCurrency(
              currency === "krw"
                ? (data?.market_data?.current_price.krw as number)
                : (data?.market_data?.current_price.usd as number),
              currency
            )}
          </div>
          <div className="currency-caption">
            {data?.market_data?.current_price.btc} BTC
          </div>
          <div className="market-info">
            <div className="market-info-title-box">
              <div className="market-info-title">시가총액</div>
              <div className="market-info-value">
                {formatCurrency(
                  currency === "krw"
                    ? (data?.market_data?.current_price.krw as number)
                    : (data?.market_data?.current_price.usd as number),
                  currency
                )}
              </div>
            </div>
            <div className="market-info-title-box">
              <div className="market-info-title">24시간 거래대금</div>
              <div className="market-info-value">
                {formatCurrency(
                  currency === "krw"
                    ? (data?.market_data?.current_price.krw as number)
                    : (data?.market_data?.current_price.usd as number),
                  currency
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="converter-wrapper">
        <div className="input-group">
          <div className="input-title">BTC</div>
          <input type="text" value={btc} onChange={handleBtcChange} />
        </div>
        <div className="exchange-icon" onClick={handleExchangeClick}>
          ⇄
        </div>
        <div className="input-group">
          <div className="input-title">{getInputTitle(currency)}</div>
          <input type="text" value={krw} onChange={handleKrwChange} />
        </div>
      </div>

      <button className="des-button" onClick={toggleDescription}>
        설명보기 {showDescription ? "▼" : "▲"}
      </button>
      {showDescription && (
        <div className="description-detail">
          {currency === "krw" ? data?.description.ko : data?.description.en}
        </div>
      )}
    </>
  );
}
