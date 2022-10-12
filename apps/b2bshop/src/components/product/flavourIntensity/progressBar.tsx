const ProgressBar = ({ intensity = 0 }) => {
  return (
    <div className='flex h-[2px] w-full flex-row gap-x-1 '>
      <div
        className={`h-[2px] w-1/5 rounded-full ${
          intensity >= 1 ? ' bg-[#2D2D2D]' : ' bg-[#CACACA]'
        }`}
      />
      <div
        className={`h-[2px] w-1/5 rounded-full ${
          intensity >= 2 ? ' bg-[#2D2D2D]' : ' bg-[#CACACA]'
        }`}
      />
      <div
        className={`h-[2px] w-1/5 rounded-full ${
          intensity >= 3 ? ' bg-[#2D2D2D]' : ' bg-[#CACACA]'
        }`}
      />
      <div
        className={`h-[2px] w-1/5 rounded-full ${
          intensity >= 4 ? ' bg-[#2D2D2D]' : ' bg-[#CACACA]'
        }`}
      />
      <div
        className={`h-[2px] w-1/5 rounded-full ${
          intensity >= 5 ? ' bg-[#2D2D2D]' : ' bg-[#CACACA]'
        }`}
      />
    </div>
  );
};

export default ProgressBar;
