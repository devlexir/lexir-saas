import Scrollbar from './scrollbar';
import { CloseIcon } from '@components/icons/close-icon';
import { HamburguerIcon } from '@components/icons/hamburger-icon';

type DrawerWrapperProps = {
  hideTopBar?: boolean;
  children: any;
  onClose?: () => void;
};

const DrawerWrapper: React.FunctionComponent<DrawerWrapperProps> = ({
  hideTopBar = false,
  children,
  onClose,
}) => {
  return (
    <div className='flex flex-col h-full relative '>
      {!hideTopBar && (
        <div className='flex items-center justify-between px-5 md:py-5 md:px-6 mb-4 md:mb-6 absolute top-0 start-0 w-full h-16 z-30 bg-fill-secondary'>
          {/* <Logo className="w-24 md:w-auto" /> */}
          <button
            onClick={onClose}
            className='w-7 h-7 flex items-center justify-center text-body  transition-opacity hover:opacity-60 duration-200 focus:outline-none '
          >
            <HamburguerIcon />
          </button>
        </div>
      )}
      {/* End of header part */}
      <div className='pt-16 h-full'>
        <Scrollbar className='w-full h-full'>{children}</Scrollbar>
      </div>
      {/* End of menu part */}
    </div>
  );
};

export default DrawerWrapper;
