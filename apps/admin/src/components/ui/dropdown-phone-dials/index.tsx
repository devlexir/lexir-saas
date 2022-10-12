import React, { ButtonHTMLAttributes } from 'react';

import Select from '@components/ui/select/select';

export interface DropdownPhoneDialsProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'normal' | 'outline' | 'custom' | 'customOutline';
  size?: 'big' | 'medium' | 'small';
  active?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const DropdownPhoneDials = ({ ...rest }: any) => {
  return (
    <Select
      placeholder={'sdfsd'}
      isMulti={false}
      isClearable={false}
      isLoading={false}
      options={[]}
    />
  );
};

export default DropdownPhoneDials;
