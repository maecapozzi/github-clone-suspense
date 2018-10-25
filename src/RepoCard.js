import React from "react";
import styled from "styled-components";

const Card = styled.div`
  height: 500px;
  background-color: mediumseagreen;
  color: white;
  margin: 20px;
`;

const RepoCard = ({ name, forks, openIssues }) => (
  <Card>
    <div>{name}</div>
    <div>Forks: {forks}</div>
    <div>Issues: {openIssues}</div>
  </Card>
);

export default RepoCard;
