import { Database } from "./database.types";

export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type Deck = Database["public"]["Tables"]["decks"]["Row"];
export type Card = Database["public"]["Tables"]["cards"]["Row"];
