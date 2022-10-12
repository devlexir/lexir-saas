import Label from "@components/ui/label";
import { accountyTypeFilterBrandsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function AccountType({ className }: Props) {
  const [accountyTypeFilterBrands, setAccountyTypeFilterBrands] = useAtom(
    accountyTypeFilterBrandsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setAccountyTypeFilterBrands(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>Account Type</Label>
        <input
          type="text"
          placeholder="Account Type"
          value={accountyTypeFilterBrands}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
