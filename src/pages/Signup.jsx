import signupImg from "../assets/Images/img5.jpeg"
import Template from "../components/core/Template"

function Signup() {
  return (
    <Template
      title="Get Started with Nivesto!"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup;