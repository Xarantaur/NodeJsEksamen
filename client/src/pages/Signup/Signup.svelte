<script> 
import { navigate } from "svelte-navigator";
import { BASE_URL } from "../../stores/generalStore.js"
import { fetchPost } from "../../util/api.js";
import  toast, { Toaster } from "svelte-french-toast"
  import { loadSession } from "../../stores/sessionStore.js";

let email;
let password;
let confirmPassword;



async function handleSignUp(event){
    event.preventDefault();
    if(password !== confirmPassword){
        toast.error("Password's Doesn't Match")
        return;
    }
    const bodyElements ={
        email: email,
        password: password
    }
    const result = await fetchPost($BASE_URL + "/api/signup", bodyElements)
    if(result.data === "user created successfully"){
      toast.success("Successfully Signed up")
        await loadSession();
        await new Promise(resolve => setTimeout(resolve, 1000)); // ikke elegant eller effektivt. // ændre dette eller slet helt
        navigate("/profileSetup")
    } else if(result.data === "Email already exists") {
      toast.error("Email Already Exists")
    } else {
        return
    }
}
</script>
<Toaster />
<div class="container">
    <h1>Signup</h1>
    <form on:submit={handleSignUp }>
        <input type="email" name="email" placeholder="Email" bind:value={email}>
        <input type="password" name="password" placeholder="Password" bind:value={password}>
        <input type="password" name="confirmPassword" placeholder="Confirm Password" bind:value={confirmPassword} required>
        <input type="submit" value="signup">
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
