<script>
  import { onMount } from "svelte";
  import io from "socket.io-client";

  let messages = ["hej"];
  let message = '';
  let socket;

  onMount(() => {
    socket = io('http://localhost:8080');

    socket.on('chat message', (msg) => {
      messages = [...messages, msg];
      console.log("Message received in frontend", msg, messages);
    });

    return () => {
      socket.disconnect();
    };
  });

  function sendMessage() {
    if (message.trim()) {
      socket.emit('chat message', message);
      console.log("Message sent from frontend:", message);
      message = '';
    }
  }
</script>

<style>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 140px); 
    padding: 20px;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    color: black;
  }

  .loaded-messages{
    color: black;
    background-color: lightskyblue;
    width: auto;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  .message-input {
    display: flex;
    gap: 10px;
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
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
</style>

<div class="chat-container">
  <div class="messages">
    {#each messages as msg (msg)}
      <div class="loaded-messages">{msg}</div>
    {/each}
  </div>
  <div class="message-input">
    <input type="text" bind:value={message} on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
    <button on:click={sendMessage}>Send</button>
  </div>
</div>
