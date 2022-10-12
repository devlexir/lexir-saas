const OrderStatusDetail = ({ data }: any) => {
  switch (data) {
    case 1:
      return <div>{'New'}</div>;
    case 2:
      return <div>{'Processing'}</div>;
    case 3:
      return <div>{'In Transit'}</div>;
    case 4:
      return <div>{'Delivered'}</div>;
    case 5:
      return <div>{'Paid'}</div>;
    case 6:
      return <div>{'Canceled'}</div>;
    default:
      return null;
  }
};

export default OrderStatusDetail;
