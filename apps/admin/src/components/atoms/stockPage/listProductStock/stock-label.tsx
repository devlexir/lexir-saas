interface IStockLabel {
  status: string | undefined;
}

const StockLabel = ({ status }: IStockLabel) => {
  switch (status) {
    case 'Low':
      return (
        <div
          className='flex h-8 w-16 items-center justify-center rounded-full
         bg-[#CB5757] p-1 text-white'
        >
          {status}
        </div>
      );
    case 'Running Low':
      return (
        <div
          className='flex h-8 w-32 items-center justify-center rounded-full
         bg-[#E3BD4A] p-1 text-white'
        >
          {status}
        </div>
      );
    case 'Plenty of Stock':
      return (
        <div
          className='flex h-8 w-32 items-center justify-center rounded-full
       bg-[#1C8C64] p-1 text-white'
        >
          {status}
        </div>
      );
    default:
      return (
        <div
          className='flex h-8 w-32 items-center justify-center rounded-full
          bg-white p-1 text-white'
        >
          {status}
        </div>
      );
  }
};

export default StockLabel;
