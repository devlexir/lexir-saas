import { EmptyStockIcon } from "@assets/emptyPages/empty-stock-icon";

const EmptyStock = () => {
  return (
    <div
      className="h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
      flex justify-center content-center items-center"
    >
      <div className=" flex justify-center overflow-hidden">
        <EmptyStockIcon />
      </div>
    </div>
  );
};

export default EmptyStock;
