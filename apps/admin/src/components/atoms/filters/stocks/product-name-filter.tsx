import Label from "@components/ui/label";
import { productNameFilterStocksAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function ProductNameFilter({ className }: Props) {
  const [productNameFilterStocks, setProductNameFilterStocks] = useAtom(
    productNameFilterStocksAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setProductNameFilterStocks(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>Order ID</Label>
        <input
          type="text"
          placeholder="Order ID"
          value={productNameFilterStocks}
          onChange={handleChange}
          className="border border-border-base focus:border-accent rounded w-full"
        />
      </div>
    </div>
  );
}
