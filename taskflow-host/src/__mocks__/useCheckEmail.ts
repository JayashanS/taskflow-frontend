export default jest.fn(() => ({
  emailStatus: { isValid: true, message: "" },
  checkEmail: jest.fn(),
}));
