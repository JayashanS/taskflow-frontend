import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const useAuth = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  return { user, isAuthenticated };
};

export default useAuth;
