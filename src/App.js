
import React, { userName } from 'react';
import './App.css';
import axios from 'axios';


class CardList extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.profiles.map((profile) => {
            return (<Card profile={profile}></Card>)
          })
        }
      </div>
    )
  }
}

class Form extends React.Component {
  state = { userName: "" }

  handleInputChange = (event) => {
    this.setState({ userName: event.target.value })
  }
  handHolder = async (event) => {
    event.preventDefault();
    console.log("state", this.state.userName);

    const config = {
      method: "get",
      url: `https://api.github.com/users/${this.state.userName}`,
      headers: {}
    };

    try {
      const response = await axios(config)
      console.log(JSON.stringify(response.data))
      this.props.onReciveDataFromAPI(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <form onSubmit={this.handHolder}>

        <input type={"text"}
          placeholder={"Enter github Usre Name"}
          value={this.state.userName}
          onChange={this.handleInputChange}></input>
        <button >Add the github App</button>
      </form>
    )
  }
}
class Card extends React.Component {
  render() {
    const profile = this.props.profile
    return (
      <div className='github-profile '>

        <img src={profile.avatar_url}></img>
        <div className='info'>
          <div className='name'>{profile.name}</div>
          <div className='company'> {profile.company}</div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    profiles: []
  }
  addNewProfil = (profileData) => {
    console.log("profile...", profileData)
    this.setState({ profiles: [...this.state.profiles, profileData] })
  }
  render() {
    return (
      <div>
        <div className='header'>THE GIT-HUB-APP</div>
        <Form onReciveDataFromAPI={this.addNewProfil}></Form>
        <CardList profiles={this.state.profiles}></CardList>
      </div>
    )
  }
};
export default App;
