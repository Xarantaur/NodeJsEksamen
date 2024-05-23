<script>
  import { Router, Route } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import Drinks from "./pages/Drinks/Drinks.svelte";
  import Login from "./pages/Login/Login.svelte"
  import Signup from "./pages/Signup/Signup.svelte"
  import NavBar from "./components/NavBar.svelte";
  import ProfileSetup from "./pages/ProfileSetup/ProfileSetup.svelte";
  import { onMount } from "svelte";
  import { session, loadSession } from "./stores/sessionStore.js"

  onMount(() => {
    loadSession();
  })
</script>

<Router>
  <NavBar />
  <div class="content">
    <Route path="/">
      <Home />
    </Route>
    <Route path="/drinks">
      <Drinks/>
    </Route>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/profileSetup">
      <ProfileSetup />
    </Route>
  </div>
</Router>

<style>
  .content {
    padding: 20px;
    margin-top: 40px; /* Adjust this value according to the height of your navbar */
  }
</style>