const socket = io("https://wuchat-be.herokuapp.com/");

socket.on("receive-message", (data) => {
  if (data.room === newRoom) {
    displayMessage(data.message, data.username, "left");
    updateScroll();
  }
});

socket.on("user-connected", (uname) => {
  displayMessage(`${uname} joined`, uname, "center");
  updateScroll();
});

socket.on("user-disconnected", (data) => {
  displayMessage(`${data} disconnected!`, data, "center");
  updateScroll();
});

socket.on("room-joined-status", (message, user) => {
  displayMessage(message, user, "center");
  updateScroll();
});

const messageContainer = document.getElementById("messages-container");
const inputBox = document.getElementById("inputBox");
const sendButton = document.getElementById("sendButton");
const roomInputBox = document.getElementById("roomInputBox");
const joinRoomButton = document.getElementById("joinRoomButton");

var username;
callPromptFunc();

sendButton.addEventListener("click", function () {
  const message = inputBox.value;
  if (message === "") return;
  socket.emit("send-message", message, username, newRoom);
  displayMessage(message, username, "right");
  updateScroll();
  inputBox.value = "";
});

var previousRoom = "";
var newRoom = roomInputBox.value;

joinRoomButton.addEventListener("click", function () {
  previousRoom = newRoom;
  newRoom = roomInputBox.value;

  socket.emit("join-room", previousRoom, newRoom, username, (message, user) => {
    displayMessage(message, user, "center");
  });
});

function displayMessage(message, uname, pos) {
  const divChild = document.createElement("div");
  divChild.classList.add("message_div");
  divChild.style.display = "block";
  divChild.style.margin = "2px 4px 0px 4px";
  divChild.style.width = "50%";
  divChild.style.position = "relative";
  divChild.style.backgroundColor = "white";
  const div2Child = document.createElement("span");

  if (pos === "right") {
    divChild.style.left = "49%";
    div2Child.innerHTML = ` <p class="message_head_sender ms-2"><b>${uname}</b></p><p class="message_body">${message}</p> `;
  } else if (pos === "left") {
    div2Child.innerHTML = ` <p class="message_head_receiver ms-2"><b>${uname}</b></p><p class="message_body">${message}</p> `;
  } else {
    divChild.style.left = "30%";
    divChild.style.backgroundColor = "#f6f8fa";
    div2Child.style.color = "black";
    div2Child.innerHTML = ` <p class="message_body">${message}</p> `;
    div2Child.classList.add("message_status_box");
  }
  div2Child.classList.add("text-start");
  divChild.append(div2Child);
  messageContainer.append(divChild);
}

function updateScroll() {
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

function callPromptFunc() {
  customPrompt();
}

function closePromptBox() {
  username = document.getElementById("nameinputBox").value;
  if (username !== "") {
    promptBox = document.getElementById("promptBox");
    promptClose = document.getElementById("promptClose");

    promptBox.parentNode.removeChild(promptBox);
    promptClose.parentNode.removeChild(promptClose);

    document.getElementById("userNameHeading").innerText = username;
    displayMessage("You joined", username, "center");
    socket.emit("new-user", username);
  }
}

function customPrompt() {
  var id = "promptBox",
    promptBox,
    closeId = "promptClose",
    promptClose;
  promptBox = document.createElement("div");

  promptBox.id = id;
  var inputbox = document.createElement("input");
  inputbox.id = "nameinputBox";
  inputbox.placeholder = "Enter your name...";
  promptBox.appendChild(inputbox);
  var bttn = document.createElement("button");
  bttn.id = "bttn";
  bttn.classList.add("btn", "ms-3");
  bttn.innerText = "submit";
  bttn.onclick = closePromptBox;
  promptBox.appendChild(bttn);
  document.body.appendChild(promptBox);
  promptClose = document.createElement("div");
  promptClose.id = closeId;
  document.body.appendChild(promptClose);
}
