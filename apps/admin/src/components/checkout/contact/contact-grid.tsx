import { PlusIcon } from "@components/icons/plus-icon";
import ContactCard from "@components/ui/contact-card";
import { useModalAction } from "@components/ui/modal/modal.context";
import { customerContactAtom } from "@contexts/checkout";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

interface ContactProps {
	contact: string | undefined;
	label: string;
	count?: number;
	className?: string;
}

const ContactGrid = ({ contact, label, count, className }: ContactProps) => {
	const [contactNumber, setContactNumber] = useAtom(customerContactAtom);
	const { openModal } = useModalAction();
	const { t } = useTranslation("common");

	useEffect(() => {
		if (contact) {
			setContactNumber(contact);
		}
	}, [contact, setContactNumber]);

	function onAddOrChange() {
		openModal("ADD_OR_UPDATE_CHECKOUT_CONTACT");
	}
	return (
		<div className={className}>
			<div className="flex items-center justify-between mb-5 md:mb-8">
				<div className="flex items-center space-s-3 md:space-s-4">
					{count && (
						<span className="flex items-center justify-center w-8 h-8 text-base rounded-full bg-accent lg:text-xl text-light">
							{count}
						</span>
					)}
					<p className="text-lg capitalize lg:text-xl text-heading">{label}</p>
				</div>

				<button
					className="flex items-center text-sm font-semibold transition-colors duration-200 text-accent focus:outline-none focus:text-accent-hover hover:text-accent-hover"
					onClick={onAddOrChange}
				>
					<PlusIcon className="w-4 h-4 stroke-2 me-0.5" />
					{contactNumber ? t("text-update") : t("text-add")}
				</button>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
				{contactNumber ? (
					<ContactCard
						checked={Boolean(contactNumber)}
						number={contactNumber}
					/>
				) : (
					<span className="relative px-5 py-6 text-base text-center bg-gray-100 border rounded border-border-200">
						{t("text-no-contact")}
					</span>
				)}
			</div>
		</div>
	);
};

export default ContactGrid;
