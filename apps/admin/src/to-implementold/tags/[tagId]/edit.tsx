import Layout from "@components/layouts/admin";
import CreateOrUpdateTagForm from "@components/tag/tag-form";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTagQuery } from "@data/tag/use-tag.query";
import { adminOnly } from "@utils/auth-utils";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function UpdateTagPage() {
  const { t } = useTranslation();
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useTagQuery(query.tagId as string);
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-gray-300">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-tags")}
        </h1>
      </div>

      <CreateOrUpdateTagForm initialValues={data?.tag} />
    </>
  );
}
UpdateTagPage.authenticate = {
  permissions: adminOnly,
};
UpdateTagPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
