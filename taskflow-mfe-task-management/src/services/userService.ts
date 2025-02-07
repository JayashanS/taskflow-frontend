export interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

export const fetchAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/users/id"); // Adjust the URL to your backend endpoint

    // Check if the response status is OK (status code 200)
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // Parse the JSON response
    const data = await response.json();

    // Return the list of users
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array in case of an error
  }
};

export default fetchAllUsers;
