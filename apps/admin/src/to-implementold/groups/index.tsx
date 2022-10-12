import Card from "@components/common/card";
import Search from "@components/common/search";
import TypeList from "@components/group/group-list";
import Layout from "@components/layouts/admin";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { useTypesQuery } from "@data/type/use-types.query";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
export default function TypesPage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: loading,
    error,
  } = useTypesQuery({
    text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }

  return (
    <>
      <Card className="flex flex-col items-center mb-8 xl:flex-row">
        <div className="mb-4 md:w-1/4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-groups")}
          </h1>
        </div>

        <div className="flex flex-col items-center w-full space-y-4 xl:w-1/2 md:flex-row md:space-y-0 ms-auto">
          <Search onSearch={handleSearch} />

          <LinkButton
            href={`${ROUTES.GROUPS}/create`}
            className="w-full h-12 md:ms-6 md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-group")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <TypeList types={data?.types} onOrder={setOrder} onSort={setColumn} />
    </>
  );
}

TypesPage.authenticate = {
  permissions: adminOnly,
};

TypesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
