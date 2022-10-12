import Link from 'next/link';

import { LogoWhiteLexir } from '@assets/brands-lexir/logo_lexir_white';
import { SocialFooterFacebookLexir } from '@assets/footer-social-links/social-footer-facebook-lexir';
import { SocialFooterInstagramLexir } from '@assets/footer-social-links/social-footer-instagram-lexir';
import { SocialFooterLinkedinLexir } from '@assets/footer-social-links/social-footer-linkedin-lexir';
import { SocialFooterMediumLexir } from '@assets/footer-social-links/social-footer-medium-lexir';

const FooterBrandsLexir = () => {
  return (
    <div className='flex flex-col items-center bg-[#2d2d2d] px-4 pt-16 pb-8 text-white md:px-8 xl:px-16 2xl:px-44'>
      <div className='flex w-full max-w-[1920px] flex-col justify-between pb-16 sm:px-10 md:flex-row lg:px-20 lg:pb-[72px]'>
        <div className='flex w-full flex-col md:w-3/12 md:pt-2'>
          <Link href='/'>
            <a className='mb-7 h-5 w-20 cursor-pointer md:mb-0'>
              <LogoWhiteLexir />
            </a>
          </Link>
        </div>
        <div className='flex w-full flex-wrap justify-between md:w-6/12'>
          <ul className='mb-8 flex w-full flex-col text-16 font-medium leading-8 md:w-1/2 lg:mb-0 lg:w-auto'>
            <li className='mb-4 uppercase text-[#8f8f8f]'>Community</li>
            <li>
              <Link href='/'>Lexir for Brands</Link>
            </li>
            <li>
              <Link href='https://business.lexir.com/'>Business Buyers</Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/sales-reps'>
                Sales Affiliates
              </Link>
            </li>
          </ul>
          <ul className='mb-8 flex w-full flex-col text-16 font-medium leading-8 md:w-1/2 lg:mb-0 lg:w-auto'>
            <li className='mb-4 uppercase text-[#8f8f8f]'>Platform</li>
            <li>
              <Link href='/resource-centre/'>
                <a target=''>Resources</a>
              </Link>
            </li>

            <li>
              <Link href='/get-started'>Get Started</Link>
            </li>
          </ul>
          <ul className='mb-8 flex w-full flex-col text-16 font-medium leading-8 md:mb-0 md:w-1/2 lg:w-auto'>
            <li className='mb-4 uppercase text-[#8f8f8f]'>Company</li>
            <li>
              <Link href='https://shop.lexir.com/about/'>About</Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/contact/'>Contact</Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/policy/mentions-legales'>
                Legal
              </Link>
            </li>
          </ul>
          <ul className='mb-8 flex w-full flex-col text-16 font-medium leading-8 md:mb-0 md:w-1/2 lg:w-auto'>
            <li className='mb-4 uppercase text-[#8f8f8f]'>Lexir Shop</li>
            <li>
              <Link href='https://shop.lexir.com/spirits/brands/'>Brands</Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/spirits/products/'>
                Spirits
              </Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/wine/products/'>Wine</Link>
            </li>
            <li>
              <Link href='https://shop.lexir.com/blog'>Blog</Link>
            </li>
          </ul>
        </div>
        <ul className='flex w-full flex-row gap-x-4 md:w-3/12 md:justify-end md:pt-1'>
          <Link href='https://medium.com/lexir'>
            <a target='_blank'>
              <SocialFooterMediumLexir className='cursor-pointer' />
            </a>
          </Link>
          <Link href='https://www.linkedin.com/company/lexir/mycompany/'>
            <a target='_blank'>
              <SocialFooterLinkedinLexir className='cursor-pointer' />
            </a>
          </Link>
          <Link href='https://www.facebook.com/LexirOfficial'>
            <a target='_blank'>
              <SocialFooterFacebookLexir className='cursor-pointer' />
            </a>
          </Link>
          <Link href='https://www.instagram.com/lexirofficial/'>
            <a target='_blank'>
              <SocialFooterInstagramLexir className='cursor-pointer' />
            </a>
          </Link>
        </ul>
      </div>
      <hr className='w-full max-w-[1920px] border-[#8f8f8f] pt-8' />
      <div className='flex w-full max-w-[1920px] flex-col sm:px-10 md:flex-row md:justify-between lg:px-20'>
        <p className='mb-7 text-[#8f8f8f] md:mb-0'>
          ©{new Date().getFullYear()} Lexir Inc.
        </p>
        <ul className='flex flex-col md:flex-row'>
          <li className='mb-4 md:mb-0'>
            <Link href='https://shop.lexir.com/policy/protection-des-donnees-personnelles'>
              Privacy
            </Link>
          </li>
          <li className='md:pl-9'>
            <Link href='https://shop.lexir.com/policy/conditions-generales-de-vente'>
              Terms of service
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterBrandsLexir;
