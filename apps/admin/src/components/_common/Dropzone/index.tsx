import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { CloseIcon } from '@components/icons/close-icon';
import { DropzoneIcon } from '@components/icons/dropzone';
import { FileIcon } from '@components/icons/file-icon';

//useEffect
import axios from 'axios';

const DropzoneComponent = ({
  label,
  setFiles,
  control,
  name = '',
  multiple = true,
  acceptFile = false,
  helperText,
  dropzoneFile,
  setDropzoneFile,
  typeFileAccepted = '.pdf',
  ...rest
}: {
  label: string;
  setFiles: any;
  name?: string;
  control?: Control<FieldValues>;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  dropzoneFile?: any;
  setDropzoneFile: any;
  typeFileAccepted?: string;
}) => {
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <MultiPartUpload
          label={label}
          setFiles={setFiles}
          onChange={(e: any) => {
            onChange(e.target.files);
          }}
          dropzoneFile={dropzoneFile}
          setDropzoneFile={setDropzoneFile}
          typeFileAccepted={typeFileAccepted}
          {...rest}
        />
      )}
      name={name}
      control={control}
      defaultValue=''
    />
  );
};

const MultiPartUpload = ({
  label,
  onChange,
  dropzoneFile,
  setDropzoneFile,
  typeFileAccepted,
}: any) => {
  const [fileUploaded, setFileUploaded] = useState({
    filename:
      dropzoneFile && dropzoneFile[0]?.filename
        ? dropzoneFile[0].filename
        : undefined,
    url: dropzoneFile && dropzoneFile[0]?.url ? dropzoneFile[0].url : undefined,
  });

  console.log(fileUploaded);

  //local state

  const [uploadView, setUploadView] = useState(true);
  const [loader, setLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [message, setMessage] = useState({
    status: false,
    type: '',
    content: '',
  });

  const onDrop = useCallback((file: any) => {
    uploadFileOnS3(file, setDropzoneFile);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: typeFileAccepted,
  });

  const uploadFileOnS3 = async (fileDropzone: any, setDropzoneFile: any) => {
    if (fileDropzone.length) {
      setLoader(true);
      const file = fileDropzone?.[0];

      setSelectedFile(file);
      const filename = file.name;
      const fileType = file.type;
      const uploadNameKey = await `${Date.now()}*-*${filename}`;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/files/aws/multi-part/createPart`,
          {
            name: uploadNameKey,
            type: fileType,
            file: fileDropzone,
          }
        );

        uploadMultipartFile(
          data?.multipartCreateResult,
          file,
          uploadNameKey,
          setDropzoneFile
        );
      } catch (err: any) {
        setMessage({
          status: true,
          type: 'error',
          content: err.message,
        });
      } finally {
        setSelectedFile({});
      }
    }
  };

  const uploadMultipartFile = async (
    data: any,
    file: any,
    uploadNameKey: any,
    setDropzoneFile: any
  ) => {
    const UploadId = data.UploadId;
    try {
      const FILE_CHUNK_SIZE = 10000000; // 10MB
      const fileSize = file.size;
      const NUM_CHUNKS = Math.floor(fileSize / FILE_CHUNK_SIZE) + 1;
      let promisesArray = [];
      let start, end, blob;

      for (let index = 1; index < NUM_CHUNKS + 1; index++) {
        start = (index - 1) * FILE_CHUNK_SIZE;
        end = index * FILE_CHUNK_SIZE;
        blob = index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);
        const presignedUrl = await axios.get(
          `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/files/aws/multi-part/uploadPart`,
          {
            params: {
              fileName: uploadNameKey,
              partNumber: index,
              uploadId: UploadId,
            },
          }
        );

        const uploadResp = axios.put(presignedUrl?.data?.presignedUrl, blob, {
          headers: { 'Content-Type': file.type },
        });
        promisesArray.push(uploadResp);
      }

      const resolvedArray = await Promise.all(promisesArray);

      let uploadPartsArray: { ETag: string; PartNumber: number }[] = [];
      resolvedArray.forEach((resolvedPromise, index) => {
        uploadPartsArray.push({
          ETag: resolvedPromise.headers.etag,
          PartNumber: index + 1,
        });
      });

      const completeUploadResp = await axios.post(
        `${process.env.NEXT_PUBLIC_NEW_REST_API_ENDPOINT}/files/aws/multi-part/completePart`,
        {
          fileName: uploadNameKey,
          parts: uploadPartsArray,
          UploadId: UploadId,
        }
      );

      if (completeUploadResp.data.filename && completeUploadResp.data.url) {
        setFileUploaded({
          filename: completeUploadResp.data.filename,
          url: completeUploadResp.data.url,
        });
        setDropzoneFile({
          filename: completeUploadResp.data.filename,
          url: completeUploadResp.data.url,
        });
        console.log(uploadView);
        setUploadView(false);
        console.log(uploadView);
      }

      setMessage({
        status: true,
        type: 'success',
        content: 'Image Uploaded Successfully',
      });
    } catch (err: any) {
      setMessage({
        status: true,
        type: 'error',
        content: err.message,
      });
    } finally {
      setLoader(false);
      setSelectedFile({});
    }
  };

  return (
    <>
      <div>
        <label
          htmlFor={label}
          className='mt-8 mb-4 ml-4 block text-lg font-semibold text-[#6F6F6F] sm:text-xl'
        >
          {label}
        </label>
        <div
          {...getRootProps()}
          className='mx-4 mb-2 flex flex-col items-center justify-center gap-y-4 rounded-lg border px-4 py-4 text-center'
        >
          {!fileUploaded.filename ? (
            <div>
              <input {...getInputProps({ onChange })} />
              <DropzoneIcon />
              <div>
                <p className='text-xs text-[#6F6F6F]'>
                  Drag and drop files here to upload
                </p>
                <p className='text-xs text-[#9E9E9E]'>Only PDF files allowed</p>
              </div>
            </div>
          ) : (
            <div className='flex flex-row justify-between w-full items-center'>
              <a href={fileUploaded.url} target={'_blank'}>
                <div className='flex flex-row items-center w-full'>
                  <FileIcon />
                  <span className='text-[12px] font-bold'>
                    {fileUploaded.filename}
                  </span>
                </div>
              </a>
              <div className='w-4'>
                <CloseIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DropzoneComponent;
