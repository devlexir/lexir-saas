import Label from "@components/ui/label";
import { salesToDateCustomersAtom } from "@contexts/filters";
import cn from "classnames";
import { useAtom } from "jotai";

type Props = {
  className?: string;
};

export default function SalesToDate({ className }: Props) {
  const [salesToDateCustomers, setSalesToDateCustomers] = useAtom(
    salesToDateCustomersAtom
  );

  const handleChange = (e: {
    target: { value: string | ((prev: string) => string) };
  }) => {
    setSalesToDateCustomers(e.target.value);
  };

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:space-x-5 md:items-end space-y-5 md:space-y-0 grow-0 sm:grow",
        className
      )}
    >
      <div className="">
        <Label>Latest Order</Label>
        <input
          type="text"
          placeholder="Latest Order"
          value={salesToDateCustomers}
          onChange={handleChange}
          className="border border-border-base focus:border-accent rounded"
        />
      </div>
    </div>
  );
}
