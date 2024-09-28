// src/interfaces.ts

export interface Screen {
  id: number;
  name: string;
  html: string;
  events: string[];
}

export interface Event {
  id: number;
  name: string;
  screen: string;
  process: string;
}

export interface Entity {
  id: number;
  name: string;
  attributes: string[];
}

export interface Relation {
  id: number;
  from_: string;
  to: string;
  type: string;
}

export interface Inquiry {
  id: number;
  name: string;
  email: string;
  inquiry: string;
  status: number;
}
