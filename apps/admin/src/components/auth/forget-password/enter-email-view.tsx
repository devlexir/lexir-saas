import Button from '@components/ui/button'
import Input from '@components/ui/input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
interface Props {
  onSubmit: (values: { email: string }) => void
  loading: boolean
}
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Erro in email format')
    .required('E-mail is required'),
})

const EnterEmailView = ({ onSubmit, loading }: Props) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<{ email: string }>({ resolver: yupResolver(schema) })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input
        label="E-mail"
        {...register('email')}
        type="email"
        variant="outline"
        className="mb-10"
        placeholder="example@example.com"
        error={t(errors.email?.message!)}
      />
      <Button className="h-11 w-full" loading={loading} disabled={loading}>
        SEND INSTRUCTIONS
      </Button>
    </form>
  )
}

export default EnterEmailView
