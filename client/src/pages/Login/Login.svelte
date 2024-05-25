<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../../stores/generalStore.js"
    import { fetchPost } from "../../util/api.js"
    import toast, {Toaster } from "svelte-french-toast"
  import { loadSession } from "../../stores/sessionStore.js";

    let email;
    let password;

    async function handleLogin(event){
        event.preventDefault();

        const bodyElements = {
          email: email,
          password: password
        }
        
        const result = await fetchPost($BASE_URL + "/api/login", bodyElements)
        if(result.data === true ){
          console.log("finding session data now")
          await loadSession();
          console.log("found the session data")
          navigate("/home")
        } else {
          toast.error("Incorrect Email or Password")
        }
    }

</script>
<Toaster /> 
<div class="container">
    <h1>Login</h1>
    <form on:submit={handleLogin}>
        <input type="email" name="email" placeholder="Email" bind:value={email}>
        <input type="password" name="password" placeholder="Password" bind:value={password}>
        <input type="submit" value="login">
      </form>
</div>

<style>
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: #333;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2);
    }
  
    input {
      padding: 10px;
      font-size: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
    
    }
  
    input[type="submit"] {
      background-color: #555;
      color: white;
      border: none;
      cursor: pointer;
      font-weight: bold;
      
    }
  
    input[type="submit"]:hover {
      background-color: #777;
    }
  </style>

