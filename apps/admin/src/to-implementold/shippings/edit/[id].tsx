import Layout from "@components/layouts/admin";
import CreateOrUpdateShippingForm from "@components/shipping/shipping-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useShippingQuery } from "@data/shipping/use-shipping.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function UpdateShippingPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useShippingQuery(query.id as string);
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-update-shipping")} #{data?.id}
        </h1>
      </div>
      <CreateOrUpdateShippingForm initialValues={data} />
    </>
  );
}
UpdateShippingPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
