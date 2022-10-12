import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import Dropzone from '@components/_common/Dropzone';
import { BrandSelectInput } from '@components/_common/brands/BrandSelectInput';
import { Card } from '@components/common/card';
import FormHeader from '@components/form/form-header';
import Description from '@components/ui/description';
import ValidationError from '@components/ui/form-validation-error';
import Label from '@components/ui/label';
import SelectInput from '@components/ui/select-input';

import { getSubdomain } from '@utils/request-utils';

import { useUpdatePayoutMutation } from '@data/payouts/use-payout-update.mutation';
import { usePayoutsPeriods } from '@data/payouts/use-payouts-periods.query';
import { usePayoutStatusQuery } from '@data/payouts/use-payouts-status.query';

type FormValues = {
  subdomain?: any;
  brand?: any;
  payout_period?: any;
  status?: any;
  reportFileName?: string;
  reportUrl?: string;
};

let defaultValues = {
  subdomain: 'lexir',
  brand: {
    label: '',
    value: '',
  },
  payout_period: {
    label: '',
    value: '',
  },
  status: {
    label: '',
    value: '',
  },
  reportFileName: '',
  reportUrl: '',
};

const EditPayoutForm = (props: any) => {
  const router = useRouter();
  const { mutate: updatePayout, isLoading: loading } =
    useUpdatePayoutMutation();

  const methods = useForm<FormValues>({
    defaultValues,
  });
  defaultValues = props.initialValues;

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // FILES FOR REPORT INPUT
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = methods;

  const { subdomain: subdomain } = getSubdomain();

  /**
   * Dropdown states
   */
  const [brandOption, setBrandOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);

  const [payoutPeriodOption, setPayoutPeriodOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);
  const [payoutStatusOption, setPayoutStatusOption] = useState([
    {
      label: '',
      value: '',
    },
  ]);

  // Dropzone File
  const [dropzoneFile, setDropzoneFile] = useState([
    {
      filename: defaultValues.reportFileName,
      url: defaultValues.reportUrl,
    },
  ]);

  /**
   * Dropdown objects
   */
  const payoutPeriodList: object[] = [];
  const payoutStatusList: object[] = [];

  /**
   * Dropdown calls
   */

  const {
    data: payoutStatus,
    isFetched: payoutStatusFetched,
    isLoading: isPayoutStatusLoading,
  } = usePayoutStatusQuery({});
  const {
    data: payoutsPeriod,
    isFetched: payoutPeriodsFetched,
    isLoading: isPayoutsPeriodsLoading,
  } = usePayoutsPeriods({});

  /**
   * Dropdown builds
   */

  payoutStatus &&
    payoutStatus?.payouts_status?.data.map(
      (data: { name: string; value: string }) => {
        if (!payoutStatusList.some((list: any) => list?.name === data.value)) {
          payoutStatusList.push({ label: data.value, value: data.value });
        }
      }
    );
  payoutsPeriod &&
    payoutsPeriod?.payoutsPeriod?.data.map(
      (data: { name: string; value: string }) => {
        if (!payoutPeriodList.some((list: any) => list?.name === data.value)) {
          payoutPeriodList.push({ label: data.value, value: data.value });
        }
      }
    );

  useMemo(() => {
    setPayoutPeriodOption(
      //@ts-ignore
      payoutPeriodList.filter(
        (option: any) => option.value === defaultValues?.payout_period
      )
    );
  }, [payoutPeriodsFetched]);
  useMemo(() => {
    setPayoutStatusOption(
      //@ts-ignore
      payoutStatusList.filter(
        (option: any) => option.value === defaultValues?.status
      )
    );
  }, [payoutStatusFetched]);

  /**
   * onChange functions for state
   */

  const changePayoutPeriodFunction = (e: any) => {
    setPayoutPeriodOption(
      //@ts-ignore
      payoutPeriodList.filter((option: any) => option.value === e.value)
    );
  };
  const changePayoutStatusFunction = (e: any) => {
    setPayoutStatusOption(
      //@ts-ignore
      payoutStatusList.filter((option: any) => option.value === e.value)
    );
  };

  async function onSubmit({
    brand,
    payout_period,
    status,
    reportFileName,
    reportUrl,
  }: FormValues) {
    brand = brandOption[0]?.value;
    payout_period = payoutPeriodOption[0]?.value;
    status = payoutStatusOption[0]?.value;
    reportFileName = dropzoneFile.filename;
    reportUrl = dropzoneFile.url;
    updatePayout(
      {
        variables: {
          id: defaultValues.id,
          input: {
            ...defaultValues,
            subdomain,
            brand,
            payout_period,
            status,
            reportFileName,
            reportUrl,
          },
        },
      },
      {
        onError: (error: any) => {
          Object.keys(error?.response?.data).forEach((field: any) => {
            setError(field, {
              type: 'manual',
              message: error?.response?.data[field][0],
            });
          });
        },
      }
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader
          title={'Payout Details'}
          subTitle={'Edit payout report here'}
          onClick={router.back}
          loading={loading}
          buttonDisabled={buttonDisabled}
          cancelButtonTitle={'Cancel'}
          addButtonTitle={'Submit'}
        />

        {/* Brand Info */}
        <div className='my-5 flex flex-wrap sm:my-8  lg:mt-[160px] lg:px-4'>
          <Description
            title='Payout report Info'
            details='Payouts basic informations'
            className='w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5'
          />
          <div className='w-full sm:w-8/12 md:w-2/3'>
            <Card className='divide-y rounded-lg border'>
              <BrandSelectInput
                defaultValue={defaultValues.brand}
                register={register}
                control={control}
                errors={errors}
                setBrandOption={setBrandOption} // To set the brand option state
                brandOption={brandOption} // Brand Option State
              />
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Payout Period
                </Label>
                <SelectInput
                  {...register('payout_period')}
                  control={control}
                  options={payoutPeriodList}
                  placeholder='Type the payout period'
                  value={payoutPeriodOption}
                  onChange={changePayoutPeriodFunction}
                  isloading={isPayoutsPeriodsLoading}
                />

                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  The relevant month for this report
                </p>
                <ValidationError message={errors.payout_period?.message} />
              </div>
              <Dropzone
                label='Report'
                setFiles={setFiles}
                dropzoneFile={dropzoneFile}
                setDropzoneFile={setDropzoneFile}
              />
              <div className='mb-6 px-4 pt-8'>
                <Label className='mb-4 block text-lg font-semibold leading-none text-[#6F6F6F] sm:text-xl'>
                  Status
                </Label>
                <SelectInput
                  {...register('status')}
                  control={control}
                  options={payoutStatusList}
                  placeholder='Type the payout period'
                  value={payoutStatusOption}
                  onChange={changePayoutStatusFunction}
                  isloading={isPayoutStatusLoading}
                />

                <p className='mt-2 text-xs text-[#CCCCCC]'>
                  The current status of the payout
                </p>
                <ValidationError message={errors.status?.message} />
              </div>
            </Card>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditPayoutForm;
