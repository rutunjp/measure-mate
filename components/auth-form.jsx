import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
export default function AuthForm() {
  return (
    <form className="flex flex-col items-center w-4/5 lg:w-full">
      <div className="flex items-end space-x-2">
        <div className="flex flex-col items-start gap-1">
          <Input type="phone" id="phone" placeholder="+91" />
        </div>
        <Button asChild>
          {' '}
          <Link href="/users">Send OTP</Link>
        </Button>
      </div>
    </form>
  )
}
