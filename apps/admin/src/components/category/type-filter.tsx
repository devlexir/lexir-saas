import Select from "@components/ui/select/select";
import { useTypesQuery } from "@data/type/use-types.query";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import React from "react";

type Props = {
  onTypeFilter: Function;
  className?: string;
};

export default function TypeFilter({ onTypeFilter, className }: Props) {
  const { t } = useTranslation();

  const { data, isLoading: loading } = useTypesQuery();

  return (
    <div className={cn("flex w-full", className)}>
      <div className="w-full">
        <Select
          options={data?.types}
          isLoading={loading}
          getOptionLabel={(option: any) => option.name}
          getOptionValue={(option: any) => option.slug}
          placeholder={t("common:filter-by-group-placeholder")}
          onChange={onTypeFilter}
        />
      </div>
    </div>
  );
}
