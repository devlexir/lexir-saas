import CreatePageHeader from '@components/atoms/createPageHeader';

import { Button } from '@jeanpierrecarvalho/lexir-design-system';

type FormHeaderType = {
  title: string;
  subTitle: string;
  onClick: any;
  loading: boolean;
  buttonDisabled?: boolean;
  cancelButtonTitle: string;
  addButtonTitle: string;
};

const FormHeader = ({
  title,
  subTitle,
  onClick,
  loading,
  buttonDisabled,
  cancelButtonTitle,
  addButtonTitle,
}: FormHeaderType) => {
  return (
    <>
      <CreatePageHeader title={title} subTitle={subTitle} />

      <div className='mb-4 flex justify-end gap-2 text-end lg:sticky lg:right-[25px] lg:top-[190px] lg:z-[30] lg:px-4'>
        <Button variant='outline' onClick={onClick} type='button'>
          {cancelButtonTitle}
        </Button>

        {buttonDisabled === undefined ? (
          <Button loading={loading}>Edit</Button>
        ) : (
          <Button loading={loading} disabled={buttonDisabled} variant='normal'>
            {addButtonTitle}
          </Button>
        )}
      </div>
    </>
  );
};

export default FormHeader;
