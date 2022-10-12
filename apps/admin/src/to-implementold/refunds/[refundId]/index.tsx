import Layout from "@components/layouts/admin";
import RefundDetailsView from "@components/refund/refund-details-view";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRefundQuery } from "@data/refunds/use-refund.query";
import { adminOnly } from "@utils/auth-utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function RefundDetailsPage() {
  const { t } = useTranslation();
  const { query } = useRouter();

  const {
    data,
    isLoading: loading,
    error,
  } = useRefundQuery(query.refundId as string);

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return <RefundDetailsView refund={data?.refund} />;
}
RefundDetailsPage.authenticate = {
  permissions: adminOnly,
};
RefundDetailsPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    //...(await serverSideTranslations(locale, ["common", "form", "table"])),
  },
});
