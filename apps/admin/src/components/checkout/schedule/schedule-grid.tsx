import { deliveryTimeAtom } from "@contexts/checkout";
import { useSettings } from "@contexts/settings.context";
import { RadioGroup } from "@headlessui/react";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { useEffect } from "react";

import ScheduleCard from "./schedule-card";

interface ScheduleProps {
	label: string;
	className?: string;
	count?: number;
}

export const ScheduleGrid: React.FC<ScheduleProps> = ({
	label,
	className,
	count,
}) => {
	const { t } = useTranslation("common");
	const { deliveryTime: schedules } = useSettings();

	const [selectedSchedule, setSchedule] = useAtom(deliveryTimeAtom);
	useEffect(() => {
		setSchedule(schedules[0]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
			</div>

			{schedules && schedules?.length ? (
				<RadioGroup value={selectedSchedule} onChange={setSchedule}>
					<RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
						{schedules?.map((schedule: any, idx: number) => (
							<RadioGroup.Option value={schedule} key={idx}>
								{({ checked }) => (
									<ScheduleCard checked={checked} schedule={schedule} />
								)}
							</RadioGroup.Option>
						))}
					</div>
				</RadioGroup>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
					<span className="relative px-5 py-6 text-base text-center bg-gray-100 border rounded border-border-200">
						{t("text-no-delivery-time-found")}
					</span>
				</div>
			)}
		</div>
	);
};
export default ScheduleGrid;
