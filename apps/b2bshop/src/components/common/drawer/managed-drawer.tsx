import { Drawer } from '@components/common/drawer/drawer';
import { useUI } from '@contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import {useEffect} from 'react';

const Cart = dynamic(() => import('@components/cart/cart'));
const OrderDetails = dynamic(() => import('@components/order/order-drawer'));

const ManagedDrawer = () => {
  const { displayDrawer, closeDrawer, drawerView } = useUI();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  const contentWrapperCSS = dir === 'ltr' ? { right: 0 } : { left: 0 };
  let isMobile

  useEffect(() => {
    isMobile = window.matchMedia('(max-width: 768px)').matches;// : '569' ? ' '; 
  }, []);

  return (
    <Drawer
      open={displayDrawer}
      placement={dir === 'rtl' ? 'left' : 'right'}
      onClose={closeDrawer}
      handler={false}
      showMask={true}
      level={null}
      contentWrapperStyle={contentWrapperCSS}
      width={isMobile ? '568' : ''} //568
    >
      {drawerView === 'CART_SIDEBAR' && <Cart />}
      {drawerView === 'ORDER_DETAILS' && <OrderDetails />}
    </Drawer>
  );
};

export default ManagedDrawer;
