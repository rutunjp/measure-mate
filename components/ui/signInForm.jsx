import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function SignInForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Enter Number for OTP sign in</CardDescription>
      </CardHeader>
      <CardContent>
        <AuthForm />
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter>
        <div className="flex flex-row gap-1">
          New user?
          <Link className="font-medium" href="/login">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

function AuthForm() {
  return (
    <form className="flex flex-col items-left  lg:w-full">
      <div className="flex items-end space-x-2">
        <div className="flex flex-col items-start gap-1">
          <Input type="phone" id="phone" placeholder="+91" />
        </div>
        <Button asChild>
          <Link href="/customers">Send OTP</Link>
        </Button>
      </div>
    </form>
  );
}
