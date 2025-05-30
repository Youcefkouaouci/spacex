export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  date_local: string;
  date_unix: number;
  upcoming: boolean;
  success?: boolean;
  details?: string;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    webcast?: string;
    article?: string;
    wikipedia?: string;
    youtube_id?: string;
  };
  rocket?: {
    id: string;
    name: string;
  };
  launchpad?: {
    id: string;
    name: string;
    full_name: string;
  };
  payloads?: {
    id: string;
    name: string;
    type: string;
    customers: string[];
  }[];
  failures?: {
    time: number;
    altitude?: number;
    reason: string;
  }[];
}

export interface LaunchesQueryOptions {
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  upcoming?: boolean;
}