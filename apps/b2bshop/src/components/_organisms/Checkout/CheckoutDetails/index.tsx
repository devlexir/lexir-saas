import BillingAddresses from '@components/_molecules/Addresses/BillingAddresses';
import ShippingAddresses from '@components/_molecules/Addresses/ShippingAddresses';
import ContactNumber from '@components/_molecules/Checkout/CheckoutDetails/ContactNumber';
import DeliveryInstructions from '@components/_molecules/Checkout/CheckoutDetails/DeliveryInstructions';
import PaymentOptions from '@components/_molecules/Checkout/CheckoutDetails/PaymentOptions';
import EditIcon from '@components/icons/edit-icon';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import { useContactsQuery } from '@data/contacts/contacts.query';
import { useCreateOrderMutation } from '@data/order/use-create-order-mutation';
import { useEffect, useState } from 'react';

{
  /* Acordion Panel */
}
const AcordionPanel = ({ item, opened, setOpened, continueBtn }: any) => {
  const [stepSelectedIndex, setStepSelectedIndex] = useState(1);

  const changeItem = (i: any) => {
    setStepSelectedIndex(i);
    setOpened(i);
  };

  return (
    <div key={item.id}>
      <AccordionHeading
        item={item}
        stepSelectedIndex={stepSelectedIndex}
        changeItem={changeItem}
      />
      <AccordionContent
        item={item}
        stepSelectedIndex={stepSelectedIndex}
        changeItem={changeItem}
        opened={opened}
        continueBtn={continueBtn}
      />
    </div>
  );
};

{
  /* Acordion Heading */
}
const AccordionHeading = ({ item, stepSelectedIndex, changeItem }: any) => {
  return (
    <div
      id={`index_${item.id}`}
      className='accordion__button flex cursor-pointer items-center py-4 pb-6 px-8'
    >
      <span className='mr-4 flex h-8 w-8 items-center justify-center rounded-lg border border-brand-muted-two font-bold text-brand-dark ltr:mr-3 rtl:ml-3'>
        {item.id}
      </span>
      <div className='flex w-full flex-row justify-between'>
        <Heading variant='titleMedium'>{item?.title}</Heading>
        {stepSelectedIndex > item.id ? (
          <button
            className='flex items-center gap-x-2 text-brand-dark'
            onClick={() => {
              changeItem(item.id);
            }}
          >
            <EditIcon />
            Edit
          </button>
        ) : null}
      </div>
    </div>
  );
};

