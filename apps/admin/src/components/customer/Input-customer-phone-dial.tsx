import { useMemo } from 'react';
import { Control, UseFormRegister } from 'react-hook-form/dist/types';

import InputPhoneDial from '@components/ui/input-phone-dial';

import { getSubdomain } from '@utils/request-utils';

import { usePhoneDialQuery } from '@data/customer/phone-dial.query';

interface IInputCustomerPhoneDial {
  register: UseFormRegister<any>;
  errors: any;
  control: Control<any, object>;
  setPhoneDial: any;
  phoneDial: { label: string; value: string }[];
  defaultValues: any;
}

const InputCustomerPhoneDial = ({
  register,
  errors,
  control,
  setPhoneDial,
  phoneDial,
  defaultValues,
}: IInputCustomerPhoneDial) => {
  const { subdomain: subdomain } = getSubdomain();

  /**
   * Dropdown objects
   */
  const phoneDialMap: object[] = [];

  /**
   * Dropdown calls
   */
  const { data: result, isFetched } = usePhoneDialQuery({
    subdomain: subdomain,
  });
  /**
   * Dropdown builds
   */
  result &&
    result?.phone.data.map((data: any) => {
      if (!phoneDialMap.some((list) => list?.value === data.dial_code)) {
        phoneDialMap.push({
          label: data.code,
          value: data.dial_code,
        });
      }
    });
  /**
   * Dropdown calls
   */

  useMemo(() => {
    setPhoneDial(
      //@ts-ignore
      phoneDialMap.filter((option: any) => option.dial == defaultValues?.dial)
    );
  }, [isFetched]);

  /**
   * Function to change the selected option of the Dropdown
   */
  const changePhoneDialFunction = (e: any) => {
    setPhoneDial(
      //@ts-ignore
      phoneDial.filter((option: any) => option.value === e.value)
    );
  };
  return (
    <InputPhoneDial
      label='Phone*'
      {...register('phone_number')}
      error={errors.phone_number?.message!}
      variant='outline'
      className=''
      note='Customer’s primary number for communications'
      placeholder='000 000 000'
      control={control}
      options={phoneDialMap}
      onChange={changePhoneDialFunction}
    />
  );
};

export default InputCustomerPhoneDial;
