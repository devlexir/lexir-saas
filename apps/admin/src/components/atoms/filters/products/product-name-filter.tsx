import Label from "@components/ui/label";
import { productNameFilterProductsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function ProductNameFilter({ className }: Props) {
  const [productNameFilterProducts, setProductNameFilterProducts] = useAtom(
    productNameFilterProductsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setProductNameFilterProducts(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>Product Name</Label>
        <input
          type="text"
          placeholder="Product Name"
          value={productNameFilterProducts}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
