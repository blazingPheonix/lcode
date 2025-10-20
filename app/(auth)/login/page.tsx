import { requireAuth, requireUnauth } from "@/lib/auth-utils"
import { LoginForm } from "@/src/features/auth/components/login-form"


const page = async () => {
  
  await requireUnauth(); 

  return (
      <div className="flex justify-center items-center min-h-svh">
          <LoginForm></LoginForm>
    </div>
  )
}

export default page