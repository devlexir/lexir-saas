// import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
// import Search from "@components/common/search";
import SiteList from "@components/molecules/sites/site-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useSitesQuery } from "@data/site/sites.query";
// import CategoryTypeFilter from "@components/product/category-type-filter";
// import { ArrowDown } from "@components/icons/arrow-down";
// import { ArrowUp } from "@components/icons/arrow-up";
// import LinkButton from "@components/ui/link-button";
import { SortOrder } from "@ts-types/generated";
import { getAuthCredentials } from "@utils/auth-utils";
import { superAdminOnly } from "@utils/auth-utils";
import type { GetServerSideProps } from "next";
// import cn from "classnames";
import { useTranslation } from "next-i18next";
import { useState } from "react";
// import { Query } from "react-query";

export default function ProductsPage(pageProps: any) {
  const { t } = useTranslation();

  // const [searchTerm, setSearchTerm] = useState("");
  // const [type, setType] = useState("");
  // const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  // const [visible, setVisible] = useState(false);

  // const toggleVisible = () => {
  //   setVisible((v) => !v);
  // };

  const {
    data,
    isLoading: loading,
    error,
  } = useSitesQuery({
    subdomain: pageProps.subdomain,
    limit: 20,
    page,
    // type,
    // category,
    // text: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  // function handleSearch({ searchText }: { searchText: string }) {
  //   setSearchTerm(searchText);
  //   setPage(1);
  // }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      {/* <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              Sites
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex flex-col items-center ms-auto">
            <Search onSearch={handleSearch} />
          </div>

          <button
            className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
            onClick={toggleVisible}
          >
            {t("common:text-filter")}{" "}
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
          <LinkButton
            href={`/products/create`}
            className="w-full h-12 md:ms-6 md:w-auto"
          >
            <span className="block md:hidden xl:block">+ {"Add Product"}</span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>

        <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <CategoryTypeFilter
              className="w-full"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setPage(1);
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
                setPage(1);
              }}
            />
          </div>
        </div>
      </Card> */}
      <SiteList
        subdomain={pageProps.subdomain}
        products={data?.products}
        // products={productsPayload.products}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}

ProductsPage.authenticate = {
  permissions: superAdminOnly,
};

ProductsPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;

  const { permissions } = getAuthCredentials(ctx);

  if (locale) {
    return {
      props: {
        ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
        subdomain: query.site,
        userPermissions: permissions,
      },
    };
  }

  return {
    props: {
      subdomain: query.site,
      userPermissions: permissions,
    },
  };
};
