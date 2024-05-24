<script>
    import { navigate } from "svelte-navigator";
    import { BASE_URL } from "../../stores/generalStore";
    import { fetchPatch, fetchPost } from "../../util/api";
    import toast, {Toaster} from "svelte-french-toast";
    import { loadSession, session } from "../../stores/sessionStore"
  import { onMount } from "svelte";

    let email;
    let password;
    let username;
    let age;

    onMount(async () => {
         loadSession();
    });
    console.log($session)
</script>

<Toaster />
{#if $session}
    <h1>{$session.username}</h1>
{:else}
    <h1>Loading...</h1>
    {navigate("/login")}
{/if}
<div class="container"></div>