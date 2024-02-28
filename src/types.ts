export interface User {
  id: number;
  google_id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
  emotions?: Emotion[];
  events?: Event[];
  days?: Day[];
  months?: Month[];
  years?: Year[];
}

export interface Emotion {
  id: number;
  userID: string;
  user: User;
  emotion_name: string;
  emotion_colour: string;
  count_in_month: number;
  count_in_year: number;
  last_used: Date;
  days_since_last_used: number;
  created_at: Date;
  days: Day[];
  months: Month[];
}

export interface Event {
  id: number;
  userID: string;
  user: User;
  event_name: string;
  event_colour: string;
  count_in_month: number;
  count_in_year: number;
  last_used: Date;
  days_since_last_used: number;
  created_at: Date;
  days: Day[];
  months: Month[];
}

export interface Day {
  id: number;
  userID: string;
  user: User;
  day_name: string;
  day_number: number;
  date: Date;
  emotions: Emotion[];
  events: Event[];
  created_at: Date;
  month: Month;
  monthID: number;
  year: Year;
  yearID: number;
  comment?: string;
}

export interface Month {
  id: number;
  userID: string;
  user: User;
  month_name: string;
  days: Day[];
  sorted_emotions: Emotion[];
  sorted_events: Event[];
  created_at: Date;
  yearID: number;
  year: Year;
}

export interface Year {
  id: number;
  userID: string;
  user: User;
  year_name: string;
  months: Month[];
  days: Day[];
  created_at: Date;
}
