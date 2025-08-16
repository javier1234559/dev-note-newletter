export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      facebook_ads: {
        Row: {
          ad_archive_id: number | null
          created_at: string | null
          date_added: string | null
          date_posted: string | null
          id: string
          image_url: string | null
          like_count: number | null
          page_id: number | null
          page_name: string | null
          page_url: string | null
          rewritten_ad_copy: string | null
          summary: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          ad_archive_id?: number | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          like_count?: number | null
          page_id?: number | null
          page_name?: string | null
          page_url?: string | null
          rewritten_ad_copy?: string | null
          summary?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          ad_archive_id?: number | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          like_count?: number | null
          page_id?: number | null
          page_name?: string | null
          page_url?: string | null
          rewritten_ad_copy?: string | null
          summary?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      facebook_post: {
        Row: {
          caption: string | null
          comment: number | null
          created_at: string | null
          date_posted: string | null
          id: string
          image_url: string | null
          likes: number | null
          post_url: string
          share: number | null
          summary: string | null
          updated_at: string | null
        }
        Insert: {
          caption?: string | null
          comment?: number | null
          created_at?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          likes?: number | null
          post_url: string
          share?: number | null
          summary?: string | null
          updated_at?: string | null
        }
        Update: {
          caption?: string | null
          comment?: number | null
          created_at?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          likes?: number | null
          post_url?: string
          share?: number | null
          summary?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      instagram_ads: {
        Row: {
          ad_archive_id: string | null
          created_at: string | null
          date_added: string | null
          date_posted: string | null
          id: string
          image_url: string | null
          like_count: number | null
          page_id: string | null
          page_name: string | null
          page_url: string | null
          rewritten_ad_copy: string | null
          summary: string | null
          title: string | null
          type: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          ad_archive_id?: string | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          like_count?: number | null
          page_id?: string | null
          page_name?: string | null
          page_url?: string | null
          rewritten_ad_copy?: string | null
          summary?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          ad_archive_id?: string | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          id?: string
          image_url?: string | null
          like_count?: number | null
          page_id?: string | null
          page_name?: string | null
          page_url?: string | null
          rewritten_ad_copy?: string | null
          summary?: string | null
          title?: string | null
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      instagram_post: {
        Row: {
          airtable_id: string | null
          caption: string | null
          comments_count: number | null
          created_at: string | null
          date_posted: string | null
          display_url: string | null
          hashtags: string[] | null
          id: string
          input_url: string | null
          likes_count: number | null
          location_address: string | null
          location_category: string | null
          location_name: string | null
          owner_pic_url: string | null
          owner_username: string | null
          type: string | null
          updated_at: string | null
          url: string | null
          video_url: string | null
        }
        Insert: {
          airtable_id?: string | null
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          date_posted?: string | null
          display_url?: string | null
          hashtags?: string[] | null
          id?: string
          input_url?: string | null
          likes_count?: number | null
          location_address?: string | null
          location_category?: string | null
          location_name?: string | null
          owner_pic_url?: string | null
          owner_username?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          video_url?: string | null
        }
        Update: {
          airtable_id?: string | null
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          date_posted?: string | null
          display_url?: string | null
          hashtags?: string[] | null
          id?: string
          input_url?: string | null
          likes_count?: number | null
          location_address?: string | null
          location_category?: string | null
          location_name?: string | null
          owner_pic_url?: string | null
          owner_username?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      tiktok_ads: {
        Row: {
          brand_name: string | null
          caption: string | null
          comment_count: number | null
          cost: number | null
          created_at: string | null
          ctr: number | null
          date_posted: string | null
          hashtags: string[] | null
          id: string
          is_ad: boolean | null
          like_count: number | null
          save_count: number | null
          share_count: number | null
          tag_readable: string | null
          updated_at: string | null
          video_uploaded_at: string | null
          view_count: number | null
          web_video_url: string | null
        }
        Insert: {
          brand_name?: string | null
          caption?: string | null
          comment_count?: number | null
          cost?: number | null
          created_at?: string | null
          ctr?: number | null
          date_posted?: string | null
          hashtags?: string[] | null
          id?: string
          is_ad?: boolean | null
          like_count?: number | null
          save_count?: number | null
          share_count?: number | null
          tag_readable?: string | null
          updated_at?: string | null
          video_uploaded_at?: string | null
          view_count?: number | null
          web_video_url?: string | null
        }
        Update: {
          brand_name?: string | null
          caption?: string | null
          comment_count?: number | null
          cost?: number | null
          created_at?: string | null
          ctr?: number | null
          date_posted?: string | null
          hashtags?: string[] | null
          id?: string
          is_ad?: boolean | null
          like_count?: number | null
          save_count?: number | null
          share_count?: number | null
          tag_readable?: string | null
          updated_at?: string | null
          video_uploaded_at?: string | null
          view_count?: number | null
          web_video_url?: string | null
        }
        Relationships: []
      }
      tiktok_post: {
        Row: {
          author_avatar: string | null
          author_bio: string | null
          author_profile_url: string | null
          author_username: string | null
          caption: string | null
          comment_count: number | null
          created_at: string | null
          date_added: string | null
          date_posted: string | null
          hashtags: string[] | null
          id: string
          is_ad: boolean | null
          is_music_original: boolean | null
          is_slideshow: boolean | null
          like_count: number | null
          music_author: string | null
          music_name: string | null
          music_url: string | null
          save_count: number | null
          share_count: number | null
          thumbnail_video_url: string | null
          updated_at: string | null
          video_uploaded_at: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          author_avatar?: string | null
          author_bio?: string | null
          author_profile_url?: string | null
          author_username?: string | null
          caption?: string | null
          comment_count?: number | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          hashtags?: string[] | null
          id?: string
          is_ad?: boolean | null
          is_music_original?: boolean | null
          is_slideshow?: boolean | null
          like_count?: number | null
          music_author?: string | null
          music_name?: string | null
          music_url?: string | null
          save_count?: number | null
          share_count?: number | null
          thumbnail_video_url?: string | null
          updated_at?: string | null
          video_uploaded_at?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          author_avatar?: string | null
          author_bio?: string | null
          author_profile_url?: string | null
          author_username?: string | null
          caption?: string | null
          comment_count?: number | null
          created_at?: string | null
          date_added?: string | null
          date_posted?: string | null
          hashtags?: string[] | null
          id?: string
          is_ad?: boolean | null
          is_music_original?: boolean | null
          is_slideshow?: boolean | null
          like_count?: number | null
          music_author?: string | null
          music_name?: string | null
          music_url?: string | null
          save_count?: number | null
          share_count?: number | null
          thumbnail_video_url?: string | null
          updated_at?: string | null
          video_uploaded_at?: string | null
          video_url?: string | null
          view_count?: number | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
