import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import axios from "axios"

import { signinInput } from '@shantanu.kau/medium'


import image from "../assets/signin.jpg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import { Loader2 } from "lucide-react"


const Signin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const signin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const { error: parsingError, data: parsedData } = signinInput.safeParse({ email, password });

      if (parsingError) {
        throw new Error('Invalid Inputs');
      }

      const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/user/signin`,
        data: parsedData,
      });
      
      const token = res.data.token;
      
      localStorage.setItem('token', JSON.stringify(token));
      navigate('/');

    } catch (error) {
      console.log(error);
      toast(error as string);
    }
    setIsLoading(false);
    setEmail('');
    setPassword('');
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <form onSubmit={signin} className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            {isLoading ?
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
              :
              <Button type="submit" className="w-full">
                Login
              </Button>}
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <img
          src={image}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <Toaster />
    </div>
  )
}
export default Signin;  