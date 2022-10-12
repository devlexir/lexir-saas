import Layout from "@components/layouts/admin";
import ManufacturerCreateOrUpdateForm from "@components/manufacturer/manufacturer-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useManufacturerQuery } from "@data/manufacturer/use-manufacturer.query";
import { adminOnly } from "@utils/auth-utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function UpdateManufacturerPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useManufacturerQuery(query.manufacturerSlug as string);
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-update-manufacturer")}
        </h1>
      </div>
      <ManufacturerCreateOrUpdateForm initialValues={data} />
    </>
  );
}
UpdateManufacturerPage.authenticate = {
  permissions: adminOnly,
};
UpdateManufacturerPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
