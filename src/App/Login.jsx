import { React, useState  } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Navigate } from "react-router-dom/dist";

const Login = () => {

  const [visible, setVisible] = useState(false);




  const handleVisible = () => {
    setVisible((preve) => !preve);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

            Navigate("/Homepage")
            //redirect("./AdminPage.js")

        // console.log("userData", userData);
      }



  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-500">
          LOGIN
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <div className="mt-1">
                <input
                  type={"text"}
                  id="username"
                  name="username"
                  //value={data.username}
                  //required
                  className="appearance-none block w-full px-3 py-2 mt-4 rounded-md   bg-gray-200  sm:text-sm"
                  //onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password:"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  //value={data.password}
                  //required
                  className="appearance-none block w-full px-3 py-2 mt-4 rounded-md   bg-gray-200  sm:text-sm"
                  //onChange={handleOnChange}
                />
                {visible ? (
                  <AiOutlineEye
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className=" absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[50px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-orange-500 hover:bg-orange-700"
               onClick={handleSubmit}
              >
                LOGIN
              </button>
            </div>


          </form>
        </div>
      </div>
    </div>
  );
};

export default Login