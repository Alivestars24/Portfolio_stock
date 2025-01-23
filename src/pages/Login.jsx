import loginImg from "../assets/Images/img4.jpeg"
import Template from "../components/core/Template"

function Login() {
  return (
    <Template
      title="Track Your Wealth with Nivesto"
      description="Enter the details below to Continue "
      image={loginImg}
      formType="login"
    />
  )
}

export default Login