export const createUser = jest.fn(() => Promise.resolve({ success: true }));
export const editUser = jest.fn(() => Promise.resolve({ success: true }));

export default {
  createUser,
  editUser,
};
