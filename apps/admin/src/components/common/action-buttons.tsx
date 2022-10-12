import { useRef, useState } from 'react';

import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { AdminIcon } from '@components/icons/admin-icon';
import { BanUser } from '@components/icons/ban-user';
import { CheckMarkCircle } from '@components/icons/checkmark-circle';
import { ChevronRight } from '@components/icons/chevron-right';
import { CloseFillIcon } from '@components/icons/close-fill';
import EditIcon from '@components/icons/edit';
import Edit from '@components/icons/edit';
import { Eye } from '@components/icons/eye-icon';
import { IconEmail } from '@components/icons/icon-email';
import { IconPhone } from '@components/icons/icon-phone';
import Trash from '@components/icons/trash';
import { WalletPointsIcon } from '@components/icons/wallet-point';
import Link from '@components/ui/link';
import { useModalAction } from '@components/ui/modal/modal.context';

import menuVertical from '@assets/productList/menu-meatball.svg';

type Props = {
  id: string;
  chevron?: boolean;
  deleteModalView?: string | any;
  editUrl?: string;
  detailsUrl?: string;
  contactPhone?: string;
  contactEmail?: string;
  isUserActive?: boolean;
  userStatus?: boolean;
  isShopActive?: boolean;
  approveButton?: boolean;
  showAddWalletPoints?: boolean;
  changeRefundStatus?: boolean;
  showMakeAdminButton?: boolean;
  editUrlDropDown?: string;
  editUrlDropDownText?: string;
  editText?: string;
};

