import OwnerLayout from "@components/layouts/owner";
import ShopForm from "@components/shop/shop-form";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import type { GetStaticPaths } from "next";
import { GetStaticProps } from "next";
import { useTranslation } from "next-i18next";
export default function CreateShopPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="py-5 sm:py-8 flex border-b border-dashed border-border-base">
        <h1 className="text-lg font-semibold text-heading">
          {t("form:form-title-create-shop")}
        </h1>
      </div>
      <ShopForm />
    </>
  );
}
CreateShopPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
CreateShopPage.Layout = OwnerLayout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    //...(await serverSideTranslations(locale!, ["common", "form"])),
  },
});

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: "blocking" };
};
