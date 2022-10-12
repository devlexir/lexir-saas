import { EmptyProductIcon } from "@assets/emptyPages/empty-product.icon";

const EmptyProduct = () => {
  return (
    <div
    className="h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
    flex justify-center content-center items-center"
    >
      <div className=" flex justify-center overflow-hidden">
      <EmptyProductIcon />
      </div>
    </div>
  );
};

export default EmptyProduct;
