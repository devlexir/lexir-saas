import { EmptyOrderIcon } from "@assets/emptyPages/empty-order-icon";

const EmptyOrder = () => {
  return (
    <div
      className="h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
      flex justify-center content-center items-center"
    >
      <div className=" flex justify-center overflow-hidden">
        <EmptyOrderIcon />
      </div>
    </div>
  );
};

export default EmptyOrder;
