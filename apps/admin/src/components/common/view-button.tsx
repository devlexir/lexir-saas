import { ChevronRight } from '@components/icons/chevron-right';
import Link from '@components/ui/link';

type Props = {
  id: string;
  url?: string | undefined;
};

const ViewButton = ({ url }: Props) => {
  return (
    <div className='inline-flex w-auto items-center space-s-5'>
      <Link
        href={url}
        className='ml-2 text-base transition duration-200 hover:text-heading'
      >
        <ChevronRight width={24} />
      </Link>
    </div>
  );
};

export default ViewButton;
