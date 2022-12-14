import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import RefundList from "@components/refund/refund-list";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useRefundsQuery } from "@data/refunds/use-refunds.query";
import { SortOrder } from "@ts-types/generated";
import { adminOnly } from "@utils/auth-utils";
import type { GetStaticPaths } from "next";
import { useTranslation } from "next-i18next";
import { useState } from "react";
export default function RefundsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useRefundsQuery({
    limit: 10,
    page,
    sortedBy,
    orderBy,
  });

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("common:sidebar-nav-item-refunds")}
          </h1>
        </div>
      </Card>

      <RefundList
        refunds={data?.refunds}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />
    </>
  );
}
RefundsPage.authenticate = {
  permissions: adminOnly,
};
RefundsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ////...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
