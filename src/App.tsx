import ForgotPassword from "./screens/auth/forgotPassword/forgotPassword"
import ResetPassword from "./screens/auth/forgotPassword/ResetPassword"
import Signup from "./screens/auth/signupLogin"

function App() {
  return (
    <div>
      <Signup/>
      <ForgotPassword/>
      <ResetPassword/>
    </div>
  )
}

export default App