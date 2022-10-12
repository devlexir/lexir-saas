import EditLabelInformationInput from '../edit-label-information-input';
import InformationInput from '../information-input';
import React from 'react';

interface MobileIBrandDetailsInformation {
  billing_information_data: {
    id: number;
    label: string;
    input: string;
    icon?: JSX.Element;
  }[];
}

const MobileBrandDetailsInformation = ({
  billing_information_data,
}: MobileIBrandDetailsInformation) => {
  return (
    <div>
      <EditLabelInformationInput title='Brand Information' />
      <div className='bg-white p-4 rounded text-sm gap-y-5 flex flex-col'>
        {billing_information_data.map((data) => {
          return <InformationInput data={data} />;
        })}
      </div>
    </div>
  );
};

export default MobileBrandDetailsInformation;
