import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupInput } from "@shantanu.kau/medium";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  

  const signup = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const { error: signupError, data } = signupInput.safeParse({
        name: `${firstName} ${lastName}`,
        email,
        password
      });

      if(signupError){
        throw new Error(signupError.message);
      }
      
      const response = await axios({
        method: 'post',
        url: `${ import.meta.env.VITE_BACKEND_BASE_URL}/user/signup`,
        data
      });

      localStorage.setItem('token',JSON.stringify(response.data.token));

      navigate('/');

    } catch (error) {
      console.log(error);
      toast(error as string);
    }
  }


  return (
    <div className="h-[100vh] flex flex-col justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signup}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" placeholder="Max" required value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" placeholder="Robinson" required value={lastName} onChange={e => setLastName(e.target.value)}/>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
              </div>
              {isLoading ?  <Button className="w-full" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button> : <Button type="submit" className="w-full">
                Create an account
              </Button>}
              {/* <Button variant="outline" className="w-full">
                Sign up with GitHub
              </Button> */}
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/signin" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <Toaster />
    </div>

  )
}

export default Signup;