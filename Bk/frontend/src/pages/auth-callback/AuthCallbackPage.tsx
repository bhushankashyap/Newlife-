import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Legacy redirect - no longer needed with custom auth
const AuthCallbackPage = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate("/"); }, []);
  return null;
};
export default AuthCallbackPage;
