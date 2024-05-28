<script>

</script>

<div class="home-container">
  <h1>Welcome to Our Application</h1>
  <div class="boxes-container">
    <div class="box">
      <h2>MTG Page</h2>
      <p>Explore a collection of Magic: The Gathering cards, view details, and manage your collection.</p>
    </div>
    <div class="box">
      <h2>Chatroom</h2>
      <p>Join the chatroom to communicate with other users in real-time and share your thoughts.</p>
    </div>
    <div class="box">
      <h2>Profile Page</h2>
      <p>Update your profile settings, change your password, and manage your personal information.</p>
    </div>
  </div>
</div>


<style>
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    padding: 20px;
    color: white;
  }

  h1 {
    font-size: 3em;
    margin-bottom: 20px;
  }

  .boxes-container {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }

  .box {
    background: white;
    color: black;
    padding: 20px;
    border-radius: 10px;
    width: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }

  .box:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .box h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  .box p {
    font-size: 1em;
  }
</style>