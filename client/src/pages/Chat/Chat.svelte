<script>

    let messages = [];
    let message = '';

    function sendMessage() {
        console.log("Hello");
    }

</script>

<style>
    .chat-container {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 140px); /* Adjust according to navbar height */
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
      {#each messages as msg}
        <div>{msg}</div>
      {/each}
    </div>
    <div class="message-input">
      <input type="text" bind:value={message} on:keydown={(e) => e.key === 'Enter' && sendMessage()} />
      <button on:click={sendMessage}>Send</button>
    </div>
  </div>