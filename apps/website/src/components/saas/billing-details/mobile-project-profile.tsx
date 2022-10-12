import { EditIcon } from '@assets/icons/EditIcon';
import { PlanIcon } from '@assets/icons/PlanIcon';
import { PriceIcon } from '@assets/icons/PriceIcon';
import { ProjectIcon } from '@assets/icons/ProjectIcon';
import MobileInputHeader from '@components/ui/saas/mobile-input-header';
import React from 'react';

interface IMobileProjectProfileTable {
  project_data: {
    id: number;
    project: string;
    plan: string;
    price: string;
  }[];
}

const MobileProjectProfileTable = ({
  project_data,
}: IMobileProjectProfileTable) => {
  return (
    <div>
      <div className='flex flex-row justify-between p-4'>
        <MobileInputHeader title='Projects on this profile' />
        <h3 className='text-sm text-center font-bold text-brand-dark'></h3>
        <button className='flex flex-row items-center gap-x-2'>
          <EditIcon width='20' height='20' />
          <p className='text-sm '>Edit</p>
        </button>
      </div>
      <div className='bg-white p-4 rounded text-sm gap-y-5 flex flex-col'>
        {project_data.map((data) => {
          return Project(data);
        })}
      </div>
    </div>
  );
};

export default MobileProjectProfileTable;

function Project(data: {
  id: number;
  project: string;
  plan: string;
  price: string;
}): JSX.Element {
  return (
    <div className='flex flex-col gap-y-6' key={data.id}>
      <div className='flex w-full flex-row gap-2'>
        <div className='shrink-0 pt-0.5'>
          <ProjectIcon />
        </div>
        <div className='flex flex-col items-start gap-2'>
          <h3 className='font-bold text-brand-dark'>{'Project'}</h3>
          <p className='text-brand-muted-four text-left text-sm'>
            {data.project}
          </p>
        </div>
      </div>
      <div className='flex w-full flex-row gap-2'>
        <div className='shrink-0 pt-0.5'>
          <PlanIcon />
        </div>
        <div className='flex flex-col items-start gap-2 '>
          <h3 className='font-bold text-brand-dark'>{'Plan'}</h3>
          <p className='text-brand-muted-four text-left text-sm'>{data.plan}</p>
        </div>
      </div>
      <div className='flex w-full flex-row gap-2'>
        <div className='shrink-0 pt-0.5'>
          <PriceIcon />
        </div>
        <div className='flex flex-col items-start gap-2 '>
          <h3 className='font-bold text-brand-dark'>{'Price'}</h3>
          <p className='text-brand-muted-four text-left text-sm'>
            {data.price}
          </p>
        </div>
      </div>
    </div>
  );
}
