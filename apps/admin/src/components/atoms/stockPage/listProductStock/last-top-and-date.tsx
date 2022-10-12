interface ILastTopUpAndDate {
  lastTopUp: number | undefined;
  date: string | undefined;
}
const LastTopUpAndDate = ({ lastTopUp, date }: ILastTopUpAndDate) => {
  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:gap-16'>
      <div className='flex flex-row gap-x-1'>
        <h3 className='text-base font-normal text-[#6F6F6F]'>Last top up:</h3>
        <span className='text-base font-normal text-[#6F6F6F]'>
          {`${lastTopUp} (UN)`}
        </span>
      </div>
      <span className='text-base font-normal text-[#6F6F6F]'>{date}</span>
    </div>
  );
};

export default LastTopUpAndDate;
