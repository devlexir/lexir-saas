import Image from 'next/image'

type ImageProps = {
  src: string
}

const LeftImage = ({ src }: ImageProps) => (
  <div className="relative mt-5 h-96 w-full md:mt-0 md:w-1/2">
    <Image
      src={src}
      alt=""
      layout="fill"
      objectFit="cover"
      className="rounded-tl[80px] mb-0 rounded-br-[80px] rounded-tl-[80px] pb-0 md:rounded-br-[100px] md:rounded-tl-[100px] lg:rounded-br-[220px] lg:rounded-tl-none"
    />
  </div>
)

const RightImage = ({ src }: ImageProps) => (
  <div className="relative mt-5 h-96 w-full md:mt-0 md:w-1/2">
    <Image
      src={src}
      alt=""
      layout="fill"
      objectFit="cover"
      className="rounded-tr[80px] mb-0 rounded-bl-[80px] rounded-tr-[80px] pb-0 md:rounded-bl-[100px] md:rounded-tr-[100px] lg:rounded-bl-[220px] lg:rounded-tr-none"
    />
  </div>
)

type TextProps = {
  content: any
}

const RightText = ({ content }: TextProps) => {
  const { title, description } = content
  const [firstWord, ...text] = title.split(' ')

  return (
    <div className="mr-0 flex w-full flex-col md:mr-5 md:mt-[60px] md:ml-[60px] md:w-1/2">
      <h1 className="text-32 font-bold leading-[50px] md:text-5xl">
        <span className="text-theme-1">{firstWord} </span>
        {text.join(' ')}
      </h1>
      <p className="mt-5 md:mt-10">{description}</p>
    </div>
  )
}

const LeftText = ({ content }: TextProps) => {
  const { title, description } = content
  const [firstWord, ...text] = title.split(' ')

  return (
    <div className="flex w-full flex-col md:mt-[60px] md:mr-[60px] md:ml-5 md:w-1/2 md:items-end">
      <h1 className="text-32 font-bold leading-[50px] md:text-5xl">
        <span className="text-theme-1">{firstWord} </span>
        {text.join(' ')}
      </h1>
      <p className="mt-5 md:mt-10">{description}</p>
    </div>
  )
}

type Props = {
  imageRight?: boolean
  src: string
  className?: string
  title: string
  description: string
}

const Section2ColumnsImageText = ({
  imageRight = false,
  src,
  className,
  title,
  description,
}: Props) => {
  return (
    <div className="mx-8 mt-32">
      {imageRight ? (
        <div
          className={`flex h-full w-full flex-col-reverse md:flex-row-reverse md:rounded-bl-[100px] md:rounded-tr-[100px] lg:rounded-bl-[220px] lg:rounded-tr-none ${className}`}
        >
          <RightImage src={src} />
          <LeftText content={{ title, description }} />
        </div>
      ) : (
        <div
          className={`flex h-full w-full flex-col-reverse md:flex-row md:rounded-br-[100px] md:rounded-tl-[100px] lg:rounded-br-[220px] lg:rounded-tl-none ${className}`}
        >
          <LeftImage src={src} />
          <RightText content={{ title, description }} />
        </div>
      )}
    </div>
  )
}

export default Section2ColumnsImageText
