import Layout from "@components/layouts/admin";
import ManufacturerCreateOrUpdateForm from "@components/manufacturer/manufacturer-form";
import { adminOnly } from "@utils/auth-utils";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
export default function CreateManufacturerPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-manufacturer")}
        </h1>
      </div>
      <ManufacturerCreateOrUpdateForm />
    </>
  );
}
CreateManufacturerPage.authenticate = {
  permissions: adminOnly,
};
CreateManufacturerPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
