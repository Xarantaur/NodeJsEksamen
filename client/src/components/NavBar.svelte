<script>
    import { Link } from "svelte-navigator";
    import { session } from "../stores/sessionStore.js";
    import { navigate } from "svelte-navigator";

    function handleLogout(){

      session.set(null);
      console.log($session)
      navigate("/login");

    }
  </script>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      padding: 10px 20px;
      width: 100%;
      height: 80px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
    }
  
    .logo {
      color: white;
      font-weight: bold;
      font-size: 1.5em;
      padding-left: 40px;
    }
  
    .nav-links {
      display: flex;
      gap: 30px;
      margin-left: 50px;
    }
  
    .auth-buttons {
      display: flex;
      gap: 10px;
    }
  
  
    button {
      background-color: #555;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-weight: bold;
    }
  
    button:hover {
      background-color: #777;
    }
  </style>
  
  <nav>
    <div class="logo">Logo</div>
    <div class="nav-links">
      <Link to="/">Home</Link>
      <Link to="/drinks">Drinks</Link>
      <Link to="/chat">Chat</Link>
    </div>
    {#if $session}
    <div class="auth-buttons">
      <button on:click={handleLogout}>Logout</button>
    </div>
  {:else}
    <div class="auth-buttons">
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  {/if}
  </nav>