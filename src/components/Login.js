import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from 'react-alert';

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated")|| false);
  const alert = useAlert();


  const users = [
    { username: "Pippo", 
      password: "pippo123" 
    },
    { username: "Pippa", 
      password: "pippa123"
    }];

  const handleSubmit = (e) => {
    e.preventDefault()
    setauthenticated(false);
    const account = users.find((user) => user.username === username);
    if (account && account.password === password) {
      setauthenticated(true)
      localStorage.setItem("authenticated", true);
      navigate("/home");
    }
    else {
      alert.show(<div className="text-blue-200">Invalid Username or password</div>);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen text-center">
      <div className="flex flex-col sm:w-1/4 xs:w-[80%] bg-sky-400 p-8 xs:p-2 m-auto drop-shadow-md rounded-xl">
      <h1 className="text-white text-4xl font-sans font-medium text-center">MyWatchList</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 m-5">
              <label className="text-gray-700 text-lg font-small mb-1">Username</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
            </div>
            <div className="flex flex-col gap-2 m-5">
              <label className="text-gray-700 text-lg font-small mb-1">Password</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  name="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
            </div>
            <div className="flex justify-center">
              <input className="bg-sky-50 hover:bg-sky-200 text-gray-700 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer" 
                type="submit"
                value="Login"
              />
            </div>
          </form>
        </div>
    </main>
  )
};

export default Login;