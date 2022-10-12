import { EmptyCustomerIcon } from "../../assets/emptyPages/empty-customer-icon";

const EmptyCustomer = () => {
  return (
    <div
    className="h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
    flex justify-center content-center items-center"
    >
      <div className=" flex justify-center overflow-hidden">
        <EmptyCustomerIcon />
      </div>
    </div>
  );
};

export default EmptyCustomer;
