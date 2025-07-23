import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assests/backgroundimg.jpg";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  

  return (
    <Container>
      <Title>Welcome to FixMyArea</Title>
      <Subtext>
        Report broken streetlights, potholes, floods, or any problem in your
        area. Let your voice be heard. Help fix your community today.
      </Subtext>
      <ButtonGroup>
        <Button $primary="true" onClick={() => navigate("/report")}>
          Report an Issue
        </Button>
        <Button $primary="true" onClick={() => navigate("/issues")}>
          View Reported Issues
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  min-height: 75vh;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;

  @media (max-width: 600px) {
    h1 {
      font-size: 2.5rem;
    }
    p {
      font-size: 1.2rem;
    }
  }
`;

const Title = styled.h1`
  font-size: 2.9rem;
  color: #eeeee;
  font-weight: 900;
  margin-bottom: 1rem;
`;

const Subtext = styled.p`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 800;
  max-width: 600px;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  background-color: ${(props) => (props.$primary ? "#4cb8b3" : "transparent")};
  color: #fff;
  padding: 0.9rem 1.6rem;
  border: 1px solid #4cb8b3;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 2px 2px 6px #5c6b73, -2px -2px 6px #fff;

  &:hover {
    opacity: 0.9;
  }
  button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }

  @media (max-width: 600px) {
    width: 100%;
    font-size: 0.9rem;
  }
`;
