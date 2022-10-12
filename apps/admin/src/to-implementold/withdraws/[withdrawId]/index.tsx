import Card from "@components/common/card";
import AdminLayout from "@components/layouts/admin";
import Button from "@components/ui/button";
import ErrorMessage from "@components/ui/error-message";
import ValidationError from "@components/ui/form-validation-error";
import Loader from "@components/ui/loader/loader";
import SelectInput from "@components/ui/select-input";
import { useApproveWithdrawMutation } from "@data/withdraw/use-approve-withdraw.mutation";
import { useWithdrawQuery } from "@data/withdraw/use-withdraw.query";
import { adminOnly } from "@utils/auth-utils";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  status: any;
};
const WithdrawStatus = [
  {
    name: "Approved",
    id: "approved",
  },
  {
    name: "On Hold",
    id: "on_hold",
  },
  {
    name: "Processing",
    id: "processing",
  },
  {
    name: "Pending",
    id: "pending",
  },
  {
    name: "Rejected",
    id: "rejected",
  },
];

const Withdraw = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const {
    query: { withdrawId },
  } = router;

  const {
    data,
    error,
    isLoading: loading,
  } = useWithdrawQuery(withdrawId as string);

  useEffect(() => {
    if (data?.withdraw?.status) {
      setValue(
        "status",
        WithdrawStatus?.find((status) => status.id === data?.withdraw?.status)
      );
    }
  }, [data?.withdraw?.status]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: approveWithdraw, isLoading: approving } =
    useApproveWithdrawMutation();

  function handleApproveWithdraw({ status }: any) {
    approveWithdraw({
      variables: {
        input: {
          id: withdrawId as string,
          status: status.id,
        },
      },
    });
  }

  if (loading) return <Loader text="Loading" />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <h3 className="w-full mb-6 text-xl font-semibold text-heading">
        {t("common:text-withdrawal-info")}
      </h3>
      <Card className="flex flex-col">
        <div className="flex flex-col items-start md:flex-row">
          <form
            onSubmit={handleSubmit(handleApproveWithdraw)}
            className="flex items-start w-full mb-5 ms-auto md:w-1/2 md:order-2 md:mb-0 md:ps-3"
          >
            <div className="z-20 w-full me-4 md:me-5">
              <SelectInput
                name="status"
                control={control}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                options={WithdrawStatus}
                placeholder={t("form:input-placeholder-order-status")}
                rules={{
                  required: "Status is required",
                }}
              />

              <ValidationError message={t(errors?.status?.message)} />
            </div>
            <Button loading={approving}>
              <span className="hidden sm:block">
                {t("form:button-label-change-status")}
              </span>
              <span className="block sm:hidden">
                {t("form:button-label-change")}
              </span>
            </Button>
          </form>

          <div className="w-full md:w-1/2 md:order-1 md:pe-3">
            <div className="flex items-center justify-start mb-2">
              <div className="flex justify-between flex-shrink-0 w-4/12 text-sm me-5 text-body">
                <span>{t("common:text-amount")}</span>
                <span>:</span>
              </div>
              <div className="flex items-center w-full px-4 py-3 border border-gray-300 rounded xl:w-5/12">
                <span className="font-semibold text-heading">
                  {data?.withdraw?.amount}
                </span>
              </div>
            </div>

            <div className="flex items-center mb-2">
              <div className="flex justify-between flex-shrink-0 w-4/12 text-sm me-5 text-body">
                <span>{t("common:text-payment-method")}</span>
                <span>:</span>
              </div>
              <span className="w-full text-sm font-semibold text-heading">
                {data?.withdraw?.payment_method ?? "N/A"}
              </span>
            </div>

            <div className="flex items-center">
              <div className="flex justify-between flex-shrink-0 w-4/12 text-sm me-5 text-body">
                <span>{t("common:text-status")}</span>
                <span>:</span>
              </div>
              <span className="w-full text-sm font-semibold text-heading">
                {
                  WithdrawStatus?.find(
                    (status) => status.id === data?.withdraw?.status
                  )?.name
                }
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
        {data?.withdraw?.details && (
          <Card className="flex flex-col">
            <div className="mb-2 text-sm font-semibold text-heading">
              <span>{t("common:text-details")} :</span>
            </div>

            <span className="text-sm text-body">{data?.withdraw?.details}</span>
          </Card>
        )}

        {data?.withdraw?.note && (
          <Card className="flex flex-col">
            <div className="mb-2 text-sm font-semibold text-heading">
              <span>{t("common:text-note")} :</span>
            </div>

            <span className="text-sm text-body">{data?.withdraw?.note}</span>
          </Card>
        )}
      </div>
    </>
  );
};

export default Withdraw;

Withdraw.authenticate = {
  permissions: adminOnly,
};
Withdraw.Layout = AdminLayout;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    //...(await serverSideTranslations(locale!, ["table", "common", "form"])),
  },
});
