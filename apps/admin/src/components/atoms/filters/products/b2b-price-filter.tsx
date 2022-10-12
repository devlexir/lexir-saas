import Label from "@components/ui/label";
import { b2bPriceFilterProductsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function B2bPriceFilter({ className }: Props) {
  const [b2bPriceFilterProducts, setB2bPriceFilterProducts] = useAtom(
    b2bPriceFilterProductsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setB2bPriceFilterProducts(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>B2B Price</Label>
        <input
          type="text"
          placeholder="B2B Price"
          value={b2bPriceFilterProducts}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
