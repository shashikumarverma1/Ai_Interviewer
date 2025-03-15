import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import LoadingScreen from "@/components/lodingscreen";


const AuthGuard = (WrappedComponent: any) => {
  return (props: any) => {
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
            router.replace("/"); // Replace prevents going back
          }
        } catch (error) {
          console.log("❌ Authentication failed:", error);
          router.replace("/");
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (loading) return <LoadingScreen />; // Show loading screen while checking auth
    if (!isAuthenticated) return null; // Prevent rendering before redirect

    return <WrappedComponent {...props} />;
  };
};

export default AuthGuard;
