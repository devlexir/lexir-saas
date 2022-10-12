import { CheckMark } from "@components/icons/checkmark";
import Scrollbar from "@components/ui/scrollbar";
import cn from "classnames";

import styles from "./progress-box.module.css";

type ProgressProps = {
  data: any[] | undefined;
  status: number;
};

const ProgressBox: React.FC<ProgressProps> = ({ status, data }) => {
  return (
    <Scrollbar
      className="w-full h-full"
      options={{
        scrollbars: {
          autoHide: "never",
        },
      }}
    >
      <div className="flex flex-col py-7 md:items-start md:justify-start w-full md:flex-row ">
        {data?.map((item: any) => (
          <div className="flex grow mb-7 last:mb-0 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/5 md:mb-0 md:flex-col items-center" key={item.id}>
            <div
              className={cn(
                "relative flex items-center justify-center md:w-full md:mb-4",
                status >= item.serial ? styles.checked : ""
              )}
            >
              <div className="text-sm font-bold text-accent w-9 h-9 flex items-center justify-center rounded-full bg-light border border-dashed border-accent z-10">
                {status >= item.serial ? (
                  <div className="w-3 h-4">
                    <CheckMark className="w-full" />
                  </div>
                ) : (
                  item.serial
                )}
              </div>
              <div className="absolute bg-gray-100 w-1 h-double start-1/2 -top-1/2 -ms-px md:w-full md:h-1 md:top-1/2 md:start-0 md:-mt-px" />
            </div>

            <div className="flex flex-col ms-5 items-center md:ms-0">
              {item && (
                <span className=" flex items-center text-base text-body-dark capitalize font-semibold text-start md:text-center md:px-2">
                  {item?.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default ProgressBox;
