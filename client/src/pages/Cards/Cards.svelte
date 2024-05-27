<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/generalStore";
  import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "../../util/api";
  import { navigate } from "svelte-navigator";
  import toast from "svelte-french-toast";

  let cards = [];
  let error = null;
  let editingIndex = null;
  let showForm = false;

  
let newCard = {
  name: '',
  manacost: '',
  type: '',
  rarity: '',
  set: '',
  ability: '',
  power: '',
  toughness: ''
};

  const fetchCards = async () => {
      try{
      cards = await fetchGet($BASE_URL + "/api/cards")
      console.log(cards + " has been fetched")
    }catch(error){
      toast.error("failed to fetch cards")
    }}

  onMount(() => {
    fetchCards() 
  });
  
  

 async function handleUpdate(index){
  if (editingIndex === index) {
    try {
      const updatedCard = cards[index];
      const { name, manacost, type, rarity, set, ability, power, toughness } = updatedCard;
      const result = await fetchPatch($BASE_URL + "/api/cards", { name, manacost, type, rarity, set, ability, power, toughness });
      if(result.data === "card has been updated"){
      editingIndex = null;
      fetchCards();
      toast.success(result.data);
      }
    } catch (err) {
      toast.error("Error updating card: " + err.message);
    }
  } else {
    editingIndex = index;
  }
}

  


  async function handleDelete(name){
    
    try{
      const result = await fetchDelete($BASE_URL + "/api/cards",{name: name})
      if(result.data === "Card Deleted Succesfully"){
        fetchCards()
        toast.success(result.data)
      }
    } catch(error) {
      error = error.message;
    }
  }

  async function handleCreate() {
  try {
    const result = await fetchPost($BASE_URL + "/api/cards", newCard);
    if (result) {
      fetchCards();
      toast.success("Card created successfully");
      showForm = false;
      newCard = {
        name: '',
        manacost: '',
        type: '',
        rarity: '',
        set: '',
        ability: '',
        power: '',
        toughness: ''
      };
    }
  } catch (error) {
    toast.error("Error creating card: " + error.message);
  }
}

</script>

<header>
  <h1>Stored Cards</h1>
</header>

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
    {#each cards as card, index}
      <tr>
        {#if editingIndex === index}
          <td><input type="text" bind:value={card.name}></td>
          <td><input type="text" bind:value={card.manacost}></td>
          <td><input type="text" bind:value={card.type}></td>
          <td><input type="text" bind:value={card.rarity}></td>
          <td><input type="text" bind:value={card.set}></td>
          <td><input type="text" bind:value={card.ability}></td>
          <td><input type="text" bind:value={card.power}></td>
          <td><input type="text" bind:value={card.toughness}></td>
          <td><button on:click={() => handleUpdate(index)}>Save</button></td>
        {:else}
          <td>{card.name}</td>
          <td>{card.manacost}</td>
          <td>{card.type}</td>
          <td>{card.rarity}</td>
          <td>{card.set}</td>
          <td>{card.ability}</td>
          <td>{card.power}</td>
          <td>{card.toughness}</td>
          <td><button on:click={() => handleUpdate(index)}>Update</button></td>
        {/if}
        <td><button on:click={() => handleDelete(card?.name)}>Delete</button></td>
      </tr>
    {/each}
  </tbody>
</table>
{/if}

<button on:click={() => showForm = !showForm} style="margin-top: 20px;">{showForm ? 'Cancel' : 'Create New Card'}</button>

{#if showForm}
  <div class="form-container">
    <h2>Create New Card</h2>
    <form on:submit|preventDefault={handleCreate}>
      <label for="name">Name:</label>
      <input type="text" id="name" bind:value={newCard.name}>

      <label for="manacost">Mana Cost:</label>
      <input type="text" id="manacost" bind:value={newCard.manacost}>

      <label for="type">Type:</label>
      <input type="text" id="type" bind:value={newCard.type}>

      <label for="rarity">Rarity:</label>
      <input type="text" id="rarity" bind:value={newCard.rarity}>

      <label for="set">Set:</label>
      <input type="text" id="set" bind:value={newCard.set}>

      <label for="ability">Ability:</label>
      <input type="text" id="ability" bind:value={newCard.ability}>

      <label for="power">Power:</label>
      <input type="text" id="power" bind:value={newCard.power}>

      <label for="toughness">Toughness:</label>
      <input type="text" id="toughness" bind:value={newCard.toughness}>

      <button type="submit" style="margin-top: 10px;">Create</button>
    </form>
  </div>
{/if}

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