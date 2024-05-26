<script>
    import { onMount } from "svelte";
    import { BASE_URL } from "../../stores/generalStore";
    import { fetchGet } from "../../util/api";
  
    let cards = [];
    let error = null;
  
    onMount(async () => {
      try {
        console.log("fetching cards")
        cards = await fetchGet($BASE_URL + "/api/cards");
        
      } catch (err) {
        error = err.message;
      }
    });

  </script>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  </style>
  
  {#if error}
    <p>Error: {error}</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Mana Cost</th>
          <th>Type</th>
          <th>Rarity</th>
          <th>Set</th>
          <th>Ability</th>
          <th>Power</th>
          <th>Toughness</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each cards as card}
          <tr>
            <td>{card.name}</td>
            <td>{card.manacost}</td>
            <td>{card.type}</td>
            <td>{card.rarity}</td>
            <td>{card.set}</td>
            <td>{card.ability}</td>
            <td>{card.power}</td>
            <td>{card.toughness}</td>
            <td><button>Update</button></td>
            <td><button>Delete</button></td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}