import React from "react";
import styled from "styled-components";
import RepoCard from "./RepoCard";

const Profile = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const UserProfile = ({ login, repos }) => (
  <Profile>
    <h1>{login}</h1>
    {repos.map(repo => (
      <RepoCard
        name={repo.name}
        forks={repo.forks}
        openIssues={repo.open_issues}
      />
    ))}
  </Profile>
);

export default UserProfile;
