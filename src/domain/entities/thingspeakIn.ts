export interface Thingspeak {
  channel: Channel;
  feeds: Feed[];
}

interface Channel {
  id: number;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
  field1: string;
  field2: string;
  created_at: string;
  updated_at: string;
  last_entry_id: number;
}

interface Feed {
  created_at: string;
  entry_id: number;
  field1: string;
  field2: string;
}
