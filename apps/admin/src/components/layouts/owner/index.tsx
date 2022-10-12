import MobileNavigation from '@components/layouts/navigation/mobile-navigation';
import Navbar from '@components/layouts/navigation/top-navbar';
import OwnerInformation from '@components/user/user-details';

const OwnerLayout: React.FC = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col bg-gray-100 transition-colors duration-150'>
      <Navbar />
      <MobileNavigation>
        <OwnerInformation />
      </MobileNavigation>

      <div className='flex flex-1 pt-20'>
        <aside className='xl:w-76 fixed bottom-0 hidden h-full w-72 overflow-y-auto bg-white px-4 pt-22 shadow start-0 lg:block'>
          <OwnerInformation />
        </aside>
        <main className='xl:ps-76 w-full lg:ps-72'>
          <div className='h-full p-5 md:p-8'>{children}</div>
        </main>
      </div>
    </div>
  );
};
export default OwnerLayout;