const ActionButtons = ({
  chevron,
  id,
  deleteModalView,
  editUrl,
  editUrlDropDown,
  editUrlDropDownText = 'Edit',
  detailsUrl,
  contactPhone,
  contactEmail,
  userStatus = false,
  isUserActive = false,
  isShopActive,
  approveButton = false,
  showAddWalletPoints = false,
  changeRefundStatus = false,
  showMakeAdminButton = false,
}: Props) => {
  const [dropdownState, setDropdownState] = useState(false);
  const dropdownRef = useRef(null);
  const closeOpenMenus = (e: { target: any }) => {
    if (
      dropdownRef.current &&
      dropdownState &&
      !dropdownRef.current.contains(e.target)
    ) {
      setDropdownState(false);
    }
  };
  document.addEventListener('mousedown', closeOpenMenus);

  const { t } = useTranslation();
  const { openModal } = useModalAction();
  function handleDelete() {
    openModal(deleteModalView, id);
  }
  function handleUserStatus(type: string) {
    openModal('BAN_CUSTOMER', { id, type });
  }
  function handleAddWalletPoints() {
    openModal('ADD_WALLET_POINTS', id);
  }
  function handleMakeAdmin() {
    openModal('MAKE_ADMIN', id);
  }
  function handleUpdateRefundStatus() {
    openModal('UPDATE_REFUND', id);
  }
  function handleShopStatus(status: boolean) {
    if (status === true) {
      openModal('SHOP_APPROVE_VIEW', id);
    } else {
      openModal('SHOP_DISAPPROVE_VIEW', id);
    }
  }

  return (
    <div className='inline-flex w-auto items-center space-s-5'>
      {showMakeAdminButton && (
        <button
          onClick={handleMakeAdmin}
          className='text-accent transition duration-200 hover:text-accent-hover focus:outline-none'
          title={t('common:text-make-admin')}
        >
          <AdminIcon width={18} />
        </button>
      )}
      {showAddWalletPoints && (
        <button
          onClick={handleAddWalletPoints}
          className='text-accent transition duration-200 hover:text-accent-hover focus:outline-none'
          title={t('common:text-add-wallet-points')}
        >
          <WalletPointsIcon width={22} />
        </button>
      )}

      {changeRefundStatus && (
        <button
          onClick={handleUpdateRefundStatus}
          className='text-accent transition duration-200 hover:text-accent-hover focus:outline-none'
          title={t('common:text-change-refund-status')}
        >
          <CheckMarkCircle width={20} />
        </button>
      )}
      {/* {deleteModalView && (
        <button
          onClick={handleDelete}
          className="text-red-500 transition duration-200 hover:text-red-600 focus:outline-none"
          title={t("common:text-delete")}
        >
          <Trash width={16} />
        </button>
      )} */}
      {approveButton &&
        (!isShopActive ? (
          <button
            onClick={() => handleShopStatus(true)}
            className='text-accent transition duration-200 hover:text-accent-hover focus:outline-none'
            title={t('common:text-approve-shop')}
          >
            <CheckMarkCircle width={20} />
          </button>
        ) : (
          <button
            onClick={() => handleShopStatus(false)}
            className='text-red-500 transition duration-200 hover:text-red-600 focus:outline-none'
            title={t('common:text-disapprove-shop')}
          >
            <CloseFillIcon width={20} />
          </button>
        ))}
      {userStatus && (
        <>
          {isUserActive ? (
            <button
              onClick={() => handleUserStatus('ban')}
              className='text-red-500 transition duration-200 hover:text-red-600 focus:outline-none'
              title={t('common:text-ban-user')}
            >
              <BanUser width={20} />
            </button>
          ) : (
            <button
              onClick={() => handleUserStatus('active')}
              className='text-accent transition duration-200 hover:text-accent focus:outline-none'
              title={t('common:text-activate-user')}
            >
              <CheckMarkCircle width={20} />
            </button>
          )}
        </>
      )}
      {contactPhone && (
        <div className='flex flex-wrap justify-center'>
          <div className='group relative inline-block'>
            <button className='bg-primary inline-flex py-2 '>
              <IconPhone width={19} />
            </button>
            <div
              className='absolute top-full left-1/2 z-30  -translate-x-1/2 whitespace-nowrap  
            border bg-white py-[6px] px-4 text-sm text-[#2D2D2D] opacity-0 group-hover:opacity-100'
            >
              {contactPhone}
            </div>
          </div>
        </div>
      )}
      {contactEmail && (
        <div className='flex flex-wrap justify-center'>
          <div className='group relative inline-block'>
            <button className='bg-primary inline-flex py-2 '>
              <IconEmail width={19} />
            </button>
            <div
              className='absolute top-full left-1/2 z-30  -translate-x-1/2 whitespace-nowrap  
              border bg-white py-[6px] px-4 text-sm text-[#2D2D2D] opacity-0 group-hover:opacity-100'
            >
              {contactEmail}
            </div>
          </div>
        </div>
      )}

      {editUrl && (
        <Link
          href={editUrl}
          className='text-base transition duration-200 hover:text-heading'
          title={t('common:text-edit')}
        >
          <EditIcon width={16} />
        </Link>
      )}
      {editUrlDropDown && (
        <div className='relative overflow-visible'>
          {dropdownState ? (
            <div
              className='absolute -left-52 -top-14 z-50 w-52 overflow-visible drop-shadow-lg'
              ref={dropdownRef}
            >
              <div className=' z-50 h-12 items-center overflow-visible border-b bg-white hover:bg-[#F9F9F9]'>
                <Link
                  href={editUrlDropDown}
                  className='flex h-full w-full flex-row items-center gap-5 overflow-visible pl-4'
                  // title={t('common:text-edit')}
                >
                  <Edit width={24} heigth={24} />
                  <span className='flex items-center'>
                    {editUrlDropDownText}
                  </span>
                </Link>
              </div>
              {deleteModalView && (
                <div
                  className='z-50 flex h-12 items-center overflow-visible bg-white hover:bg-[#F9F9F9]'
                  onClick={handleDelete}
                >
                  <div className='flex h-full w-full flex-row items-center gap-5 overflow-visible pl-4'>
                    <Trash width={24} heigth={20} />
                    <span className='flex items-center'> Delete</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <button
            onClick={() => setDropdownState(!dropdownState)}
            className='flex w-8 justify-center'
          >
            <Image src={menuVertical} alt='Local Selection' />
          </button>
        </div>
      )}
      {detailsUrl && !chevron && (
        <Link
          href={detailsUrl}
          className='ml-2 text-base transition duration-200 hover:text-heading'
          title={t('common:text-view')}
        >
          <Eye width={24} />
        </Link>
      )}
      {detailsUrl && chevron && (
        <Link
          href={detailsUrl}
          className='ml-2 text-base transition duration-200 hover:text-heading'
          title={t('common:text-view')}
        >
          <ChevronRight width={24} />
        </Link>
      )}
    </div>
  );
};

export default ActionButtons;
