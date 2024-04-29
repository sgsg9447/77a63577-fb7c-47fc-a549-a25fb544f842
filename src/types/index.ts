export interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
}

export interface CoinDetail {
  id: string;
  name: string;
  symbol: string;
  description: {
    en: string | null;
    ko: string | null;
  };
  image: {
    thumb: string;
  };
  market_cap_rank: number;
  links: {
    homepage: string[];
  };
  market_data: {
    current_price: {
      krw: number;
      btc: number;
      usd: number;
    };
    total_volume: {
      krw: number;
      btc: number;
      usd: number;
    };
    market_cap: {
      krw: number;
      btc: number;
      usd: number;
    };
  };
}

export type Currency = "krw" | "usd";

export type ViewMode = "all" | "bookmarks";

export type PerPage = 10 | 30 | 50;
