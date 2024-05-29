<script>
import { onMount } from "svelte";
import io from "socket.io-client";
import { session } from "../../stores/sessionStore.js";
import { messagesStore } from "../../stores/messageStore.js";
import { get } from "svelte/store";

let message = ""; 
let socket;
let userSession;

onMount(() => {
  const unsubscribe = session.subscribe((value) => {
    userSession = value;
  });

  socket = io("http://localhost:8080"); 

  socket.on("chat message", (msg) => {
    messagesStore.update((messages) => {
      if (!messages.some((m) => m.id === msg.id)) {
        return [...messages, msg];
      }
      return messages;
    });
  });


  return () => {
    socket.disconnect();
    unsubscribe();
  };
});

function sendMessage() {
  if (message.trim()) {
    const { username, email } = get(session); 
    const chatMessage = {
      id: Date.now(),
      text: message,
      username: username,
      email: email,
    };
    socket.emit("chat message", chatMessage); 
    messagesStore.update((messages) => [...messages, chatMessage]);
    message = "";
  }
}
</script>

<div class="chat-container">
  <div class="messages">
    {#each $messagesStore as msg (msg.id)}
      <div class="message {msg.email === userSession?.email ? 'user' : 'other'}">
        <strong>{msg.username}</strong> 
        <br>
        {msg.text}
      </div>
    {/each}
  </div>
  <div class="message-input">
    <input type="text" bind:value={message} on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
    <button on:click={sendMessage}>Send</button>
  </div>
</div>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 140px); 
    padding: 20px;
    width: 800px;
    margin: 0 auto; 
    justify-content: space-between; 
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
  }

  .message-input {
    display: flex;
    gap: 10px;
    width: 100%; 
    justify-content: center; 
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black; 
    background-color: white; 
  }

  button {
    padding: 10px 20px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    background-color: #333;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #555;
  }

  .message {
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 10px;
    max-width: 60%;
    min-width: 30%;
    align-self: flex-start; 
  }

  .message.user {
    background-color: gray;
    align-self: flex-end; 
    text-align: right; 
  }

  .message.other {
    background-color: blue;
    align-self: flex-start; 
    text-align: left; 
  }
</style>
