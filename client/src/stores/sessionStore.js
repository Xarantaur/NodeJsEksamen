import { writable } from "svelte/store";
import { fetchSession } from "../util/api.js";
import { BASE_URL } from "../stores/generalStore.js";
import { get } from "svelte/store";

export const session = writable(null);

export async function loadSession() {
  try {
    console.log("inside the loadsession function")
    const baseUrl = get(BASE_URL);  
    console.log("calling fetchSession")
    const response = await fetchSession(`${baseUrl}/api/session`);
    console.log(`Session response: `, response);
    if(response){
    session.set(response.user)}
  } catch (error) {
    console.error("Failed to load session:", error);
    session.set(null);
  }
}