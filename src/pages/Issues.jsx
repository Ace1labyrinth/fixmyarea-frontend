import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { getAllIssues, deleteSingleIssue, updateIssue } from "../Api/issueService";
import { lgaOptions } from "../data/lgas";

// 📍 Component
const Issues = () => {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);
  const [editingIssue, setEditingIssue] = useState(null);

  // 📥 Fetch Issues on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllIssues();
        setIssues(data);
      } catch (err) {
        console.error("Failed to fetch issues:", err);
      }
    };

    fetchData();
  }, []);

  // 🗑 Delete Handler
  const handleDelete = async (id) => {
    try {
      await deleteSingleIssue(id);
      setIssues(issues.filter((issue) => issue._id !== id));
    } catch (err) {
      console.error("Error deleting issue:", err);
    }
  };

  // ✏️ Update Handler (placeholder: update function must be passed)
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Replace updateIssue with your actual update service function
      await updateIssue(editingIssue._id, editingIssue);
      alert("Issue updated!");
      setEditingIssue(null);

      // Refetch issues after update
      const data = await getAllIssues();
      setIssues(data);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <BackButton onClick={() => navigate(-1)}>Previous</BackButton>
        <Title>Reported Issues In Your Area</Title>

        {issues.length === 0 ? (
          <EmptyMessage>No issues have been reported yet.</EmptyMessage>
        ) : (
          <Grid>
            {issues.map((issue) => (
              <Card key={issue._id}>
                {issue.image && <Image src={issue.image} alt="Reported Issue" />}
                <Info>
                  <Category>{issue.category}</Category>

                  <Text><strong>Location:</strong> {issue.location}</Text>
                  {issue.geo && (
                    <Text>
                      <strong>Co-ordinates:</strong> {issue.geo.lat.toFixed(4)}, {issue.geo.lng.toFixed(4)}
                    </Text>
                  )}
                  <Text><strong>Description:</strong> {issue.description}</Text>
                  <Text><strong>Date:</strong> {new Date(issue.createdAt).toLocaleString()}</Text>
                  <Text><strong>LGA:</strong> {issue.lga}</Text>
                </Info>

                {editingIssue && editingIssue._id === issue._id ? (
                  <EditForm onSubmit={handleUpdate}>
  <Select
    value={editingIssue.category}
    onChange={(e) => setEditingIssue({ ...editingIssue, category: e.target.value })}
  >
    <option value="Pothole">Pothole</option>
    <option value="Streetlight">Broken Streetlight</option>
    <option value="Flooding">Flooding</option>
    <option value="Blocked Gutter">Blocked Gutter</option>
    <option value="Other">Other</option>
  </Select>

  <Input
    type="text"
    value={editingIssue.location}
    onChange={(e) => setEditingIssue({ ...editingIssue, location: e.target.value })}
    placeholder="Location"
  />

  <TextArea
    value={editingIssue.description}
    onChange={(e) => setEditingIssue({ ...editingIssue, description: e.target.value })}
    placeholder="Description"
  />

  <Select
    value={editingIssue.lga}
    onChange={(e) => setEditingIssue({ ...editingIssue, lga: e.target.value })}
  >
    <option value="">Select LGA</option>
    {lgaOptions.map((lga) => (
      <option key={lga} value={lga}>{lga}</option>
    ))}
  </Select>

  <div>
    <SubmitButton type="submit">Update</SubmitButton>
    <CancelButton type="button" onClick={() => setEditingIssue(null)}>Cancel</CancelButton>
  </div>
</EditForm>
                ) : (
                  <div>
                    <Button onClick={() => setEditingIssue(issue)}>✏️ Edit</Button>
                    <DeleteButton onClick={() => handleDelete(issue._id)}>🗑 Delete</DeleteButton>
                  </div>
                )}
              </Card>
            ))}
          </Grid>
        )}
      </motion.div>
    </Container>
  );
};

export default Issues;

const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  color: #2e2e2e;
  margin-bottom: 2rem;
`;

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const BackButton = styled.button`
  background: transparent;
  color: #4cb8b3;
  border-radius: 5px;
  border: 1px solid #4cb8b3;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    background: #4cb8b3;
    color: #fff;
  }
`;

const Button = styled.button`
  background: #0f52ba;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  margin-top: 1rem;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    background-color: #0c4196;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #198754;
  &:hover {
    background-color: #157347;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  &:hover {
    background-color: #5a6268;
  }
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-left: 5px solid #0f52ba;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
`;

const Info = styled.div`
  margin-top: 1rem;
`;

const Text = styled.p`
  margin: 0.3rem 0;
  color: #555;
  font-size: 0.95rem;
`;

const Category = styled.h3`
  margin: 0;
  color: #222831;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #888;
  margin-top: 4rem;
`;

const EditForm = styled.form`
  margin-top: 1rem;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
`;

const TextArea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
`;

const Select = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #aaa;
`;

