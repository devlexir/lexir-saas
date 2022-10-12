import Uploader from '@components/common/uploader';
import { Controller } from 'react-hook-form';

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
            className='mt-8 mb-4 ml-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'
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
