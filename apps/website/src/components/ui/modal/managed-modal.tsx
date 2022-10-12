import Modal from '@components/ui/modal/modal';
import dynamic from 'next/dynamic';

import { MODAL_VIEWS, useModalAction, useModalState } from './modal.context';

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
    case 'DELETE_CUSTOMER':
      return <CustomerDeleteView />;
    case 'DELETE_TYPE':
      return <TypeDeleteView />;
    case 'DELETE_ATTRIBUTE':
      return <AttributeDeleteView />;
    case 'DELETE_CATEGORY':
      return <CategoryDeleteView />;
    case 'DELETE_ORDER':
      return <OrderDeleteView />;
    case 'DELETE_COUPON':
      return <CouponDeleteView />;
    case 'DELETE_TAX':
      return <TaxDeleteView />;
    case 'DELETE_SHIPPING':
      return <ShippingDeleteView />;
    // case "DELETE_ORDER_STATUS":
    //   return <OrderStatusDeleteView />;
    case 'DELETE_TAG':
      return <TagDeleteView />;
    case 'DELETE_MANUFACTURER':
      return <ManufacturerDeleteView />;
    case 'DELETE_AUTHOR':
      return <AuthorDeleteView />;
    case 'BAN_CUSTOMER':
      return <BanCustomerView />;
    case 'SHOP_APPROVE_VIEW':
      return <ApproveShopView />;
    case 'SHOP_DISAPPROVE_VIEW':
      return <DisApproveShopView />;
    case 'DELETE_STAFF':
      return <RemoveStaffView />;
    case 'UPDATE_REFUND':
      return <UpdateRefundConfirmationView />;
    case 'ADD_OR_UPDATE_ADDRESS':
      return <CreateOrUpdateAddressForm />;
    case 'ADD_OR_UPDATE_CHECKOUT_CONTACT':
      return <AddOrUpdateCheckoutContact />;
    case 'REFUND_IMAGE_POPOVER':
      return <RefundImageModal />;
    case 'MAKE_ADMIN':
      return <MakeAdminView />;
    case 'EXPORT_IMPORT_PRODUCT':
      return <ExportImportView />;
    case 'EXPORT_IMPORT_ATTRIBUTE':
      return <AttributeExportImport />;
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
