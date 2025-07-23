import React, { useState } from "react";

import { createIssue } from "../Api/issueService";

import styled from "styled-components";

import { useNavigate } from "react-router-dom"; 

import { motion } from "framer-motion";

import LeafletPicker from "../components/LeafletPicker";

import { lgaOptions } from "../data/lgas";

const Report = () => {
  const [category, setCategory] = useState("Pothole");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [lga, setLga] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [geoLocation, setGeoLocation] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Submit clicked");

  const processSubmission = async (base64Image) => {
    const newIssue = {
      category,
      description,
      location,
      lga,
      image: base64Image || null,
      geo: geoLocation || null,
    };

    try {
      const res = await createIssue(newIssue);
      console.log("✅ Issue saved to backend:", res);
      setSuccess(true);

      // Reset form
      setCategory("");
      setDescription("");
      setLocation("");
      setLga("");
      setImage(null);
      setGeoLocation(null);

      // Navigate after short delay
      setTimeout(() => {
        navigate("/issues");
      }, 2000);
    } catch (err) {
      console.error("Failed to submit issue to backend:", err);
      setSuccess(false);
    }
  };

  if (image) {
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Reader finished loading image, preparing payload....");
      processSubmission(reader.result);
    };
    reader.readAsDataURL(image);
  } else {
    processSubmission(null);
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
        <Title>Report an Issue</Title>
        <form onSubmit={handleSubmit}>
          <Label>Issue Type</Label>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Pothole">Pothole</option>
            <option value="Streetlight">Broken Streetlight</option>
            <option value="Flooding">Flooding</option>
            <option value="Blocked Gutter">Blocked Gutter</option>
            <option value="Other">Other</option>
          </Select>

          <Label>Description</Label>
          <Textarea
            rows=""
            placeholder="Describe the issue briefly..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <Label>Location</Label>
          <Input
            type="text"
            placeholder="E.g., Sangotedo under bridge, near shoprite"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <Label>Local Government Area (LGA)</Label> 
          <Select value={lga} onChange={(e) => setLga(e.target.value)} required>
            <option value="">-- Select LGA --</option>
            {lgaOptions.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </Select>

          <Label>Pin Fault Location (Optional)</Label>
          <LeafletPicker onLocationSelect={(loc) => setGeoLocation(loc)} />

          <Label>Upload photo</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {success && <Success>✅ Issue reported successfully!</Success>}

          <Button type="submit">Submit Report</Button>

        </form>
      </motion.div>
    </Container>
  );
};

export default Report;

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    padding: 2.5rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #2e2e2e;
`;
const Label = styled.label`
  font-weight: bold;
  margin-top: 1rem;
  display: block;
`;

const Input = styled.input`
  padding: 0.8rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.3rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.3rem;
  resize: vertical;
`;

const Select = styled.select`
  padding: 0.8rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 0.3rem;
`;

const BackButton = styled.button`
  background: transparent;
  color: #4cb8b3;
  border: 1px solid #4cb8b3;
  border-radius: 5px;
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
  background: #4cb8b3;
  color: #fff;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 5px;
  margin-top: 2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Success = styled.p`
  color: green;
  margin-top: 1rem;
`;
