<script>
import { useNavigate, useLocation } from "svelte-navigator";
import { session } from "../../stores/sessionStore";

const navigate = useNavigate();
const location = useLocation();

$: if (!$session) {
  navigate("/login", {
    state: { from: $location.pathname },
    replace: true,
  });
}

  </script>
  
  {#if $session}
    <slot />
  {/if}