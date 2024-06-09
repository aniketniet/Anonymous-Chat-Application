import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Password() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8081/changepassword", { password })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("Password Changed Successfully");
          setPassword("");
          navigate("/chatpage");
        } else {
          alert("Something went wrong!");
          setPassword("");
        }
      });
  };

  return (
    <div>
      <dialog id="my_modal_6" className="modal ">
        <div className="modal-box bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <div className="flex items-center justify-center">
              <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h1 className="text-center text-2xl font-bold mb-6">
                  Change Password
                </h1>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Enter New Password
                    </label>
                    <input
                      className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="Make a strong password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Password;
