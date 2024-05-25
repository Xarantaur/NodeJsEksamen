<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../../stores/generalStore";
    import { fetchPatch, fetchPost } from "../../util/api";
    import toast, {Toaster} from "svelte-french-toast";
    import { loadSession, session } from "../../stores/sessionStore"
  import { onMount } from "svelte";

    let username;
    let age;
    let password;

    onMount(async () => {
         loadSession();
         console.log($BASE_URL + "/api/users")
    });

    async function handleChangeUser(event){
        event.preventDefault()

        const bodyElements = {
            email: $session.email,
        }
        if(username) bodyElements.username = username;
        if(age) bodyElements.age = age;
        if(password) bodyElements.password = password;

        const result = await fetchPatch($BASE_URL + "/api/users", bodyElements);
        if(result.data === "User information updated") {
            toast.success("Username Changed")
            navigate("/profile")
            await loadSession()
        } else {
            toast.error("Could not Change Username at this time")
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
        <input type="username" name="username" placeholder="username" bind:value={username}>
        <input type="submit" value="Change">
        </form>
    <form on:submit={handleChangeUser}>
        <input type="Age" name="Age" placeholder="Age" bind:value={age}>
        <input type="submit" value="Change">
        </form>
    <form on:submit={handleChangeUser}>
        <input type="text" name="password" placeholder="password" bind:value={password}>
        <input type="submit" value="Change">
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
  </style>