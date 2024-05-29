<script>
  import { onMount } from "svelte";
  import { BASE_URL } from "../../stores/generalStore";
  import { fetchDelete, fetchGet, fetchPatch, fetchPost } from "../../util/api";
  import toast from "svelte-french-toast";

  let cards = [];
  let error = null;
  let editingIndex = null;
  let showForm = false;

  let newCard = {
    name: "",
    manacost: "",
    type: "",
    rarity: "",
    set: "",
    ability: "",
    power: "",
    toughness: "",
  };

const fetchCards = async () => {
  try {
    cards = await fetchGet($BASE_URL + "/api/cards");
    console.log(cards + " has been fetched");
  } catch (error) {
    toast.error("Failed to fetch cards");
  }
};

onMount(() => {
  fetchCards();
});

async function handleUpdate(index) {
  if (editingIndex === index) {
    try {
      const updatedCard = cards[index];
      const { name, manacost, type, rarity, set, ability, power, toughness } = updatedCard;
      const result = await fetchPatch($BASE_URL + "/api/cards", {
        name,
        manacost,
        type,
        rarity,
        set,
        ability,
        power,
        toughness,
      });
      if (result.data === "card has been updated") {
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

async function handleDelete(name) {
  try {
    const result = await fetchDelete($BASE_URL + "/api/cards", { name: name });
    if (result.data === "Card Deleted Succesfully") {
      fetchCards();
      toast.success(result.data);
    }
  } catch (error) {
    toast.error("Error deleting card: " + error.message);
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
        name: "",
        manacost: "",
        type: "",
        rarity: "",
        set: "",
        ability: "",
        power: "",
        toughness: "",
      };
    }
  } catch (error) {
    toast.error("Error creating card: " + error.message);
  }
}

function closeForm() {
  showForm = false;
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
            <td><button on:click={() => handleUpdate(index)} class="save-btn">Save</button></td>
          {:else}
            <td>{card.name}</td>
            <td>{card.manacost}</td>
            <td>{card.type}</td>
            <td>{card.rarity}</td>
            <td>{card.set}</td>
            <td>{card.ability}</td>
            <td>{card.power}</td>
            <td>{card.toughness}</td>
            <td><button on:click={() => handleUpdate(index)} class="update-btn">Update</button></td>
          {/if}
          <td><button on:click={() => handleDelete(card?.name)} class="delete-btn">Delete</button></td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}

<button on:click={() => showForm = !showForm} class="toggle-form-btn">{showForm ? 'Cancel' : 'Create New Card'}</button>

{#if showForm}
  <div class="modal">
    <div class="modal-content">
      <button class="close-btn" on:click={closeForm}>&times;</button>
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

        <button type="submit" class="create-btn">Create</button>
      </form>
    </div>
  </div>
{/if}

<style>
  header {
    text-align: center;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
  }

  button {
    padding: 10px 15px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 5px;
    transition: background-color 0.3s;
  }

  .save-btn {
    background-color: #4CAF50;
    color: white;
  }

  .update-btn {
    background-color: #008CBA;
    color: white;
  }

  .delete-btn {
    background-color: #f44336;
    color: white;
  }

  button:hover {
    opacity: 0.8;
  }

  .toggle-form-btn {
    background-color: #333;
    color: white;
    margin: 20px 0;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  label {
    margin: 5px 0;
  }

  input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
  }

  .create-btn {
    background-color: #333;
    color: white;
    align-self: center;
    padding: 10px 20px;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 90%;
    position: relative;
  }

  .modal-content h2 {
    margin-top: 0;
  }

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .close-btn:hover {
    color: #f44336;
  }
</style>
