import AccountInfo from './account-settings-component/account-information';
import ConpanyInformation from './account-settings-component/company-information';
import PeronalInfo from './account-settings-component/personal-information';
import { UpdateUserType } from '@framework/basic-rest/customer/use-update-customer';
import { useForm } from 'react-hook-form';

const defaultValues = {};

const AccountDetails: React.FC = () => {
  const {
    formState: { errors },
  } = useForm<UpdateUserType>({
    defaultValues,
  });

  return (
    <div className='flex w-full flex-col gap-y-16'>
      <AccountInfo
        email={'jlalvesdesousa@lupum.com'}
        password={'*******************'}
      />

      <PeronalInfo
        firstName={'Leandro'}
        lastName={'Alves'}
        phone={'+325 889 565 214'}
      />

      <ConpanyInformation
        company_name={'Lupum'}
        company_address={'Agras Street 8798, 4000-458 Porto, Portugal'}
        company_email={'jlalvesdesousa@lupum.com'}
        phone={'+325 889 565 214'}
        company_number={'1256369988'}
      />
    </div>
  );
};

export default AccountDetails;
