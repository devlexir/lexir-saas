import CreateOrUpdateTypeForm from "@components/group/group-form";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTypeQuery } from "@data/type/use-type.query";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

export default function UpdateTypePage() {
  const { query } = useRouter();
  const { t } = useTranslation();
  const {
    data,
    isLoading: loading,
    error,
  } = useTypeQuery(query?.groupId as string);

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <div className="flex py-5 border-b border-dashed sm:py-8 border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-edit-type")}
        </h1>
      </div>
      <CreateOrUpdateTypeForm initialValues={data} />
    </>
  );
}
UpdateTypePage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common"])),
  },
});
