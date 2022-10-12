import Card from "@components/common/card";
import Search from "@components/common/search";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import CustomerList from "@components/user/user-list";
import { useUsersQuery } from "@data/user/use-users.query";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useUsersQuery({
    limit: 20,
    page,
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col items-center mb-8 md:flex-row">
        <div className="mb-4 md:w-1/4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("form:input-label-customers")}
          </h1>
        </div>

        <div className="flex items-center w-full md:w-3/4 ms-auto">
          <Search onSearch={handleSearch} />
          <LinkButton
            href={`${ROUTES.USERS}/create`}
            className="h-12 ms-4 md:ms-6"
          >
            <span className="hidden sm:block">
              + {t("form:button-label-add-customer")}
            </span>
            <span className="block sm:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>

      {loading ? null : (
        <CustomerList
          customers={data?.users}
          onPagination={handlePagination}
          onOrder={setOrder}
          onSort={setColumn}
        />
      )}
    </>
  );
}

Customers.authenticate = {
  permissions: adminOnly,
};
Customers.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
