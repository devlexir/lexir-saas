import CreateOrUpdateTypeForm from "@components/group/group-form";
import Layout from "@components/layouts/admin";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
export default function CreateTypePage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex py-5 border-b border-dashed sm:py-8 border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-type")}
        </h1>
      </div>
      <CreateOrUpdateTypeForm />
    </>
  );
}
CreateTypePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
