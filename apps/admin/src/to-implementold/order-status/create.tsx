import Layout from "@components/layouts/admin";
import CreateOrUpdateOrderStatusForm from "@components/order-status/order-status-form";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
export default function CreateOrderStatusPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-order-status")}
        </h1>
      </div>
      <CreateOrUpdateOrderStatusForm />
    </>
  );
}
CreateOrderStatusPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
