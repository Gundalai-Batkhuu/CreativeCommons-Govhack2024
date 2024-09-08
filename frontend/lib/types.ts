import { CoreMessage } from 'ai'

export type Message = CoreMessage & {
  id: string
}

export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface Session {
  user: {
    id: string
    email: string
  }
}

export interface AuthResult {
  type: string
  message: string
}

export interface User extends Record<string, any> {
  id: string
  email: string
  password: string
  salt: string
}

export interface CapturedFile {
  file_url: string
  file_name: string
}

export interface CapturedDocument {
  doc_id: string
  captured_document_id: string
  query_ready: boolean
  captured_files: CapturedFile[]
}

export interface Resource {
  name: string;
  sources: string;
}

export interface Artifact {
  id: number;
  title: string;
  description: string;
  category: string;
  engagement: number;
  featured: boolean;
  image: string;
  resources: Resource[];
}

export interface UserArtifactsResponse {
  user_id: string
  artefact_tree: Artifact[]
}

export type CountryShortName = string; // Assuming CountryShortName is a string type

export interface SearchQuery {
  query: string;
  file_type?: 'pdf' | 'docx'| 'csv' | 'xlsx';
}

export interface SearchResult {
  title?: string;
  thumbnail?: string;
  html_snippet: string;
  link: string;
}

export interface KnowledgeBase {
  document_id?: string;
  links: string[];
  files?: string[];
  description?: string;
}

export interface UserQuery {
  query: string;
}

export interface User {
  name: string;
  email: string;
  user_id: string;
}

export interface DeleteDocument {
  document_id: string;
  user_id: string;
}
