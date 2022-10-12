import CheckoutDetails from '@components/_organisms/Checkout/CheckoutDetails';
import CheckoutOrderSummary from '@components/_organisms/Checkout/CheckoutOrderSummary';
import Layout from '@components/layout/layout';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { useCart } from '@contexts/cart/cart.context';

export default function CheckoutPage() {
  const { items, total, isEmpty } = useCart();

  return (
    <>
      <Seo title='Checkout' description='' path='checkout' />
      <Container className='checkout border-t border-border-base py-10 2xl:py-12'>
        <div className='mx-auto flex flex-col xl:max-w-screen-xl'>
          <div className='flex grid-cols-1 flex-col flex-wrap gap-x-7 lg:grid lg:grid-cols-12 xl:gap-x-8'>
            <div className='col-start-1 col-end-9 w-full'>
              <CheckoutDetails />
            </div>
            <div className='col-start-9 col-end-13 mt-7 w-full lg:mt-0'>
              <CheckoutOrderSummary
                items={items}
                total={total}
                isEmpty={isEmpty}
              />
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </>
  );
}

CheckoutPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {},
  };
};
