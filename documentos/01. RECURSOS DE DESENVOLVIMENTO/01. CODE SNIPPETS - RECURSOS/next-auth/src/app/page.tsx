import SignInButton from "@/components/signInButtons";
import { authConfig } from "@/lib/auth";
import { getServerSession } from 'next-auth'
import { redirect } from "next/navigation";
import Link from "next/navigation";



export default async function Home() {
  const session = await getServerSession(authConfig)
  if(session){
    return redirect('/app')
  }else{
    return (
      <div>
        Não autenticado
        <SignInButton />
      </div>
    )
  }
}
