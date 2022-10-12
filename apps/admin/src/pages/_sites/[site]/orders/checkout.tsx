import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import type { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import CreatePageHeader from '@components/atoms/createPageHeader';
import { Card } from '@components/common/card';
import { CloseIcon } from '@components/icons/close-icon';
import Layout from '@components/layouts/admin';
import Button from '@components/ui/button';
import Description from '@components/ui/description';
import Input from '@components/ui/input';
import Label from '@components/ui/label';
import Select from '@components/ui/select/select';

import { superAdminOnly } from '@utils/auth-utils';
import { getSubdomain } from '@utils/request-utils';
import { ROUTES } from '@utils/routes';

import { useCart } from '@contexts/quick-cart/cart.context';
import { useCustomerAddBillingAddressMutation } from '@data/customer/use-customer-add-billing-address.mutation';
import { useCustomerAddShippingAddressMutation } from '@data/customer/use-customer-add-shipping-address.mutation';
import { useCustomersQuery } from '@data/customer/use-customers.query';
import { useCreateOrderMutation } from '@data/order/use-create-order-mutation';

type ShippingAndBillingAddressFormValues = {
  address_nickname?: any;
  shipping_zip?: any;
  shipping_state?: any;
  shipping_country?: any;
  shipping_city?: any;
  shipping_address2?: any;
  shipping_address?: any;
  billing_name?: any;
  billing_phone?: any;
  billing_email?: any;
  billing_zip?: any;
  billing_state?: any;
  billing_country?: any;
  billing_city?: any;
  billing_address2?: any;
  billing_address?: any;
};

const defaultValuesShippingAddress: ShippingAndBillingAddressFormValues = {
  address_nickname: '',
  shipping_zip: '',
  shipping_state: '',
  shipping_country: '',
  shipping_city: '',
  shipping_address2: '',
  shipping_address: '',
};

const defaultValuesBillingAddress: ShippingAndBillingAddressFormValues = {
  billing_name: '',
  billing_phone: '',
  billing_email: '',
  billing_zip: '',
  billing_state: '',
  billing_country: '',
  billing_city: '',
  billing_address2: '',
  billing_address: '',
};

export default function CheckoutPage() {
  const methodsShippingAndBillingAddress =
    useForm<ShippingAndBillingAddressFormValues>({
      //@ts-ignore
      defaultValuesShippingAddress,
      defaultValuesBillingAddress,
    });

  const {
    register,
    handleSubmit,
    formState: {},
  } = methodsShippingAndBillingAddress;

  const router = useRouter();

  const { resetCart, items } = useCart();

  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  const [shippingAddress, setShippingAddress] = useState([]);
  const [billingAddress, setBillingAddress] = useState([]);

  const [customer_id, setCustomer_id] = useState();
  const [shippingAddress_id, setShippingAddress_id] = useState(null);
  const [billingAddress_id, setBillingAddress_id] = useState(null);
  const [paymentMethod_id, setPaymentMethod_id] = useState();

  const [overlay, setOverlay] = useState(false);
  const [newShippingAddressCardOpened, setNewShippingAddressCardOpened] =
    useState(false);

  const [newBillingAddressCardOpened, setNewBillingAddressCardOpened] =
    useState(false);

  let customers;

  const payments = [
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'credit-card', label: 'Credit Card' },
  ];
  const { subdomain: subdomain } = getSubdomain();

  const { data, isLoading: loading } = useCustomersQuery({
    subdomain: subdomain,
  });

  // To build the customer select input
  customers = data?.customers?.data.map((customer: any) => {
    customer.value = customer.customer_id;
    if (customer.customer_type === 'B2C') {
      customer.label = customer.first_name + ' ' + customer.last_name;
    } else {
      customer.label = customer.account_name;
    }

    return customer;
  });

  // Select the customer to get the customer ID
  function handleSelectCustomer(customer: any) {
    setCustomer_id(customer.customer_id);
    console.log(customer);
    customer.shippingAddresses = customer?.shippingAddress.map(
      (address: any) => {
        address.label = `${address.shipping_address}, ${address.shipping_zip}, ${address.shipping_city}, ${address.shipping_country}`;
        return address;
      }
    );
    customer.billingAddresses = customer?.billingAddress.map((address: any) => {
      address.label = `${address.billing_address}, ${address.billing_zip}, ${address.billing_city}, ${address.billing_country}`;
      return address;
    });
    setShippingAddresses(customer.shippingAddresses);
    setBillingAddresses(customer.billingAddresses);

    console.log(customer_id);
  }

  // Select the shipping address if a customer has an address on the info data
  function handleSelectShippingAddress(address: any) {
    setShippingAddress_id(address.value);
    setShippingAddress(address);
  }

  // Select the billing address if a customer has an address on the info data
  function handleSelectBillingAddress(address: any) {
    setBillingAddress_id(address.value);
    setBillingAddress(address);
    console.log(address);
  }

  // Select the payment method
  function handlePaymentMethod(payment: any) {
    setPaymentMethod_id(payment.value);
    console.log(payment);
  }

  // When the close button in the new shipping address card its clicked
  function handleCloseNewShippingAddressCard() {
    setNewShippingAddressCardOpened(false);
    setOverlay(false);
  }

  // When the close button in the new billing address card its clicked
  function handleCloseNewBillingAddressCard() {
    setNewBillingAddressCardOpened(false);
    setOverlay(false);
  }

  // Mutation to create a new shipping address
  const { mutate: addNewShippingAddress } =
    useCustomerAddShippingAddressMutation();

  // Mutation to create a new billing address
  const { mutate: addNewBillingAddress } =
    useCustomerAddBillingAddressMutation();

  // Mutation to create a new order
  const { mutate: createOrder } = useCreateOrderMutation();

  //
  function handleAddNewShippingAddress({
    address_nickname,
    shipping_zip,
    shipping_state,
    shipping_country,
    shipping_city,
    shipping_address2,
    shipping_address,
  }: ShippingAndBillingAddressFormValues) {
    addNewShippingAddress(
      {
        variables: {
          // @ts-ignore
          customer_id: customer_id,
          address_nickname: address_nickname,
          shipping_zip: shipping_zip,
          shipping_state: shipping_state,
          shipping_country: shipping_country,
          shipping_city: shipping_city,
          shipping_address2: shipping_address2,
          shipping_address: shipping_address,
        },
      },
      {
        onSuccess: () => {
          setNewShippingAddressCardOpened(false);
          setOverlay(false);
        },
        onError: (error: any) => {
          console.log(error);
        },
      }
    );
  }

  function handleAddNewBillingAddress({
    billing_name,
    billing_phone,
    billing_email,
    billing_zip,
    billing_state,
    billing_country,
    billing_city,
    billing_address2,
    billing_address,
  }: ShippingAndBillingAddressFormValues) {
    addNewBillingAddress(
      {
        variables: {
          // @ts-ignore
          customer_id: customer_id,
          billing_name: billing_name,
          billing_phone: billing_phone,
          billing_email: billing_email,
          billing_zip: billing_zip,
          billing_state: billing_state,
          billing_country: billing_country,
          billing_city: billing_city,
          billing_address2: billing_address2,
          billing_address: billing_address,
        },
      },
      {
        onSuccess: () => {
          setNewBillingAddressCardOpened(false);
          setOverlay(false);
          // console.log(data);
        },
        onError: (error: any) => {
          console.log(error);
          // setErrorMessage(error.message);
        },
      }
    );
  }

  let orderItens: {
    product_id: string | number;
    quantity: number | undefined;
  }[] = [];

  items?.map((item) =>
    orderItens.push({
      product_id: item?.id,
      quantity: item?.quantity,
    })
  );

  const orderData = {
    customer_id: customer_id,
    paymentMethod_id: paymentMethod_id,
    orderItens: orderItens,
    shippingAddress: shippingAddress,
    billingAddress: billingAddress,
    shipment: {
      shipment_carrier: null,
      shipment_date: null,
      shipment_cost: 0.0,
      tracking_id: null,
    },
    payment: {
      payment_method: null,
      payment_date: null,
    },
    contact: {
      first_name: null,
      last_name: null,
      dial: null,
      phone_number: null,
    },
  };

  function handleCreateOrder() {
    createOrder(
      {
        variables: {
          // @ts-ignore
          orderData,
        },
      },
      {
        onSuccess: () => {
          resetCart();
          router.push(`${ROUTES.ORDERS}`);
        },
        onError: (error: any) => {
          console.log(error);
          // setErrorMessage(error.message);
        },
      }
    );
  }

  return (
    <>
      <div
        className={`fixed h-full w-full bg-white opacity-50 ${
          overlay ? 'z-30' : '-z-10'
        }`}
      ></div>

      {/* Page Header Section */}

      <CreatePageHeader title={'Orders'} subTitle={'Add new order'} />

      <div className='mb-4 flex justify-end gap-2 text-end lg:sticky lg:right-[25px] lg:top-[190px] lg:z-[30] lg:px-4'>
        <Button variant='outline' onClick={router.back} type='button'>
          {'Cancel'}
        </Button>

        <Button onClick={handleCreateOrder} disabled={!customer_id}>
          {'Place Order'}
        </Button>
      </div>

      {/* Steps Section */}

      <div className='my-5 flex flex-wrap sm:my-8 lg:mt-[160px] lg:px-4'>
        <Description
          title='Customer'
          details='Select a customer'
          className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5'
        />

        <Card className='w-full rounded-lg border px-4 pt-8 pb-4 sm:w-8/12 md:w-2/3'>
          <div className=''>
            <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
              Customer Account*
            </Label>
            <Select
              options={customers}
              onChange={handleSelectCustomer}
              name='orderBy'
              placeholder='Select the customer'
              isLoading={loading}
            />
            <p className='mt-2 text-xs text-[#CCCCCC]'>
              Select the brand that you’re going to create a new product.
            </p>
          </div>
        </Card>
      </div>

      {/* Shipping Info */}

      {customer_id && (
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Shipping Info'
            details='Customer basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          {customer_id && !newShippingAddressCardOpened && (
            <div className='md:w-4/3 w-full sm:w-8/12 '>
              <Card className='divide-y rounded-lg border '>
                <div className='mb-4 px-4 pt-8'>
                  <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                    Shipping Address*
                  </Label>
                  <div className='flex'>
                    <div className='w-full sm:w-full md:w-full'>
                      <Select
                        options={shippingAddresses}
                        onChange={handleSelectShippingAddress}
                        name='orderBy'
                        placeholder='Select the shipping address'
                      />
                    </div>
                  </div>

                  <p className='mt-2 text-xs text-[#CCCCCC]'>
                    Select the shipping address
                  </p>
                </div>
              </Card>
            </div>
          )}

          {newShippingAddressCardOpened && (
            <div className='z-40 w-full sm:w-8/12 md:w-2/3 '>
              <Card className='divide-y rounded-lg border border-theme-1 '>
                <div className='flex flex-row-reverse p-2'>
                  <button
                    className='bg-primary inline-flex py-2'
                    onClick={handleCloseNewShippingAddressCard}
                  >
                    <CloseIcon width={19} />
                  </button>
                </div>
                <FormProvider {...methodsShippingAndBillingAddress}>
                  <form onSubmit={handleSubmit(handleAddNewShippingAddress)}>
                    <Input
                      label='Address Nickname*'
                      {...register('address_nickname')}
                      type='text'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Ex: San Francisco St., 27'
                      placeholder='Ex: Company’s Name, Branch 3, etc.'
                    />

                    <Input
                      label='Address 1*'
                      {...register('shipping_address')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Ex: 3rd Floor.'
                      placeholder='Address 1'
                    />

                    <Input
                      label='Address 2 (opcional)'
                      {...register('shipping_address2')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Secod line of addres'
                    />

                    <Input
                      label='City*'
                      {...register('shipping_city')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Inform a city for Shipping'
                      placeholder='Inform a City'
                    />

                    <Input
                      label='Country*'
                      {...register('shipping_country')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Ex: Lisboa, PT'
                    />

                    <Input
                      label='State/ Province*'
                      {...register('shipping_state')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Ex: Lisboa, PT'
                    />

                    <Input
                      label='Zip/ Postal Code*'
                      {...register('shipping_zip')}
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='00000'
                    />
                    <div className='flex p-4'>
                      <Button className='w-full' type='submit'>
                        Add a New Address
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* Billing Info */}
      {customer_id && (
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Billing Info'
            details='Customer basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          {customer_id && !newBillingAddressCardOpened && (
            <div className='w-full sm:w-8/12 md:w-2/3'>
              <Card className='divide-y rounded-lg border '>
                <div className='mb-4 px-4 pt-8'>
                  <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                    Billing Address*
                  </Label>
                  <div className='flex'>
                    <div className='w-full md:w-full'>
                      <Select
                        options={billingAddresses}
                        onChange={handleSelectBillingAddress}
                        name='orderBy'
                        placeholder='Select the billing address'
                      />
                    </div>
                  </div>

                  <p className='mt-2 text-xs text-[#CCCCCC]'>
                    Select the billing address
                  </p>
                </div>
              </Card>
            </div>
          )}

          {newBillingAddressCardOpened && (
            <div className='z-40 w-full sm:w-8/12 md:w-2/3 '>
              <Card className='divide-y rounded-lg border-2 border-theme-1 '>
                <div className='flex flex-row-reverse p-2'>
                  <button
                    className='bg-primary inline-flex py-2'
                    onClick={handleCloseNewBillingAddressCard}
                  >
                    <CloseIcon width={19} />
                  </button>
                </div>

                <FormProvider {...methodsShippingAndBillingAddress}>
                  <form onSubmit={handleSubmit(handleAddNewBillingAddress)}>
                    <Input
                      label='Name*'
                      {...register('billing_name')}
                      name='billing_name'
                      type='text'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Ex: San Francisco St., 27'
                      placeholder='Ex: Company’s Name, Branch 3, etc.'
                    />

                    <Input
                      label='Phone*'
                      {...register('billing_phone')}
                      name='billing_phone'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Ex: 3rd Floor.'
                      placeholder='Address 1'
                    />

                    <Input
                      label='E-mail*'
                      {...register('billing_email')}
                      name='billing_email'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Ex: 3rd Floor.'
                      placeholder='Address 1'
                    />

                    <Input
                      label='Address'
                      {...register('billing_address')}
                      name='billing_address'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Secod line of addres'
                    />

                    <Input
                      label='Address 2 (opcional)'
                      {...register('billing_address2')}
                      name='billing_address2'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Secod line of addres'
                    />

                    <Input
                      label='City*'
                      {...register('billing_city')}
                      name='billing_city'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Inform a city for Shipping'
                      placeholder='Inform a City'
                    />

                    <Input
                      label='Country*'
                      {...register('billing_country')}
                      name='billing_country'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Ex: Lisboa, PT'
                    />

                    <Input
                      label='State/ Province*'
                      {...register('billing_state')}
                      name='billing_state'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='Ex: Lisboa, PT'
                    />

                    <Input
                      label='Zip/ Postal Code*'
                      {...register('billing_zip')}
                      name='billing_zip'
                      variant='outline'
                      className='mb-4 px-4 pt-8'
                      note='Subtext Here'
                      placeholder='00000'
                    />
                    <div className='flex p-4'>
                      <Button className='w-full' type='submit'>
                        Add a New Address
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </Card>
            </div>
          )}
        </div>
      )}

      {customer_id && (
        <div className='my-5 flex flex-wrap sm:my-8 lg:px-4'>
          <Description
            title='Payment'
            details='Select a payment'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pr-4 md:w-1/3 md:pr-5'
          />

          <Card className='w-full rounded-lg border px-4 pt-8 pb-4 sm:w-8/12 md:w-2/3'>
            <div className=''>
              <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                Payment Method*
              </Label>
              <Select
                options={payments}
                onChange={handlePaymentMethod}
                name='orderBy'
                placeholder='Select the payment method'
              />
              <p className='mt-2 text-xs text-[#CCCCCC]'>
                Select the brand that you’re going to create a new product.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

CheckoutPage.authenticate = {
  permissions: superAdminOnly,
};
CheckoutPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};
