import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

import { FcGoogle} from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import React, { useState } from 'react'
import { SignInFlow } from '../types';

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
};

function SignInCard( {setState}: SignInCardProps ) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Card className='w-full h-full p-8'>
      <CardHeader className='px-0 pt-0 font-bold text-2xl'>
        Login to continue
      <CardDescription className='font-normal'>  
        Use your email or another to continue
      </CardDescription>
      </CardHeader>
      <CardContent className='space-y-5 px-0 pb-0'>
        <form className='space-y-2.5'>
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            type='email'
            required
            />

          <Input
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Passowrd'
            type='password'
            required
            />
          <Button type='submit' className='w-full' size="lg" disabled={false}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className='flex flex-col gap-y-2.5'>
          <Button 
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            size={'lg'}
            className='w-full relative'
          >
            <FcGoogle className='size-5 absolute top-2.5 left-2.5'/>
            Continue with Google
          </Button>

          <Button 
            disabled={false}
            onClick={() => {}}
            variant={'outline'}
            size={'lg'}
            className='w-full relative'
          >
            <FaGithub className='size-5 absolute top-2.5 left-2.5'/>
            Continue with Github
          </Button>
        </div>

        <p className='text-xs text-muted-foreground'>
          Don&apos;t have an account? <span onClick={() => setState("signUp")} className='text-sky-700 hover:underline cursor-pointer'>Sign in</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default SignInCard;
