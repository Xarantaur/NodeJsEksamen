<script>
   import { navigate } from "svelte-navigator";
import { BASE_URL } from "../../stores/generalStore";
import { fetchDelete, fetchPatch, fetchPost } from "../../util/api";
import toast, { Toaster } from "svelte-french-toast";
import { loadSession, session } from "../../stores/sessionStore";
import { onMount } from "svelte";

let username;
let age;
let password;

onMount(async () => {
  loadSession();
});

async function handleChangeUser(event) {
  event.preventDefault();

  const bodyElements = {
    email: $session.email,
  };
  if (username) bodyElements.username = username;
  if (age) bodyElements.age = age;
  if (password) bodyElements.password = password;

  const result = await fetchPatch($BASE_URL + "/auth/users", bodyElements);
  if (result.data === "User information updated") {
    toast.success("User Updated");
    navigate("/profile");
    await loadSession();
  } else {
    toast.error("Could not Change Username at this time");
  }
}

async function handleDeleteUser(event) {
  event.preventDefault();

  const bodyElements = {
    email: $session.email,
  };
  try {
    const result = await fetchDelete($BASE_URL + "/auth/users", bodyElements);

    if (result.data === `${$session.email} Deleted Successfully`) {
      toast.success(result.data);
      const response = await fetchPost($BASE_URL + "/auth/logout");
      if (response.data === "Logout Succesful") {
        session.set(null);
        navigate("/login");
      } else {
        toast.error(response.data ?? "Failed to Logout");
      }
    } else {
      toast.error("could not delete user at this point");
    }
  } catch (error) {
    toast.error(error.message);
  }
}
</script>

<Toaster />
{#if $session}
    <h1>{$session.username}'s Profile</h1>
{:else}
    <h1>Loading...</h1>
    {navigate("/login")}
{/if}

<div class="container">
    <form on:submit={handleChangeUser}>
        <input type="username" name="username" placeholder="username" bind:value={username} required >
        <input type="submit" value="Change">
        </form>
    <form on:submit={handleChangeUser}>
        <input type="Age" name="Age" placeholder="age" bind:value={age} required>
        <input type="submit" value="Change">
        </form>
    <form on:submit={handleChangeUser}>
        <input type="text" name="password" placeholder="password" bind:value={password} required>
        <input type="submit" value="Change">
        </form>
        <button on:click={handleDeleteUser}>Delete User</button>
</div>


<style>
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
        }

    form {
      display: flex;
      flex-direction: row;
      gap: 20px;
      background-color: #333;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 10px 12px rgba(0, 0, 0, 0.2);
      margin-bottom: 2em;
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

    button {
      background-color: #555;
      color: white;
      border: none;
      padding: 20px;
      cursor: pointer;
      font-weight: bold;
      font-size: 1em;
    }
  
    button:hover {
      background-color: #777;
    }
  </style>