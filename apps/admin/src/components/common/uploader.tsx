import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ArrowUpBar } from '@components/icons/arrow-up-bar';
import { CloseIcon } from '@components/icons/close-icon';
import Loader from '@components/ui/loader/loader';

import { useUploadMutation } from '@data/upload/use-upload.mutation';
import { Attachment } from '@ts-types/generated';

const getPreviewImage = (value: any) => {
  let images: any[] = [];
  if (value) {
    images = Array.isArray(value) ? value : [{ ...value }];
  }
  return images;
};
export default function Uploader({
  onChange,
  value,
  multiple,
  acceptFile,
}: any) {
  const [files, setFiles] = useState<Attachment[]>(getPreviewImage(value));
  const { mutate: upload, isLoading: loading } = useUploadMutation();
  const { getRootProps, getInputProps } = useDropzone({
    ...(!acceptFile ? { accept: 'image/*' } : {}),
    multiple,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        upload(
          acceptedFiles, // it will be an array of uploaded attachments
          {
            onSuccess: (data) => {
              let mergedData;
              if (multiple) {
                mergedData = files.concat(data);
                setFiles(files.concat(data));
              } else {
                mergedData = data[0];
                setFiles(data);
              }
              if (onChange) {
                onChange(mergedData);
              }
            },
          }
        );
      }
    },
  });

  const handleDelete = (image: string) => {
    const images = files.filter((file) => file.thumbnail !== image);

    setFiles(images);
    if (onChange) {
      onChange(images);
    }
  };
  const thumbs = files?.map((file: any, idx) => {
    const imgTypes = [
      'tif',
      'tiff',
      'bmp',
      'jpg',
      'jpeg',
      'gif',
      'png',
      'eps',
      'raw',
    ];
    if (file.id) {
      const splitArray = file?.original?.split('/');
      const fileSplitName = splitArray[splitArray?.length - 1]?.split('.'); // it will create an array of words of filename
      const fileType = fileSplitName.pop(); // it will pop the last item from the fileSplitName arr which is the file ext
      const filename = fileSplitName.join('.'); // it will join the array with dot, which restore the original filename
      const isImage = file?.thumbnail && imgTypes.includes(fileType); // check if the original filename has the img ext

      return (
        <div
          className={`inline-flex flex-col overflow-hidden rounded mt-2 me-2 relative ${
            isImage ? 'border border-border-200' : ''
          }`}
          key={idx}
        >
          {isImage ? (
            <div className='flex items-center justify-center min-w-0 w-16 h-16 overflow-hidden'>
              <img src={file.thumbnail} />
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <div className='flex items-center justify-center min-w-0 w-14 h-14 overflow-hidden'>
                <img src='/zip.png' />
              </div>
              <p className='flex items-baseline text-xs text-body p-1 cursor-default'>
                <span
                  className='max-w-[64px] inline-block whitespace-nowrap overflow-ellipsis overflow-hidden'
                  title={`${filename}.${fileType}`}
                >
                  {filename}
                </span>
                .{fileType}
              </p>
            </div>
          )}
          {multiple ? (
            <button
              className='w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-xs text-light absolute top-1 end-1 shadow-xl outline-none'
              onClick={() => handleDelete(file.thumbnail)}
            >
              <CloseIcon width={10} height={10} />
            </button>
          ) : null}
        </div>
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file: any) => URL.revokeObjectURL(file.thumbnail));
    },
    [files]
  );
  return (
    <section className='upload flex gap-4'>
      <div
        {...getRootProps({
          className:
            'border h-12 w-60 ml-4 mb-8 rounded flex flex-col justify-center items-center cursor-pointer focus:border-accent-400 focus:outline-none',
        })}
      >
        <input {...getInputProps()} />
        <p className='text-body text-sm text-center flex gap-3'>
          <ArrowUpBar />
          <span className='font-semibold text-[#2D2D2D] flex items-center'>
            UPLOAD IMAGE
          </span>
        </p>
      </div>
      {files.length < 1 ? (
        <span className='text-[#6F6F6F] text-xs	h-12 flex items-center '>
          No selected file
        </span>
      ) : null}

      {(!!thumbs.length || loading) && (
        <aside className='flex flex-wrap mt-2'>
          {!!thumbs.length && thumbs}
          {loading && (
            <div className='h-16 flex items-center mt-2 ms-2'>
              <Loader simple={true} className='w-6 h-6' />
            </div>
          )}
        </aside>
      )}
    </section>
  );
}
