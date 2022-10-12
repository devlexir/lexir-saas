import { EmptyPayoutIcon } from '@assets/emptyPages/empty-payout.icon';

const EmptyPayout = () => {
  return (
    <div
      className='h-[67vh] shadow border rounded-lg border-[#E7E7E7] 
    flex justify-center content-center items-center'
    >
      <div className=' flex justify-center overflow-hidden'>
        <EmptyPayoutIcon />
      </div>
    </div>
  );
};

export default EmptyPayout;
