/* eslint-disable react/prop-types */
import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuth, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });

  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(e) {
    e.preventDefault();
    const data = await registerService(signUpFormData);
  }

  async function handleLoginUser(e) {
    e.preventDefault();
    const data = await loginService(signInFormData);
    if (data.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(data.data.accessToken)
      );

      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  //check auth user

  async function checkAuthUser() {
    try {
      const data = await checkAuth();

      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });

        setLoading(false);
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    } catch (error) {
      if (!error.response.data.success) {
        setAuth({
          authenticate: false,
          user: null,
        });
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
      }}
    >
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
