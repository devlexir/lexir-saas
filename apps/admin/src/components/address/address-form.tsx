import Button from "@components/ui/button";
import { Form } from "@components/ui/form/form";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import { useModalState } from "@components/ui/modal/modal.context";
import Radio from "@components/ui/radio/radio";
import TextArea from "@components/ui/text-area";
import { AddressType } from "@ts-types/generated";
import { useTranslation } from "next-i18next";
import * as yup from "yup";

type FormValues = {
	__typename?: string;
	title: string;
	type: AddressType;
	address: {
		country: string;
		city: string;
		state: string;
		zip: string;
		street_address: string;
	};
};

const addressSchema = yup.object().shape({
	type: yup
		.string()
		.oneOf([AddressType.Billing, AddressType.Shipping])
		.required("form:error-type-required"),
	title: yup.string().required("form:error-title-required"),
	address: yup.object().shape({
		country: yup.string().required("form:error-country-required"),
		city: yup.string().required("form:error-city-required"),
		state: yup.string().required("form:error-state-required"),
		zip: yup.string().required("form:error-zip-required"),
		street_address: yup.string().required("form:error-street-required"),
	}),
});

const AddressForm: React.FC<any> = ({ onSubmit }) => {
	const { t } = useTranslation();
	const {
		data: { address, type },
	} = useModalState();
	return (
		<div className="min-h-screen p-5 sm:p-8 bg-light md:rounded-xl md:min-h-0">
			<h1 className="mb-4 text-lg font-semibold text-center text-heading sm:mb-6">
				{address ? t("text-update") : t("text-add-new")} {t("text-address")}
			</h1>
			<Form<FormValues>
				onSubmit={onSubmit}
				className="grid h-full grid-cols-2 gap-5"
				validationSchema={addressSchema}
				options={{
					shouldUnregister: true,
					defaultValues: {
						title: address?.title ?? "",
						type: address?.type ?? type,
						...(address?.address && address),
					},
				}}
			>
				{({ register, formState: { errors } }) => (
					<>
						<div>
							<Label>{t("text-type")}</Label>
							<div className="flex items-center space-s-4">
								<Radio
									id="billing"
									{...register("type")}
									type="radio"
									value={AddressType.Billing}
									label={t("common:text-billing")}
								/>
								<Radio
									id="shipping"
									{...register("type")}
									type="radio"
									value={AddressType.Shipping}
									label={t("common:text-shipping")}
								/>
							</div>
						</div>

						<Input
							label={t("common:text-title")}
							{...register("title")}
							error={t(errors.title?.message!)}
							variant="outline"
							className="col-span-2"
						/>

						<Input
							label={t("common:text-country")}
							{...register("address.country")}
							error={t(errors.address?.country?.message!)}
							variant="outline"
						/>

						<Input
							label={t("common:text-city")}
							{...register("address.city")}
							error={t(errors.address?.city?.message!)}
							variant="outline"
						/>

						<Input
							label={t("common:text-state")}
							{...register("address.state")}
							error={t(errors.address?.state?.message!)}
							variant="outline"
						/>

						<Input
							label={t("common:text-zip")}
							{...register("address.zip")}
							error={t(errors.address?.zip?.message!)}
							variant="outline"
						/>

						<TextArea
							label={t("common:text-street-address")}
							{...register("address.street_address")}
							error={t(errors.address?.street_address?.message!)}
							variant="outline"
							className="col-span-2"
						/>

						<Button className="w-full col-span-2">
							{address ? t("common:text-update") : t("common:text-save")}{" "}
							{t("common:text-address")}
						</Button>
					</>
				)}
			</Form>
		</div>
	);
};

export default AddressForm;
