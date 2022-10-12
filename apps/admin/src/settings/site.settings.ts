import {
  adminAndOwnerOnly,
  adminOwnerAndStaffOnly,
  superAdminAndAdminAndBrandOnly,
  superAdminOnly,
} from '@utils/auth-utils';
import { ROUTES } from '@utils/routes';

export const siteSettings = {
  name: 'Lexir',
  description: '',
  logo: {
    url: '/logo.svg',
    alt: 'Lexir',
    href: '/',
    width: 96,
    height: 32,
  },
  defaultLanguage: 'en',
  author: {
    name: '',
    websiteUrl: '',
    address: '',
  },
  headerLinks: [],
  authorizedLinks: [
   
    {
      href: ROUTES.LOGOUT,
      labelTransKey: 'LOGOUT',
    },
  ],
  currencyCode: 'USD',
  sidebarLinks: {
    admin: [
      
      {
        href: ROUTES.DASHBOARD,
        label: 'Dashboard',
        icon: 'DashboardIcon',
        iconActivated: 'DashboardIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
      {
        href: ROUTES.ORDERS,
        label: 'Orders',
        icon: 'OrdersIcon',
        iconActivated: 'OrdersIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
      {
        href: ROUTES.BRANDS,
        label: 'Brands',
        icon: 'TagIcon',
        iconActivated: 'TagIconActivated',
        permissions: superAdminOnly,
      },
      {
        href: ROUTES.CUSTOMERS,
        label: 'Customers',
        icon: 'UsersIcon',
        iconActivated: 'UsersIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },

      {
        href: ROUTES.PRODUCTS,
        label: 'Products',
        icon: 'ProductsIcon',
        iconActivated: 'ProductsIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
      {
        href: ROUTES.STOCKS,
        label: 'Stock',
        icon: 'StockIcon',
        iconActivated: 'StockIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
      {
        href: ROUTES.USERS,
        label: 'Users',
        icon: 'UsersIcon',
        iconActivated: 'UsersIconActivated',
        permissions: superAdminOnly,
      },
      {
        href: ROUTES.PAYOUTS,
        label: 'Payouts',
        icon: 'PayoutsIcon',
        iconActivated: 'PayoutsIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
      {
        href: ROUTES.INTEGRATIONS,
        label: 'Integrations (Coming soon)',
        icon: 'PlugIcon',
        iconActivated: 'PlugIconActivated',
        permissions: superAdminAndAdminAndBrandOnly,
      },
     
    ],
    shop: [
      {
        href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
        label: 'sidebar-nav-item-dashboard',
        icon: 'DashboardIcon',
        permissions: adminOwnerAndStaffOnly,
      },
     
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: 'sidebar-nav-item-products',
        icon: 'ProductsIcon',
        permissions: adminOwnerAndStaffOnly,
      },
     
      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: 'sidebar-nav-item-orders',
        icon: 'OrdersIcon',
        permissions: adminOwnerAndStaffOnly,
      },
     
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: 'sidebar-nav-item-staffs',
        icon: 'UsersIcon',
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: 'sidebar-nav-item-withdraws',
        icon: 'AttributeIcon',
        permissions: adminAndOwnerOnly,
      },
    ],
  },
  product: {
    placeholder: '/product-placeholder.svg',
  },
  avatar: {
    placeholder: '/avatar-placeholder.svg',
  },
};
