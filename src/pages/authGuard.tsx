import { useEffect } from "react";
import { useRouter } from "next/router";

const AuthGuard = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    useEffect(() => {
      if (!token) {
        console.log("❌ No token found, redirecting to /");
        router.push("/");
      }
    }, [token]);

    if (!token) return null; // Prevent page render while redirecting

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
