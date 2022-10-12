import Card from "@components/common/card";
import Search from "@components/common/search";
import Layout from "@components/layouts/admin";
import TaxList from "@components/tax/tax-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { useTaxesQuery } from "@data/tax/use-taxes.query";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
export default function TaxesPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearch] = useState("");
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useTaxesQuery({
    text: searchTerm,
    orderBy,
    sortedBy,
  });
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearch(searchText);
  }

  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("form:input-label-taxes")}
          </h1>
        </div>

        <div className="w-full xl:w-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${ROUTES.TAXES}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span>+ {t("form:button-label-add-tax")}</span>
          </LinkButton>
        </div>
      </Card>
      {!loading ? (
        <TaxList taxes={data?.taxes} onOrder={setOrder} onSort={setColumn} />
      ) : null}
    </>
  );
}

TaxesPage.authenticate = {
  permissions: adminOnly,
};
TaxesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