{
  /* Acordion Content */
}
const AccordionContent = ({ item, changeItem, opened, continueBtn }: any) => {
  return (
    <div
      data-aria-label={`index_${item.id}`}
      className={`pl-12 ${
        opened === item.id ? 'h-full' : 'h-0'
      } overflow-hidden transition-[height] duration-0 ease-in`}
    >
      <div className='mb-6 sm:px-8'>{item?.children}</div>

      {continueBtn ? (
        <div className='flex flex-row w-full justify-end sm:px-8'>
          <div className='ltr:text-right rtl:text-left'>
            <Button
              onClick={() => {
                changeItem(item.id + 1);
              }}
              variant='primary'
              className='font-[14px] rounded bg-brand px-4 py-3 font-semibold text-brand-light'
            >
              {'Continue'}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

{
  /* Checkout Details */
}
const CheckoutDetails = ({ details }: any) => {
  const { mutate: createOrder } = useCreateOrderMutation();

  const orderData = {
    customer_id: 1,
    paymentMethod_id: null,
    orderItens: [
      {
        order_id: 1001,
        subdomain: 'dss',
        sku: 'dss',
        qty: 10,
        unit_price: 10,
        discount_rate: 0,
        price_w_discount: 0,
        vat: 0,
        price_w_vat: 0,
        total: 0,
        gross_sales: 0,
        product_name: 'dss',
        year: '2022',
        month: '09',
        imageSRC: null,
      },
    ],
    shippingAddress: [
      {
        address_nickname: 'sdfsdf',
        shipping_address: 'sdfsdf',
        shipping_address2: 'sdfsdf',
        shipping_zip: 'sdfsdf',
        shipping_state: 'sdfsdf',
        shipping_country: 'sdfsdf',
        shipping_city: 'sdfsdf',
      },
    ],
    billingAddress: [
      {
        billing_name: 'sdfsdf',
        billing_phone: 'sdfsdf',
        billing_email: 'sdfsdf',
        billing_zip: 'sdfsdf',
        billing_state: 'sdfsdf',
        billing_country: 'sdfsdf',
        billing_city: 'sdfsdf',
        billing_address2: 'sdfsdf',
        billing_address: 'sdfsdf',
      },
    ],
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
          orderData,
        },
      },
      {
        onSuccess: ({ data }: any) => {},
        onError: (error: any) => {},
      }
    );
  }

  /*
   * JPCARVALHO | 20-09-2022 | Solved ✅ | Tested ✅
   * Contacts
   */
  const { data: contactsQueryResult } = useContactsQuery({});
  const [contacts, setContacts] = useState([]);

  const [contactNumber, setContactNumber] = useState(null);

  useEffect(() => {
    setContacts(contactsQueryResult?.contacts.data);
    setContactNumber(
      contactsQueryResult?.contacts.data.filter(
        (contact: any) => contact.primary === true
      )[0]?.number
    );
  }, [contactsQueryResult]);

  /*
   * JPCARVALHO | 20-09-2022
   * Shipping Addresses
   */

  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);

  // shippingAddresses[0].address_nickname

  const [shippingAddresses, setShippingAddresses] = useState([
    {
      address_nickname: 'Nickname A',
      address_1: 'Street Address',
      address_2: 'sdfsdfs',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_nickname: 'Nickname B',
      address_1: 'Street Address',
      address_2: 'sdfsdf',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_nickname: 'Nickname C',
      address_1: 'Street Address',
      address_2: 'sdfsd',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
  ]);

  /*
   * JPCARVALHO | 20-09-2022
   * Billing Addresses
   */

  const [billingAddresses, setBillingAddresses] = useState([
    {
      address_companyname: 'A',
      address_nickname: 'Nickname A',
      address_1: 'Street Address',
      address_2: 'sdfsdfs',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_companyname: 'B',
      address_nickname: 'Nickname B',
      address_1: 'Street Address',
      address_2: 'sdfsdf',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
    {
      address_companyname: 'C',
      address_nickname: 'Nickname C',
      address_1: 'Street Address',
      address_2: 'sdfsd',
      address_country: 'Portugal',
      address_city: 'Vila do Conde',
      address_postalcode: '4485-581',
    },
  ]);

  const [selectedBillingAddress, setSelectedBillingAddress] = useState(
    billingAddresses[0].address_nickname
  );

  const [paymentOption, setPaymentOption] = useState('Direct Debit');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const [placeOrderBtnDisabled, setPlaceOrderBtnDisabled] = useState(true);

  const [opened, setOpened] = useState(1); // Open in first place the delivery address tab

  // Populate details variable with form data
  useEffect(() => {
    details = {
      shippingAddress: selectedShippingAddress,
      billingAddress: selectedBillingAddress,
      contactNumber: contactNumber,
      paymentOption: paymentOption,
      deliveryInstructions: deliveryInstructions,
    };
  }, [
    selectedShippingAddress,
    selectedBillingAddress,
    contactNumber,
    paymentOption,
    deliveryInstructions,
  ]);

  // If the fields are filled, place order it's possible
  useEffect(() => {
    if (
      selectedShippingAddress &&
      selectedBillingAddress &&
      contactNumber &&
      paymentOption &&
      opened === 5
    ) {
      setPlaceOrderBtnDisabled(false);
    }
  }),
    [opened];

  return (
    <div className='rounded-md border border-border-base text-brand-light'>
      <AcordionPanel
        item={{
          id: 1,
          title: 'Delivery Address',
          children: (
            <ShippingAddresses
              addresses={shippingAddresses}
              selectedShippingAddress={selectedShippingAddress}
              setSelectedShippingAddress={setSelectedShippingAddress}
            />
          ),
        }}
        index={1}
        opened={opened}
        setOpened={setOpened}
        continueBtn={true}
      />
      <AcordionPanel
        item={{
          id: 2,
          title: 'Billing Address',
          children: (
            <BillingAddresses
              addresses={billingAddresses}
              selectedBillingAddress={selectedBillingAddress}
              setSelectedBillingAddress={setSelectedBillingAddress}
            />
          ),
        }}
        index={2}
        opened={opened}
        setOpened={setOpened}
        continueBtn={true}
      />
      <AcordionPanel
        item={{
          id: 3,
          title: 'Contact Number',
          children: (
            <ContactNumber
              contacts={contacts}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
            />
          ),
        }}
        index={3}
        opened={opened}
        setOpened={setOpened}
        continueBtn={true}
      />
      <AcordionPanel
        item={{
          id: 4,
          title: 'Payment Option',
          children: (
            <PaymentOptions
              paymentOption={paymentOption}
              setPaymentOption={setPaymentOption}
            />
          ),
        }}
        index={4}
        opened={opened}
        setOpened={setOpened}
        continueBtn={true}
      />
      <AcordionPanel
        item={{
          id: 5,
          title: 'Delivery Instructions (optional)',
          children: (
            <DeliveryInstructions
              deliveryInstructions={deliveryInstructions}
              setDeliveryInstructions={setDeliveryInstructions}
            />
          ),
        }}
        index={5}
        opened={opened}
        setOpened={setOpened}
        continueBtn={false}
      />
      <div className={`flex flex-row w-full justify-end pr-8 pb-8`}>
        <Button
          variant='primary'
          disabled={placeOrderBtnDisabled}
          onClick={() => {
            handleCreateOrder();
          }}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
