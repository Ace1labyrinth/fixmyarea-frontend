import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();
  return (
    <Nav>
        <Logo to="/">FixMyArea</Logo>
        <NavLinks>
            <StyledLink to="/report" active={location.pathname === "/report" ? 1 : 0}>Report</StyledLink>
            <StyledLink to="/issues" active={location.pathname === "/issues" ? 1 : 0}>View Issues</StyledLink>
        </NavLinks>
    </Nav>
  )
}

export default Navbar;


const Nav = styled.nav`
  background: #4cb8b3;
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
  text-decoration: none;
`;

const NavLinks = styled.div`
display: flex;
gap: 1.2rem;

@media (max-width: 600px){
    margin-top: 1rem;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
}
`
const StyledLink = styled(Link)`
  color: ${(props) => (props.active ? "#5C6B73" : "#fff")};
  font-weight: 500;
  text-decoration: none;
  font-size: 1.2rem;

  
`;