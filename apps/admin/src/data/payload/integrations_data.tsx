import { BraintreeLogo } from '@assets/integrations/logos/braintree-logo';
import { ChargebeeLogo } from '@assets/integrations/logos/chargebee-logo';
import { CheckoutLogo } from '@assets/integrations/logos/checkout.com-logo';
import { ClosecrmLogo } from '@assets/integrations/logos/closecrm-logo';
import { FacebookAdsLogo } from '@assets/integrations/logos/facebook-ads-logo';
import { GoogleAdsLogo } from '@assets/integrations/logos/google-ads-logo';
import { GoogleAnalyticsLogo } from '@assets/integrations/logos/google-analytics-logo';
import { GoogleShoppingLogo } from '@assets/integrations/logos/google-shopping-logo';
import { HootsuiteLogo } from '@assets/integrations/logos/hootsuite-logo';
import { HubspotLogo } from '@assets/integrations/logos/hubspot-logo';
import { MagentoLogo } from '@assets/integrations/logos/magento-logo';
import { PaypalLogo } from '@assets/integrations/logos/paypal-logo';
import { QuickbooksLogo } from '@assets/integrations/logos/quickbooks-logo';
import { RecurlyLogo } from '@assets/integrations/logos/recurly-logo';
import { SalesforceLogo } from '@assets/integrations/logos/salesforce-logo';
import { SegmentLogo } from '@assets/integrations/logos/segment-logo';
import { ShopifyLogo } from '@assets/integrations/logos/shopify-logo';
import { SquareLogo } from '@assets/integrations/logos/square-logo';
import { StripeLogo } from '@assets/integrations/logos/stripe-logo';
import { SugarCrmLogo } from '@assets/integrations/logos/sugar-crm-logo';
import { TradegeckoLogo } from '@assets/integrations/logos/tradegecko-logo';
import { WoocommerceLogo } from '@assets/integrations/logos/woocommerce-logo';
import { XeroLogo } from '@assets/integrations/logos/xero-logo';

export const integrationsData = {
  data: [
    {
      category: 'E-commerce',
      apps: [
        {
          app_name: 'Shopify',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <ShopifyLogo />,
        },
        {
          app_name: 'Magento',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <MagentoLogo />,
        },
        {
          app_name: 'WooCommerce',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <WoocommerceLogo />,
        },
        {
          app_name: 'TradeGecko',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <TradegeckoLogo />,
        },
        {
          app_name: 'Google Shopping',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <GoogleShoppingLogo />,
        },
        {
          app_name: 'Square',
          app_sub_category: 'E-commerce platform',
          app_logo_src: <SquareLogo />,
        },
      ],
    },
    {
      category: 'Payments & Billing',
      apps: [
        {
          app_name: 'Stripe',
          app_sub_category: 'Payment platform',
          app_logo_src: <StripeLogo />,
        },
        {
          app_name: 'Xero',
          app_sub_category: 'Accounting',
          app_logo_src: <XeroLogo />,
        },
        {
          app_name: 'PayPal',
          app_sub_category: 'Money transfer',
          app_logo_src: <PaypalLogo />,
        },
        {
          app_name: 'Quickbooks',
          app_sub_category: 'Financial Management',
          app_logo_src: <QuickbooksLogo />,
        },
        {
          app_name: 'Braintree',
          app_sub_category: 'Payment platform',
          app_logo_src: <BraintreeLogo />,
        },
        {
          app_name: 'Chargebee',
          app_sub_category: 'Automated Billing',
          app_logo_src: <ChargebeeLogo />,
        },
        {
          app_name: 'Checkout.com',
          app_sub_category: 'Payment platform',
          app_logo_src: <CheckoutLogo />,
        },
        {
          app_name: 'Recurly',
          app_sub_category: 'Payment & Billing',
          app_logo_src: <RecurlyLogo />,
        },
      ],
    },
    {
      category: 'Sales & Marketing',
      apps: [
        {
          app_name: 'Close CRM',
          app_sub_category: 'CRM platform',
          app_logo_src: <ClosecrmLogo />,
        },
        {
          app_name: 'Salesforce',
          app_sub_category: 'CRM platform',
          app_logo_src: <SalesforceLogo />,
        },
        {
          app_name: 'Hubspot',
          app_sub_category: 'Marketing Automation',
          app_logo_src: <HubspotLogo />,
        },
        {
          app_name: 'Sugar CRM',
          app_sub_category: 'Sales integration',
          app_logo_src: <SugarCrmLogo />,
        },
        {
          app_name: 'Hootsuite',
          app_sub_category: 'Marketing management',
          app_logo_src: <HootsuiteLogo />,
        },
        {
          app_name: 'Google Analytics',
          app_sub_category: 'Marketing ',
          app_logo_src: <GoogleAnalyticsLogo />,
        },
        {
          app_name: 'Segment',
          app_sub_category: 'Customer Data Platform',
          app_logo_src: <SegmentLogo />,
        },
        {
          app_name: 'Facebook Ads',
          app_sub_category: 'Marketing',
          app_logo_src: <FacebookAdsLogo />,
        },
        {
          app_name: 'Google Ads',
          app_sub_category: 'Marketing',
          app_logo_src: <GoogleAdsLogo />,
        },
      ],
    },
  ],
};
