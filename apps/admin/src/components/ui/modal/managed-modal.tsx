import dynamic from 'next/dynamic';

import Modal from '@components/ui/modal/modal';

import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context';

const BanCustomerView = dynamic(() => import('@components/user/user-ban-view'));
const UserWalletPointsAddView = dynamic(
  () => import('@components/user/user-wallet-points-add-view')
);
const MakeAdminView = dynamic(() => import('@components/user/make-admin-view'));
const ShippingDeleteView = dynamic(
  () => import('@components/shipping/shipping-delete-view')
);
const CategoryDeleteView = dynamic(
  () => import('@components/category/category-delete-view')
);

// ** IMPORTS FOR DELETE REQUEST ** //
const ProductDeleteView = dynamic(
  () => import('@components/product/components/product-delete-view')
);
const UsersDeleteView = dynamic(
  () => import('@components/users/user-delete-view')
);
const BrandDeleteView = dynamic(
  () => import('@components/brands/brand-delete-view')
);

const PayoutDeleteView = dynamic(
  () => import('@components/payouts/payouts-delete-view')
);
// DELETE CUSTOMER ADDRESS
const CustomerDeleteBillingAddressView = dynamic(
  () =>
    import(
      '@components/customer/components/address/customer-billing-address-delete-view'
    )
);
const CustomerDeleteShippingAddressView = dynamic(
  () =>
    import(
      '@components/customer/components/address/customer-shipping-address-delete-view'
    )
);
const BrandOnboardingDeleteView = dynamic(
  () => import('@components/onboarding/brand/brand-onboarding-delete-view')
);
const CustomerDeleteView = dynamic(
  () => import('@components/customer/customer-delete-view')
);
const OrderDeleteView = dynamic(
  () => import('@components/order/order-delete-view')
);
const TypeDeleteView = dynamic(
  () => import('@components/group/group-delete-view')
);
const ApproveShopView = dynamic(
  () => import('@components/shop/approve-shop-view')
);
const DisApproveShopView = dynamic(
  () => import('@components/shop/disapprove-shop-view')
);
const RemoveStaffView = dynamic(
  () => import('@components/shop/staff-delete-view')
);
const RefundImageModal = dynamic(
  () => import('@components/refund/refund-image-modal')
);
const CreateOrUpdateAddressForm = dynamic(
  () => import('@components/address/create-or-update')
);
const AddOrUpdateCheckoutContact = dynamic(
  () => import('@components/checkout/contact/add-or-update')
);
const SelectCustomer = dynamic(
  () => import('@components/checkout/customer/select-customer')
);
const ProductVariation = dynamic(
  () => import('@components/shop/variation/variation')
);
// ** IMPORTS FOR MODAL MOBILE REQUEST ** //
const ProductCardModal = dynamic(
  () => import('@components/product/components/modal-product-card')
);
const CustomerCardModal = dynamic(
  () => import('@components/customer/modal-customer-card')
);
const OrderCardModal = dynamic(
  () => import('@components/order/modal-order-card')
);
const ChangeOrderStatusModal = dynamic(
  () => import('@components/order/order-change-status')
);
const VideoModal = dynamic(
  () => import('@components/landing-page/video/video-modal')
);
function renderModal(view: MODAL_VIEWS | undefined, data: any) {
  switch (view) {
    case 'DELETE_PRODUCT':
      return <ProductDeleteView />;
    case 'DELETE_ONBOARDING_BRAND':
      return <BrandOnboardingDeleteView />;
    case 'DELETE_BRAND':
      return <BrandDeleteView />;
    case 'DELETE_USERS':
      return <UsersDeleteView />;
    case 'DELETE_CUSTOMER':
      return <CustomerDeleteView />;
    case 'DELETE_TYPE':
      return <TypeDeleteView />;
    case 'DELETE_BILLING_ADDRESS':
      return <CustomerDeleteBillingAddressView />;
    case 'DELETE_SHIPPING_ADDRESS':
      return <CustomerDeleteShippingAddressView />;
    case 'DELETE_CATEGORY':
      return <CategoryDeleteView />;
    case 'DELETE_ORDER':
      return <OrderDeleteView />;
    case 'DELETE_SHIPPING':
      return <ShippingDeleteView />;
    case 'DELETE_PAYOUTS':
      return <PayoutDeleteView />;
    // case "DELETE_ORDER_STATUS":
    //   return <OrderStatusDeleteView />;
    case 'BAN_CUSTOMER':
      return <BanCustomerView />;
    case 'SHOP_APPROVE_VIEW':
      return <ApproveShopView />;
    case 'SHOP_DISAPPROVE_VIEW':
      return <DisApproveShopView />;
    case 'DELETE_STAFF':
      return <RemoveStaffView />;
    case 'ADD_OR_UPDATE_ADDRESS':
      return <CreateOrUpdateAddressForm />;
    case 'ADD_OR_UPDATE_CHECKOUT_CONTACT':
      return <AddOrUpdateCheckoutContact />;
    case 'REFUND_IMAGE_POPOVER':
      return <RefundImageModal />;
    case 'MAKE_ADMIN':
      return <MakeAdminView />;
    case 'ADD_WALLET_POINTS':
      return <UserWalletPointsAddView />;
    case 'SELECT_PRODUCT_VARIATION':
      return <ProductVariation productSlug={data} />;
    case 'SELECT_CUSTOMER':
      return <SelectCustomer />;
    case 'MOBILE_PRODUCT_OPEN':
      return <ProductCardModal productSlug={data} />;
    case 'MOBILE_CUSTOMER_OPEN':
      return <CustomerCardModal customerId={data} />;
    case 'MOBILE_ORDER_OPEN':
      return <OrderCardModal orderId={data} />;
    case 'VIDEO_PLAYER':
      return <VideoModal />;
    case 'CHANGE_ORDER_STATUS':
      return <ChangeOrderStatusModal />;
    default:
      return null;
  }
}

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {renderModal(view, data)}
    </Modal>
  );
};

export default ManagedModal;
