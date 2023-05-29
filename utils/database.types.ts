export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cards: {
        Row: {
          backside_content: string | null
          created_at: string | null
          deck_id: number
          frontside_content: string | null
          id: number
        }
        Insert: {
          backside_content?: string | null
          created_at?: string | null
          deck_id: number
          frontside_content?: string | null
          id?: number
        }
        Update: {
          backside_content?: string | null
          created_at?: string | null
          deck_id?: number
          frontside_content?: string | null
          id?: number
        }
      }
      decks: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          user_id?: string
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
