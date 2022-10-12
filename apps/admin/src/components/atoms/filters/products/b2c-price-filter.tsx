import Label from "@components/ui/label";
import { b2cPriceFilterProductsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function B2cPriceFilter({ className }: Props) {
  const [b2cPriceFilterProducts, setB2cPriceFilterProducts] = useAtom(
    b2cPriceFilterProductsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setB2cPriceFilterProducts(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full ">
        <Label>B2C Price</Label>
        <input
          type="text"
          placeholder="B2C Price"
          value={b2cPriceFilterProducts}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
