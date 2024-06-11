<script>
  import { Router, Route, navigate } from "svelte-navigator";
  import Home from "./pages/Home/Home.svelte";
  import Cards from "./pages/Cards/Cards.svelte";
  import Login from "./pages/Login/Login.svelte"
  import Signup from "./pages/Signup/Signup.svelte"
  import NavBar from "./components/NavBar.svelte";
  import ProfileSetup from "./pages/ProfileSetup/ProfileSetup.svelte";
  import Profile from "./pages/Profile/Profile.svelte";
  import Changepassword from "./pages/ChangePassword/Changepassword.svelte";
  import { onMount } from "svelte";
  import { session, loadSession } from "./stores/sessionStore.js"
  import PrivateRoute from "./pages/PrivateRoute/PrivateRoute.svelte";
  import Chat from "./pages/Chat/Chat.svelte"

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
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/signup">
      <Signup />
    </Route>
    <Route path="/profileSetup">
      <ProfileSetup />
    </Route>
    <Route path="/profile">
        <Profile/>
    </Route>
    <Route path="/changepassword">
        <Changepassword/>
    </Route>
    <PrivateRoute path="/chat" let:location>
      <Chat/>
    </PrivateRoute>
    <PrivateRoute path="/cards" let:location>
      <Cards/>
    </PrivateRoute>
  </div>
</Router>

<style>
  .content {
    padding: 20px;
    margin-top: 40px; /* Adjust this value according to the height of your navbar */
  }
</style>