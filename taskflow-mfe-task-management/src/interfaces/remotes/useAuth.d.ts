declare module "host/useAuth" {
  const useAuth: () => { user: any; isAuthenticated: boolean };
  export default useAuth;
}
