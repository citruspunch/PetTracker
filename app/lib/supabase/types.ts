export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      found_pet_report: {
        Row: {
          city: string | null
          contact_number: string
          created_at: string
          found_by: string | null
          id: string
          location: string
          notes: string | null
          pet: string
        }
        Insert: {
          city?: string | null
          contact_number: string
          created_at?: string
          found_by?: string | null
          id?: string
          location: string
          notes?: string | null
          pet: string
        }
        Update: {
          city?: string | null
          contact_number?: string
          created_at?: string
          found_by?: string | null
          id?: string
          location?: string
          notes?: string | null
          pet?: string
        }
        Relationships: [
          {
            foreignKeyName: 'found_pet_report_pet_fkey'
            columns: ['pet']
            isOneToOne: false
            referencedRelation: 'pet'
            referencedColumns: ['id']
          }
        ]
      }
      lost_pet_report: {
        Row: {
          contact_number: string | null
          created_at: string
          found_date: string | null
          id: string
          last_seen_address: string
          last_seen_date: string
          notes: string
          pet: string
        }
        Insert: {
          contact_number?: string | null
          created_at?: string
          found_date?: string | null
          id?: string
          last_seen_address: string
          last_seen_date: string
          notes?: string
          pet: string
        }
        Update: {
          contact_number?: string | null
          created_at?: string
          found_date?: string | null
          id?: string
          last_seen_address?: string
          last_seen_date?: string
          notes?: string
          pet?: string
        }
        Relationships: [
          {
            foreignKeyName: 'lost_pet_report_pet_fkey'
            columns: ['pet']
            isOneToOne: false
            referencedRelation: 'pet'
            referencedColumns: ['id']
          }
        ]
      }
      pet: {
        Row: {
          animal_type: Database['public']['Enums']['animal type'] | null
          birth_date: string | null
          breed: string | null
          created_at: string
          id: string
          image: string | null
          name: string | null
          notes: string
          owner: string | null
          sex: Database['public']['Enums']['sex'] | null
          spayed_or_neutered: boolean | null
        }
        Insert: {
          animal_type?: Database['public']['Enums']['animal type'] | null
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          image?: string | null
          name?: string | null
          notes?: string
          owner?: string | null
          sex?: Database['public']['Enums']['sex'] | null
          spayed_or_neutered?: boolean | null
        }
        Update: {
          animal_type?: Database['public']['Enums']['animal type'] | null
          birth_date?: string | null
          breed?: string | null
          created_at?: string
          id?: string
          image?: string | null
          name?: string | null
          notes?: string
          owner?: string | null
          sex?: Database['public']['Enums']['sex'] | null
          spayed_or_neutered?: boolean | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          image_url: string | null
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          image_url?: string | null
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          image_url?: string | null
          last_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      'animal type': 'dog' | 'cat'
      sex: 'male' | 'female'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
      DefaultSchema['Views'])
  ? (DefaultSchema['Tables'] &
      DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
  ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
  ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
  ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      'animal type': ['dog', 'cat'],
      sex: ['male', 'female'],
    },
  },
} as const
