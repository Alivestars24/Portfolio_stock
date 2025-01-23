import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { signUp } from "../../services/oparations/authAPI"
import { setSignupData } from "../../slices/authSlice"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",  
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword, userName} = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
    }
    dispatch(setSignupData(signupData));
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userName,
    } = signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        navigate,
        userName
      ))
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
    })
  }

  return (
    <div>
      {/* Form */}
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full"
            />
          </label>
        </div>
        <label className="w-full">
          <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full"
          />
        </label>
        <label className="w-full">
          <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
            User Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="userName"
            value={userName}
            onChange={handleOnChange}
            placeholder="Enter your preferred User Name"
            className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full"
          />
        </label>
      
        <div className="flex gap-x-4">
          <label className="relative w-full">
            <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[22px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-full">
            <p className="mb-1 text-[0.675rem] leading-[0.775rem] text-richblue-500">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="bg-blue-5 text-richblue-600 py-1 px-3 rounded-md w-full!pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[22px] z-[10] cursor-pointer"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={22} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="bg-blu text-richblack-800 py-2 px-6 rounded-md mt-4 w-full"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupForm
