import ActionButtons from "@components/common/action-buttons";
import { Table } from "@components/ui/table";
import TitleWithSort from "@components/ui/title-with-sort";
import { Shipping, SortOrder } from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useState } from "react";

export type IProps = {
  shippings: Shipping[] | undefined;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const ShippingList = ({ shippings, onSort, onOrder }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);

      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "left",
      width: 62,
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-title")}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === "name"
          }
          isActive={sortingObj.column === "name"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      width: 150,
      onHeaderCell: () => onHeaderClick("name"),
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-item-amount")}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === "amount"
          }
          isActive={sortingObj.column === "amount"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "amount",
      key: "amount",
      align: "left",
      onHeaderCell: () => onHeaderClick("amount"),
    },
    {
      title: t("table:table-item-global"),
      dataIndex: "is_global",
      key: "is_global",
      align: "left",
      render: (value: boolean) => (
        <span className="capitalize">{value.toString()}</span>
      ),
    },
    {
      title: (
        <TitleWithSort
          title={t("table:table-shipping-type")}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === "type"
          }
          isActive={sortingObj.column === "type"}
        />
      ),
      className: "cursor-pointer",
      dataIndex: "type",
      key: "type",
      align: "left",
      onHeaderCell: () => onHeaderClick("type"),
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "left",
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.SHIPPINGS}/edit/${id}`}
          deleteModalView="DELETE_SHIPPING"
        />
      ),
      width: 200,
    },
  ];

  return (
    <div className="rounded overflow-hidden shadow mb-8">
      <Table
        //@ts-ignore
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={shippings}
        rowKey="id"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default ShippingList;
