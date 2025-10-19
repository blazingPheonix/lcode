import { requireAuth, requireUnauth } from "@/lib/auth-utils"
import { LoginForm } from "@/src/features/auth/components/login-form"


const page = async () => {
  
  await requireUnauth(); 

  return (
      <div>
          <LoginForm></LoginForm>
    </div>
  )
}

export default page