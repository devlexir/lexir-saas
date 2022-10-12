import React, { useState } from 'react';
import Head from 'next/head';
import axios from 'axios';

const Message = ({ message, closeSnackbar }) => {
  return (
    <div
      className={
        message?.status ? `snackbar show message-${message?.type}` : 'snackbar'
      }
    >
      {message?.content}
      <span
        className='close'
        onClick={() => {
          closeSnackbar();
        }}
      >
        &times;
      </span>
    </div>
  );
};

const InputFile = ({ loader, uploadFileOnS3 }) => {
  return (
    <form className='form'>
      <div
        className='file-upload-wrapper'
        data-text='Select your file!'
        disabled={loader}
      >
        <input
          name='file-upload-field'
          type='file'
          className='file-upload-field'
          onChange={uploadFileOnS3}
          accept='image/*'
          disabled={loader}
          key={Date.now()}
        />
      </div>
    </form>
  );
};

const MultiPartUpload = () => {
  //local state
  const [listFiles, setListFiles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedFile, setSelectedFile] = useState({});
  const [message, setMessage] = useState({
    status: false,
    type: '',
    content: '',
  });

  //Upload File in S3 Bucket
  const uploadFileOnS3 = async (e) => {
    console.log(
      '🚀 ~ file: drop-test.tsx ~ line 92 ~ uploadFileOnS3 ~ e',
      e.target.files
    );

    if (e.target.files.length) {
      // nProgress.start();
      setLoader(true);
      const file = e.target.files?.[0];
      setSelectedFile(file);
      const filename = file.name;
      const fileType = file.type;
      const uploadNameKey = await `${Date.now()}*-*${filename}`;

      try {
        const { data } = await axios.post(
          'https://saas-lexir-api-staging.vercel.app/api/v1/files/aws/multi-part/createPart',
          {
            name: uploadNameKey,
            type: fileType,
            file: e.target.files,
          }
        );

        //Devide File into multipart
        uploadMultipartFile(data?.multipartCreateResult, file, uploadNameKey);
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

  //Create Multipart
  const uploadMultipartFile = async (
    data: any,
    file: any,
    uploadNameKey: any
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
        // Conver file to miltipart
        blob = index < NUM_CHUNKS ? file.slice(start, end) : file.slice(start);
        // (1) Generate presigned URL for each part
        const presignedUrl = await axios.get(
          `https://saas-lexir-api-staging.vercel.app/api/v1/files/aws/multi-part/uploadPart`,
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

      // (3) Calls the CompleteMultipartUpload endpoint in the backend server

      const completeUploadResp = await axios.post(
        'https://saas-lexir-api-staging.vercel.app/api/v1/files/aws/multi-part/completePart',
        {
          fileName: uploadNameKey,
          parts: uploadPartsArray,
          UploadId: UploadId,
        }
      );

      listFiles.splice(0, 0, completeUploadResp?.data?.newFile);
      //Display Message
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
      // nProgress.done();
      setLoader(false);
      setSelectedFile({});
    }
  };

  //Close Snackbar
  const closeSnackbar = () => {
    setMessage({
      ...message,
      status: false,
    });
  };

  return (
    <div>
      <div className='container'>
        <Head>
          <title>Upload File on S3</title>
          <meta name='description' content='Upload Filein Multipart on S3' />
        </Head>
        {/* Display Success & Error messages */}
        <InputFile loader={loader} uploadFileOnS3={uploadFileOnS3} />
        <Message message={message} closeSnackbar={closeSnackbar} />
      </div>
    </div>
  );
};

export default MultiPartUpload;
