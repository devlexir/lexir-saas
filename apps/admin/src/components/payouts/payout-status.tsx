const PayoutStatus = ({ status }: any) => {
  switch (status) {
    case 'Waiting for Brand Invoice':
      return <div className='text-[#3482D0]'>{status}</div>;
    case 'Payment Pending':
      return <div className='text-[#D98C41]'>{status}</div>;
    case 'Paid':
      return <div className='text-[#1C8C64]'>{status}</div>;
    default:
      return <div className='text-[#1C8C64]'>{'Dont have a status'}</div>;
  }
};

export default PayoutStatus;
