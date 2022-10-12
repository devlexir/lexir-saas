import HaveBrandLexir from '@components/common/have-brand-lexir.tsx';
import Layout from '@components/layout/layout';
import BrandsPageContent from '@components/shops/brands-page-content';
import PageHeroSection from '@components/ui/page-hero-section';

export default function BrandsPage() {
  return (
    <>
      <PageHeroSection
        backgroundThumbnail='/assets/images/all-brands-hero-image.png'
        mobileBackgroundThumbnail='/assets/images/all-brands-hero-image.png'
        variant='white'
      />
      <BrandsPageContent />
      <div className='mt-10'>
        <HaveBrandLexir />
      </div>
    </>
  );
}

BrandsPage.Layout = Layout;
