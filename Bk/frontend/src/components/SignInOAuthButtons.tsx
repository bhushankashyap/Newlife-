// Legacy component - superseded by AuthPage
import { Link } from "react-router-dom";
const SignInOAuthButtons = () => (
  <Link to="/auth" className="px-4 py-2 rounded-xl bg-violet-600 text-white text-xs font-bold hover:bg-violet-500 transition-colors">
    Sign In
  </Link>
);
export default SignInOAuthButtons;
