import CouponCreateOrUpdateForm from "@components/coupon/coupon-form";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useCouponQuery } from "@data/coupon/use-coupon.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
export default function UpdateCouponPage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useCouponQuery(query.id as string);
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-coupon")}
        </h1>
      </div>
      <CouponCreateOrUpdateForm initialValues={data} />
    </>
  );
}
UpdateCouponPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
