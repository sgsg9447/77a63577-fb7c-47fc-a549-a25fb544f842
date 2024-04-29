import { Link } from "@tanstack/react-router";
import BookmarkIcon from "../assets/BookmarkIcon";
import { Coin } from "../types";
import { formatCurrency, formatPercentage } from "../utils";

type TableProps = {
  data: Coin[];
  currency: "krw" | "usd";
};

const Table = ({ data, currency = "krw" }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>자산</th>
          <th></th>
          <th>Price</th>
          <th>1H</th>
          <th>24H</th>
          <th>7D</th>
          <th>24H Volume</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => {
          const priceChange1h = formatPercentage(
            coin.price_change_percentage_1h_in_currency
          );
          const priceChange24h = formatPercentage(
            coin.price_change_percentage_24h_in_currency
          );
          const priceChange7d = formatPercentage(
            coin.price_change_percentage_7d_in_currency
          );

          return (
            <tr key={coin.id}>
              <td>
                <BookmarkIcon />
              </td>
              <td>
                <Link to="/markets/$marketId" params={{ marketId: coin.id }}>
                  {coin.name}
                </Link>
              </td>
              <td>{coin.symbol}</td>
              <td>{formatCurrency(coin.current_price, currency)}</td>
              <td className={priceChange1h.className}>
                {priceChange1h.formattedValue}
              </td>
              <td className={priceChange24h.className}>
                {priceChange24h.formattedValue}
              </td>
              <td className={priceChange7d.className}>
                {priceChange7d.formattedValue}
              </td>
              <td>{formatCurrency(coin.total_volume, currency)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
