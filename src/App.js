import React, { Component, Suspense, lazy } from "react";
import axios from "axios";
import styled from "styled-components";

const UserProfile = lazy(() => import("./UserProfile"));

const SearchWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const SearchBar = styled.input`
  height: 20px;
  width: 200px;
  border: 1px solid black;
`;

const SearchButton = styled.button`
  height: 30px;
  width: 100px;
`;

const Loading = styled.h1`
  text-align: center;
`;

class App extends Component {
  state = {
    user: "",
    loading: false,
    profile: {},
    repos: []
  };

  handleChange = event => {
    this.setState({ user: event.target.value });
  };

  search = event => {
    const url = `https://api.github.com/users/${this.state.user}`;

    this.setState({ loading: true });
    event.preventDefault();
    axios
      .get(url)
      .then(response => {
        this.setState({ profile: response.data });
        this.getRepos(response.data.repos_url);
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  getRepos = url => {
    axios
      .get(url)
      .then(response => {
        this.setState({ repos: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <SearchWrapper>
          <form onSubmit={this.search}>
            <SearchBar placeholder="search" onChange={this.handleChange} />
          </form>
        </SearchWrapper>
        {this.state.loading ? <Loading>Fetching data</Loading> : null}
        {this.state.repos.length > 0 ? (
          <Suspense fallback={<Loading>Fetching component...</Loading>}>
            <UserProfile
              login={this.state.profile.login}
              repos={this.state.repos}
            />
          </Suspense>
        ) : null}
      </div>
    );
  }
}

export default App;
