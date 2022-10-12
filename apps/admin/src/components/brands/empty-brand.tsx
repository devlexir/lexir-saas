const EmptyBrand = () => {
  return (
    <div
      className="h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
      flex justify-center content-center items-center"
    >
      <div className="h-fit flex flex-col justify-center text-2xl text-[#6F6F6F]">
        <span className="flex justify-center font-semibold">No Brands Yet</span>
        <span className="flex font-light">Please add a brand</span>
      </div>
    </div>
  );
};

export default EmptyBrand;
