<script>
    import { Link } from "svelte-navigator";
    import { session } from "../stores/sessionStore.js";
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../stores/generalStore.js"
    import { fetchPost } from "../util/api.js";
    import toast,{ Toaster } from "svelte-french-toast";
    import StudyLogo from "../../public/StudyLogo.png"

    export async function handleLogout(){

      const response = await fetchPost($BASE_URL + "/auth/logout")
      if(response.data === "Logout Succesful"){
        toast.success("Logout Succesful");
        session.set(null);
        navigate("/login")
      }else {
        toast.error(response.data ?? "Failed to Logout")
      }
    }

  </script>
  
  <Toaster />
  
  <nav>
    <div class="logo"><img src={StudyLogo} alt="Logo"></div>
    <div class="nav-links">
      <Link to="/" style="color: white; text-decoration: none; background-color: #555; padding: 5px 10px; border-radius: 8px; font-weight: bold; display: inline-block;">Home</Link>
      <Link to="/cards" style="color: white; text-decoration: none; background-color: #555; padding: 5px 10px; border-radius: 8px; font-weight: bold; display: inline-block;">Cards</Link>
      <Link to="/chat" style="color: white; text-decoration: none; background-color: #555; padding: 5px 10px; border-radius: 8px; font-weight: bold; display: inline-block;">Chat</Link>
    </div>
    {#if $session}
    <div class="auth-buttons">
      <div class="session-username">
      <Link to="/profile" style="color: rgb(0, 255, 0);">{$session.username}</Link></div>
      <button on:click={handleLogout}>Logout</button>
    </div>
  {:else}
    <div class="auth-buttons">
      <Link to="/login" style="color: white; text-decoration: none; background-color: #555; padding: 5px 10px; border-radius: 8px; font-weight: bold; display: inline-block;">Login</Link>
      <Link to="/signup" style="color: white; text-decoration: none; background-color: #555; padding: 5px 10px; border-radius: 8px; font-weight: bold; display: inline-block;">Signup</Link>
    </div>
  {/if}
  </nav>

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
      height: 100%;
    }

    .logo img {
       height: 100%;
      object-fit: cover; 
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
    .session-username{
      background-color: #555;
        color: rgb(0, 255, 0);
        border: none;
        border-radius: 8px;
        padding: 5px 10px;
        cursor: pointer;
        font-weight: bold;
        text-decoration: none; /* Remove underline from link */
        display: inline-block; /* Ensure the link behaves like a button */
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