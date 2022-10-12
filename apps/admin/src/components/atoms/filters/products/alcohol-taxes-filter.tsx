import Label from "@components/ui/label";
import { alcoholTaxesFilterProductsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function AlcoholTaxesFilter({ className }: Props) {
  const [alcoholTaxesFilterProducts, setAlcoholTaxesFilterProducts] = useAtom(
    alcoholTaxesFilterProductsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setAlcoholTaxesFilterProducts(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>Alcohol Taxes</Label>
        <input
          type="text"
          placeholder="Alcohol Taxes"
          value={alcoholTaxesFilterProducts}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
