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

export type Currency = "krw" | "usd";

export type ViewMode = "all" | "bookmarks";

export type PerPage = 10 | 30 | 50;
