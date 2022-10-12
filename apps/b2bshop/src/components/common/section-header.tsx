import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';

interface Props {
  sectionHeadingTitle?: string;
  sectionSubHeading?: string;
  className?: string;
  headingPosition?: 'left' | 'center';
}

const SectionHeader: React.FC<Props> = ({
  sectionHeadingTitle = 'section-title',
  sectionSubHeading,
  className = 'pb-0.5 mb-5 xl:mb-6',
  headingPosition = 'left',
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className={cn(`-mt-1.5 ${className}`, {
        'pb-2 text-left lg:pb-3 xl:pb-4 3xl:pb-7': headingPosition === 'left',
      })}
    >
      <Heading variant='productHeading'>{sectionHeadingTitle}</Heading>
      {sectionSubHeading && headingPosition === 'center' && (
        <Text variant='medium' className='mt-1.5 pb-0.5 lg:mt-2.5 xl:mt-3'>
          {t(sectionSubHeading)}
        </Text>
      )}
    </div>
  );
};

export default SectionHeader;
