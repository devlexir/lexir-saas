import Image from '@components/ui/image';
import EmptyCartIcon from '@components/icons/empty-cart-icon';
import { useTranslation } from 'next-i18next';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

const EmptyCart: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <div className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center">
      <div className="flex mx-auto w-[220px] md:w-auto">
        <EmptyCartIcon />
      </div>
      <Heading variant="titleMedium" className="mb-1.5 pt-8 text-grey">
        {t('text-empty-cart')}
      </Heading>
      <Text>{t('text-empty-cart-description')}</Text>
    </div>
  );
};

export default EmptyCart;
