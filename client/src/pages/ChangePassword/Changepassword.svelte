<script>
import toast, { Toaster } from "svelte-french-toast";
import { fetchPatch } from "../../util/api";
import { navigate } from "svelte-navigator";
import { BASE_URL } from "../../stores/generalStore";

let email;

async function handleResetPassword(event) {
  event.preventDefault();

  const bodyElements = {
    email: email,
  };
  const result = await fetchPatch($BASE_URL + "/auth/changepassword", bodyElements);
  if (result.data === "password reset requested") {
    toast.success("If the User exists, an Email with a new password will be sent to it");
  }
  navigate("/login");
}

</script>


<Toaster /> 
<div class="container">
    <h1>Sumbit Email</h1>
    <form on:submit={handleResetPassword}>
        <input type="email" name="email" placeholder="Email" bind:value={email}>
        <input type="submit" value="Reset Password">
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