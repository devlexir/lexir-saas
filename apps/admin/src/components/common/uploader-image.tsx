import React, { FC, useCallback, useEffect } from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

import { ArrowUpBar } from '@components/icons/arrow-up-bar';

interface IFileInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  error?: string;
}

const FileInputUpload: FC<IFileInputProps> = (props) => {
  const { name, label = name, error } = props;
  const { register, unregister, setValue, watch } = useFormContext();
  const files: File[] = watch(name);
  const onDrop = useCallback<DropzoneOptions['onDrop']>(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true });
    },
    [setValue, name]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: props.accept,
  });
  useEffect(() => {
    register(name);
    return () => {
      unregister(name);
    };
  }, [register, unregister, name]);
  return (
    <>
      <div className=' px-4 py-8'>
        <div className='flex items-center gap-x-4'>
          <div className=''>
            <label
              className='mb-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'
              htmlFor={name}
            >
              {label}
            </label>
            <div
              {...getRootProps({
                className:
                  'border h-12 w-60 mt-4 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
              })}
            >
              <input {...props} id={name} {...getInputProps()} />
              <p className='flex gap-3 text-center text-sm text-body'>
                <ArrowUpBar />
                <span className='flex items-center font-semibold text-[#2D2D2D]'>
                  UPLOAD IMAGE
                </span>
              </p>
            </div>
          </div>
          {files?.length < 1 || !files?.length ? (
            <span className='flex h-16 items-end text-xs text-[#6F6F6F] '>
              No selected file
            </span>
          ) : (
            <span className='flex h-16	items-end text-xs text-[#6F6F6F] '>
              {files[0].name}
            </span>
          )}
        </div>
        <div className=''>
          {error && (
            <p className='my-2 text-start text-xs text-red-500'>{error}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FileInputUpload;
