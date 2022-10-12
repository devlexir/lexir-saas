import AuthorCreateOrUpdateForm from "@components/author/author-form";
import Layout from "@components/layouts/admin";
import { adminOnly } from "@utils/auth-utils";
import type { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
export default function CreateAuthorPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-author")}
        </h1>
      </div>
      <AuthorCreateOrUpdateForm />
    </>
  );
}
CreateAuthorPage.authenticate = {
  permissions: adminOnly,
};
CreateAuthorPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //...(await serverSideTranslations(locale!, ["form", "common"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
