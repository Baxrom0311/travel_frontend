export interface MapProvider {
  key: string;
  name: string;
  url: string;
  attribution: string;
  max_zoom: number;
}

export interface SiteSettings {
  site_name: string;
  site_tagline: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  contact_address: string;
  facebook_url: string;
  instagram_url: string;
  youtube_url: string;
  telegram_url: string;
  maintenance_mode: boolean;
  maintenance_message: string;
  map_default_zoom: number;
  map_provider: string;
  map_dark_provider: string;
  map: MapProvider;
  map_dark: MapProvider;
  updated_at: string;
}
