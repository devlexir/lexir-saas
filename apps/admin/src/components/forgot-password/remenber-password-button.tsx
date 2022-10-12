import Link from 'next/link'

const RemenberPasswordButton = () => {
  return (
    <>
      <Link href="/login">
        <a className="mt-10 flex justify-center text-sm font-bold text-[#1C8C64]">
          I remember my password
        </a>
      </Link>
    </>
  )
}

export default RemenberPasswordButton
