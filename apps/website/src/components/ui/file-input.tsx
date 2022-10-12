import Uploader from "@components/common/uploader";
import { Controller } from "react-hook-form";

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  label?: string;
}

const FileInput = ({
  label,
  control,
  name,
  multiple = true,
  acceptFile = false,
  helperText,
}: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({ field: { ref, ...rest } }) => (
        <>
          <label
            htmlFor={name}
            className="block text-[#6F6F6F] font-semibold text-lg sm:text-xl mt-8 mb-4 ml-4"
          >
            {label}
          </label>
          <Uploader
            {...rest}
            multiple={multiple}
            acceptFile={acceptFile}
            helperText={helperText}
          />
        </>
      )}
    />
  );
};

export default FileInput;
