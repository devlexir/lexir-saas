import { LogoWhiteLexir } from '@assets/brands-lexir/logo_lexir_white'
import { SocialFacebookLexir } from '@assets/brands-lexir/social_facebook_lexir'
import { SocialInstagramLexir } from '@assets/brands-lexir/social_instagram_lexir'
import Link from 'next/link'

const FooterWelcomeLexir = () => {
  return (
    <div className="flex w-full justify-center bg-[#6F6F6F] pt-8 pb-4">
      <div className="flex h-full w-full max-w-7xl flex-col px-5 text-sm text-white lg:px-10">
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <Link href="/">
            <LogoWhiteLexir className="mb-10 cursor-pointer sm:mb-0" />
          </Link>
          <div>
            <span className="flex flex-row justify-between pb-2 ">
              <Link href="https://www.facebook.com/LexirOfficial">
                <a target="_blank">
                  <SocialFacebookLexir className="cursor-pointer" />
                </a>
              </Link>
              <Link href="https://www.facebook.com/LexirOfficial">
                <a target="_blank">
                  <SocialInstagramLexir className="cursor-pointer" />
                </a>
              </Link>
            </span>
            <p className="mb-8 uppercase sm:mb-0">Follow US</p>
          </div>
        </div>
        <div className="flex justify-center text-center">
          <p>© 2022 Lexir.com, 60 Rue Charlot, 75003 Paris, France</p>
        </div>
      </div>
    </div>
  )
}

export default FooterWelcomeLexir
