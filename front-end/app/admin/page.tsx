import { Dashboard } from "./components/Dashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function page() {
  const cookiesStore=await cookies()
  const isAdmin=cookiesStore.get("isAdmin")
  console.log(isAdmin)
  if(isAdmin?.value=="True"){
    return (
      <>
        <Dashboard />
      </>
    );
  }else{
    redirect("/authentication")
  }
}
