import Layout from "@components/layouts/admin";
import CreateOrUpdateTagForm from "@components/tag/tag-form";
import { adminOnly } from "@utils/auth-utils";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
export default function CreateCategoriesPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:button-label-add-tag")}
        </h1>
      </div>
      <CreateOrUpdateTagForm />
    </>
  );
}
CreateCategoriesPage.authenticate = {
  permissions: adminOnly,
};
CreateCategoriesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
