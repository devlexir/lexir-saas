import Label from "@components/ui/label";
import { saltesToDateFilterBrandsAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function SalesToDate({ className }: Props) {
  const [saltesToDateFilterBrands, setSaltesToDateFilterBrands] = useAtom(
    saltesToDateFilterBrandsAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setSaltesToDateFilterBrands(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="w-full">
        <Label>Sales to Date</Label>
        <input
          type="text"
          placeholder="Sales to Date"
          value={saltesToDateFilterBrands}
          onChange={handleChange}
          className="w-full text-sm border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
