import Card from "@components/common/card";
import Search from "@components/common/search";
import Layout from "@components/layouts/admin";
import ManufacturerList from "@components/manufacturer/manufacturer-list";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { useManufacturersQuery } from "@data/manufacturer/use-manufacturers.query";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { LIMIT } from "@utils/constants";
import { ROUTES } from "@utils/routes";
import type { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
export default function Manufacturers() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useManufacturersQuery({
    limit: LIMIT,
    text: searchTerm,
    page,
    orderBy,
    sortedBy,
  });
  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: number) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/3 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:text-manufacturers-publications")}
          </h1>
        </div>

        <div className="w-full xl:w-2/3 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${ROUTES.MANUFACTURERS}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span>+ {t("form:button-label-add-manufacturer-publication")}</span>
          </LinkButton>
        </div>
      </Card>

      <ManufacturerList
        manufacturers={data?.manufacturers}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
Manufacturers.authenticate = {
  permissions: adminOnly,
};
Manufacturers.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //...(await serverSideTranslations(locale!, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
