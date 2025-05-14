import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState } from "react";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

function SignUpCard({ setState }: SignUpCardProps) {
  const { signIn } = useAuthActions(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const [pending, setPending] = useState(false);

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    setPending(true);

    signIn("password", {email, name, password, flow: "signUp"})
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      })
  }

  const handleProviderSignUp = (value: "github" | "google") => {
    setPending(true);
    signIn(value)
      .finally(() => {
        setPending(false);
      })
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="p-0">
       <CardTitle className="text-2xl">
        Sign up to continue
       </CardTitle>
        <CardDescription className="font-normal">
          Use your email or another to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
          <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
            <TriangleAlert className="size-4"/>
            <p>{error}</p>
          </div>
        )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />

          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
          />

          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />

          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Passowrd"
            type="password"
            required
          />
          <Button 
            type="submit" 
            className="w-full cursor-pointer" 
            size="lg" 
            disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("google")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative cursor-pointer"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>

          <Button
            disabled={pending}
            onClick={() => handleProviderSignUp("github")}
            variant={"outline"}
            size={"lg"}
            className="w-full relative cursor-pointer"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignUpCard;
