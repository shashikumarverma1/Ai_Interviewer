import { ComponentType, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingScreen from "@/components/lodingscreen";

const AuthGuard = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("/api/tokenVerify"); // Backend API to verify auth
          if (res.data.authenticated) {
            setIsAuthenticated(true);
          } else {
            router.replace("/"); // Redirect to login
          }
        } catch (error) {
          console.error("❌ Authentication failed:", error);
          router.replace("/");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]); // ✅ Added 'router' in dependency array

    if (loading) return <LoadingScreen />; // ✅ Show loading screen while checking auth
    if (!isAuthenticated) return null; // ✅ Prevent rendering before redirect

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default AuthGuard;
