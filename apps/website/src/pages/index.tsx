import NavbarBrandsLexir from '@components/brands-lexir/navbar-brands-lexir';

import BrandsSellingSection from '@components/brands-lexir/brands-selling-brands-lexir';
import DistributionMarkets from '@components/brands-lexir/distribution-markets-brands-lexir';
import FaqSection from '@components/brands-lexir/faq-section-brands-lexir';
import FooterBrandsLexir from '@components/brands-lexir/footer-brands-lexir';
import HeaderSection from '@components/brands-lexir/header-brands-lexir';
import IncreaseMarginSection from '@components/brands-lexir/increase-margin-brands-lexir';
import MultipleSalesChannelSection from '@components/brands-lexir/multiple-sales-channels-brands-lexir';

import NextlevelSection from '@components/brands-lexir/next-level-section-brands-lexir';
import ShareYourHistorySection from '@components/brands-lexir/share-your-history-brands-lexir';
// * *  Components  * * //
import SuccessStories from '@components/brands-lexir/success-stories';
// * *  Utils  * * //
import AnimationSection from '@utils/motion/landing-page-animantion';
import type { NextPage } from 'next';
import Head from 'next/head';

import { createClient } from '../../prismicio';
import React from 'react';

// * *  Sections of the page body  * * //
const sections = [
  <BrandsSellingSection />,
  <IncreaseMarginSection />,
  <ShareYourHistorySection />,
  <MultipleSalesChannelSection />,
  <DistributionMarkets />,
  <SuccessStories />,
  <FaqSection />,
  <NextlevelSection />,
];

const Home: NextPage = (page: any) => {
  return (
    <>
      <Head>
        <title>Lexir | Distribution for Craft Alcohol Brands</title>
        <link rel='icon' href='/favicon.ico' />
        <meta name='theme-color' content='#7b46f6' />
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <div className='overflow-x-hidden tracking-[.7px] text-[#333]'>
        <div className='flex justify-center px-5'>
          <NavbarBrandsLexir />
        </div>
        <div className='my-8 mt-12 px-4'>
          <HeaderSection
            title={page.page.data.Hero[0].Title[0].text}
            description={page.page.data.Hero[0].Description[0].text}
            cta_text={page.page.data.Hero[0].CtaText[0].text}
            cta_href={page.page.data.Hero[0].CtaHref[0].text}
            video_url={page.page.data.Hero[0].VideoUrl}
          />
        </div>

        {sections.map((section, index) => (
          <React.Fragment key={index}>
            {section === sections[5] || section === sections[7] ? (
              <div className='mt-24'>{section}</div>
            ) : (
              <div className='mt-24 px-4'>{section}</div>
            )}
          </React.Fragment>
        ))}

        <div className=''>
          <FooterBrandsLexir />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(previewData: any) {
  const client = createClient({ previewData });

  const page = await client.getSingle('homepage');

  return {
    props: { page },
  };
}

export default Home;
