import { BookIcon } from '@assets/welcome-lexir/book-icon'
import { ResourcesIcon } from '@assets/welcome-lexir/resources-icon'
import { TutorialIcon } from '@assets/welcome-lexir/tutorial-icon'
import Button from '@components/ui/button'
import Logo from '@components/ui/logo'
import CardWelcomeLexir from '@components/welcome-lexir/card-welcome-lexir'
import FooterWelcomeLexir from '@components/welcome-lexir/footer-welcome-lexir'
import Link from 'next/link'

const cardsData = [
  {
    image: <BookIcon />,
    title: 'Guides',
    text: 'Learn how to use Lexir platform watching some video tutorials!',
  },
  {
    image: <ResourcesIcon />,
    title: 'Resources',
    text: 'Learn how to use Lexir platform watching some video tutorials!',
  },
  {
    image: <TutorialIcon />,
    title: 'Tutorials',
    text: 'Learn how to use Lexir platform watching some video tutorials!',
  },
]

const WelcomeLexir = () => {
  return (
    <>
      <div className="absolute top-8 left-4 z-50 md:left-10">
        <Logo />
      </div>

      <div className="flex h-screen w-full flex-col">
        <div className="z-30 flex h-full w-full justify-center px-10 py-8">
          <div className="flex w-full max-w-md flex-col items-center justify-center pt-20 lg:pt-0">
            <h2 className="mb-12 mt-4 flex items-center gap-x-2 text-4xl font-bold text-[#4F4F4F]">
              Welcome to Lexir!
            </h2>

            <span className="mb-8 text-lg text-[#4F4F4F] text-start md:text-center">
              Learn how to use Lexir platform or add a New Brand
            </span>
            <Link href="/welcome-lexir/form/brand-name">
              <Button className="w-full max-w-xs uppercase">
                Add A NEW BRAND
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex min-h-min w-full justify-center bg-[#F9F9F9] shadow-[0_4px_15px_0_rgba(0,0,0,0.09)]">
          <div className=" flex h-full min-h-min flex-col justify-center gap-x-4 gap-y-4 pt-14 pb-14 lg:flex-row ">
            {cardsData.map((card) => (
              <CardWelcomeLexir
                image={card.image}
                title={card.title}
                text={card.text}
              />
            ))}
          </div>
        </div>
        <div className=" bottom-0 w-full">
          <FooterWelcomeLexir />
        </div>
      </div>
    </>
  )
}

export default WelcomeLexir
