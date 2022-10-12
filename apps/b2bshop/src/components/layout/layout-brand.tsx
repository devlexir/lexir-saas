import Footer from '@components/layout/footer/footer';
import Header from '@components/layout/header/header-brand';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';

const LayoutBrand: React.FC = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main
        className='relative flex-grow'
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default LayoutBrand;
