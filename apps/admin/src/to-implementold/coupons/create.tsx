import CouponCreateOrUpdateForm from "@components/coupon/coupon-form";
import Layout from "@components/layouts/admin";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
export default function CreateCouponPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-coupon")}
        </h1>
      </div>
      <CouponCreateOrUpdateForm />
    </>
  );
}
CreateCouponPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
