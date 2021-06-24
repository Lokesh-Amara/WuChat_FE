import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4"></div>
          <div
            className="col-4 "
            style={{ backgroundColor: "#FFFFFF", padding: "0px" }}
          >
            <div>
              <h3 id="userNameHeading"></h3>
              <a href={window.location.href} target="_blank" id="newChatDiv">
                <i className="fas fa-plus"></i> <b>Chat</b>
              </a>
              <div className="input-group mt-3 ">
                <input
                  type="text"
                  id="roomInputBox"
                  className="form-control"
                  placeholder="Enter any room to join..."
                  style={{
                    border: "none",
                    borderBottom: "0.125rem solid rgba(19, 19, 21, 0.6)",
                  }}
                ></input>
                <button
                  id="joinRoomButton"
                  className="btn  border"
                  type="button"
                >
                  Join Room
                </button>
              </div>
              <div
                id="messages-container"
                style={{ height: "400px" }}
                className="border border-bottom-0  mt-5"
              ></div>
              <div className="input-group  " style={{ margin: "0px" }}>
                <input
                  type="text"
                  id="inputBox"
                  className="form-control"
                  placeholder="Type message..."
                  style={{
                    border: "none",
                    borderBottom: "0.125rem solid rgba(19, 19, 21, 0.6)",
                  }}
                ></input>
                <button
                  id="sendButton"
                  className="btn btn-outline-primary border-0"
                  type="button"
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 "></div>
        </div>
      </div>
    </div>
  );
}

export default App;
