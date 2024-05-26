<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";
  import { session } from '../../stores/sessionStore.js';
  import { get } from 'svelte/store';

  let messages = []; //Arrayet der skal indeholde alle de beskeder som bliver sendt
  let message = ''; // Variablen som skal indeholde værdien af den besked som skal sendes
  let socket;
  let userSession;

  onMount(() => {
    // Subscribe to session store
    const unsubscribe = session.subscribe(value => {
      userSession = value;
    });

    // Connect to the Socket.IO server
    socket = io('http://localhost:8080'); // Ensure the URL scheme is correct

    // Listen for incoming chat messages
    socket.on('chat message', (msg) => {
      console.log('Message received in frontend', msg); // Log received messages
      messages = [...messages, msg]; // Spread operator to trigger reactivity
    });

    // Disconnect the socket and unsubscribe from the store when the component is destroyed
    return () => {
      socket.disconnect();
      unsubscribe();
    };
  });

  // Function to send a message
  function sendMessage() {
    if (message.trim()) {
      const {username, email} = $session; // Get the current session user
      const chatMessage = {
        text: message,
        username: username,
        email: email
      };
      socket.emit('chat message', chatMessage); // Emit the message object to the server
      console.log("Message sent from frontend:", chatMessage); // Log the sent message
      message = ''; // Clear the message input
    }
  }
</script>

<div class="chat-container">
  <div class="messages">
    {#each messages as msg (msg.text)}
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
    height: calc(100vh - 140px); /* Adjust according to navbar height */
    padding: 20px;
    width: 800px;
    margin: 0 auto; /* Center the chat container horizontally */
    justify-content: space-between; /* Space out the elements within the container */
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
  }

  .message-input {
    display: flex;
    gap: 10px;
    width: 100%; /* Ensure the input field takes the full width */
    justify-content: center; /* Center the input field horizontally */
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: black; /* Ensure the input text color is visible */
    background-color: white; /* Ensure the background color contrasts with the text color */
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
    align-self: flex-start; /* Default alignment */
  }

  .message.user {
    background-color: gray;
    align-self: flex-end; /* Align user's messages to the right */
    text-align: right; /* Ensure text inside the bubble is aligned to the right */
  }

  .message.other {
    background-color: blue;
    align-self: flex-start; /* Align other users' messages to the left */
    text-align: left; /* Ensure text inside the bubble is aligned to the left */
  }
</style>
