<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../../stores/generalStore";
    import { fetchPatch } from "../../util/api";
    import toast, { Toaster } from "svelte-french-toast";
  
    let username;
    let age;
  
    async function handleProfileSetup(event) {
      event.preventDefault();
  
      /* if (!username || !age) {
        toast.error("username and age are required");
        return;
      } */
  
      const bodyElements = { 
        username: username,
        age: age 
    };
  
      try {
        const response = await fetchPatch($BASE_URL + "/api/users", bodyElements);
        if (response.data === "User information updated") {
          toast.success("User updated successfully");
          navigate("/home");
        } else {
          toast.error(response.data || "Failed to update profile");
        }
      } catch (error) {
        toast.error("An error occurred while updating profile");
        console.error(error);
      }
    }
  </script>
  
  <Toaster />
  <div class="container">
    <h1>Complete Your Profile</h1>
    <form on:submit={handleProfileSetup}>
      <input type="text" name="username" placeholder="username" bind:value={username} required>
      <input type="number" name="age" placeholder="Age" bind:value={age} required>
      <input type="submit" value="Complete Profile">
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
