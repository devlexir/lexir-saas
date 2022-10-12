import Button from '@components/ui/button'
import { useRouter } from 'next/router'

const FormButtons = ({ isDirty, isValid }: any) => {
  const router = useRouter()

  return (
    <span className="flex flex-col-reverse gap-2 py-10 md:flex-row md:pt-6">
      <Button
        variant="outline"
        className="w-full md:w-56"
        type="button"
        onClick={() => router.back()}
      >
        {'< PREVIOUS'}
      </Button>
      <Button
        type="submit"
        className=" w-full md:w-56"
        disabled={!isDirty || !isValid}
      >
        {'NEXT >'}
      </Button>
    </span>
  )
}

export default FormButtons
