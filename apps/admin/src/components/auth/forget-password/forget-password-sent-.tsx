import Button from '@components/ui/button'

const ResentEmailPassword = ({ label = 'RESEND INSTRUCTIONS' }) => {
  return (
    <Button className="h-11 w-full">
      <a href="/documentation/email-templates/forgot-password">{label}</a>
    </Button>
  )
}

export default ResentEmailPassword
