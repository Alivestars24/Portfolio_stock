import { RiEditBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import img from "../../../assets/Images/profile.jpg"
import { RiFileCopyLine, RiShareLine } from "react-icons/ri";

export default function MyProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile?.user || null); // Ensure user exists
  const navigate = useNavigate();
  console.log(user)

  // Debugging logs
  useEffect(() => {
    console.log("User Data:", user);
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">
          Loading data or incorrect API responses. Please try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-3 text-3xl font-medium text-black">
        Hello, {user.username}! 👋
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblue-500 bg-llblue py-3 px-8">
        <div className="flex items-center gap-x-4">
          <img
            src={img}
            alt={"Profile"}
            className="aspect-square w-[82px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-3xl font-semibold text-ddblue">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-4 flex flex-col gap-y-2 rounded-md border-[1px] border-richblue-500 bg-llblue p-3 px-8">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-semibold text-richblue-900">User Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-sm text-ddblue">First Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.firstName || "N/A"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">Email</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-1 text-sm text-ddblue">Last Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.lastName || "N/A"}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm text-ddblue">User Name</p>
              <p className="text-md font-medium text-richblue-900">
                {user?.username || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
