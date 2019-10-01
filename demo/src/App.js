import React from 'react';
import './App.css';
import axios from "axios";
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      myData: [],
      followers: []
    }
  }
  componentDidMount(){
    axios
      .get("https://api.github.com/users/kukicako")
      .then(res => {
        console.log(res)
        const test = Object.values(res.data)
        this.setState({
          myData: res.data
        })
      })
      .catch(err => console.log(err))
      axios
      .get("https://api.github.com/users/kukicako/followers")
      .then(res =>{
        console.log(res.data);
        const user = res.data.map(person =>{
          return person.login;
        })
        this.setState({
          followers: res.data
        })
       
         user.forEach(follower =>{
            axios
            .get(`https://api.github.com/users/${follower}`)
            .then(res => {
              console.log(res.data)
              this.setState({
                followers: res.data
              })
            })
          })
        })
      .catch(err => {
        console.log("Sorry went wrong -->", err)
      });
  }
  render(){
    return (
      <div className="App">
        <div className="follower">
          {this.state.myData.map(me => (
            <div>
              <img width="10%" src={me.avatar_url} key={me.id} />
              <p>{me.Name}</p>
              <p>{me.login}</p>
              <p>{me.location}</p>
              <p>{me.followers}</p>
            </div>
          ))} 
          {this.state.followers.map(follower => (
            <div>
              <img width="10%" src={follower.avatar_url} key={follower.id} />
              <p>{follower.name}</p>
              <p>{follower.login}</p>
              <p>{follower.location}</p>
              <p>{follower.followers}</p>
            </div>
          ))} 
        </div>
      </div>
    );
  }
}
export default App;



