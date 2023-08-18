import { useState, FormEvent } from "react";
import { CheckBadgeIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { useMutateAuth } from "../hooks/useMutateAuth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { loginMutation, registerMutation } = useMutateAuth();

  const submitAuthHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({ email, password });
    } else {
      await registerMutation.mutateAsync({ email, password }).then(() => {
        loginMutation.mutate({ email, password });
      });
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center">
        <CheckBadgeIcon className="w-8 h-8 mr-2 text-blue-500" />
        <span className="text-center text-3xl font-extrabold">
          Todo app by React/Go(echo)
        </span>
      </div>
      <h2 className="my-6">{isLogin ? "Login" : "Create a new account"}</h2>
      <form onSubmit={submitAuthHandler}>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            type="email"
            name="email"
            placeholder="Email address"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <input
            className="mb-3 px-3 text-sm py-2 border border-gray-300"
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="flex justify-center my-2">
          <button
            className="disabled:opacity-40 disabled:cursor-not-allowed py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded focus:outline-none"
            type="submit"
            disabled={!email || !password}
          >
            {isLogin ? "Login" : "Sign up"}
          </button>
        </div>
      </form>
      <ArrowPathIcon
        onClick={() => setIsLogin(!isLogin)}
        className="w-6 h-6 my-2 text-blue-500 cursor-pointer"
      />
    </div>
  );
};
