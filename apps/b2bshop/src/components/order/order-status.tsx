import ProgressBox from './progress-box';
import { useOrderStatusQuery } from '@framework/basic-rest/order/order-status';

interface Props {
  status: number;
}

const OrderStatus = ({ status }: Props) => {
  const { data, isLoading } = useOrderStatusQuery();
  return !isLoading ? (
    <ProgressBox data={data} status={status} />
  ) : (
    <div>Loading...</div>
  );
};

export default OrderStatus;
