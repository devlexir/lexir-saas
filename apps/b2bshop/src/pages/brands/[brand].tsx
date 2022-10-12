import baldorianLogo from '@assets/logos/baldoriaLogo.png';
import LayoutBrand from '@components/layout/layout-brand';
import { BrandsSingleDetails } from '@components/shops/BrandsSingleDetails';
import { GetServerSideProps } from 'next';

interface BrandPageProps {
  brandData: any;
  products: any;
}

export default function BrandPage({ brandData, products }: BrandPageProps) {
  return (
    <>
      <BrandsSingleDetails brandData={brandData} products={products.data} />
    </>
  );
}

BrandPage.Layout = LayoutBrand;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const fetchProducts = await fetch(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/products?subdomain=${context.query.brand}&published=true`
  );

  const products = await fetchProducts.json();

  const brandData = {
    id: 1,
    name: 'Baldoria',
    fullName: 'Baldoria Vermouth',
    logo: baldorianLogo,
    description:
      'Baldoria is the brainchild of Tim, Dotan, and Daniel – better known as Ernest. Most of them work together at the world-famous Little Red Door, a mixology cocktail bar in the centre of Paris. Wanting to create luxury products for bartenders, they turned to Italian distillers Piero and Enrico to turn their dream into reality. The result is a range of luxurious, beautifully balanced contemporary vermouths - made by bartenders, for bartenders.',
    location: 'Boves, Italy',
    categories: ['VERMOUTH'],
  };

  return {
    props: {
      brandData: brandData,
      products: products,
    },
  };
};
