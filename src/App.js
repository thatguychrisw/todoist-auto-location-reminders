import React, { Component } from "react"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App flex h-screen">
        <div className="m-auto">
          <a href="https://todoist.com/oauth/authorize?client_id=ba6deafb57174b11980797d4c957a701
&scope=data:read_write&state=secret">Authenticate with Todoist</a>
        </div>
      </div>
    )
  }
}

export default App
