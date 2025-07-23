import axios from "axios";

const API_URL = "https://fixmyarea-backend.onrender.com/api/issues";



//add new issue

export const createIssue = async (issueData) => {
    const res = await axios.post(API_URL, issueData);
  return res.data;

};

//fetch all issues

export const getAllIssues = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};


export const deleteSingleIssue = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorText = await response.text(); // Catch HTML error response
      throw new Error(`Error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting issue:', error);
    throw error;
  }
};

export const updateIssue = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};



// export const deleteSingleIssue = async (id) => {
//   const res = await fetch(`http://localhost:5000/api/issues/${id}`, {
//     method: "DELETE",
//   });
//   const data = await res.json();
//   return data;
// };
