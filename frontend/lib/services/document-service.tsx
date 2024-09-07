import { ApiEndpoint } from '@/app/enums'
import {
  SearchQuery,
  KnowledgeBase,
  UserQuery,
} from '@/lib/types';

export const documentService = {

  async searchDocuments(query: SearchQuery): Promise<any> {
    return await fetchApi(ApiEndpoint.SEARCH_QUERY, 'POST', query);
  },

  async createDocumentSelection(document: KnowledgeBase): Promise<any> {
    return await fetchApi(ApiEndpoint.CREATE_KNOWLEDGE_BASE, 'POST', document);
  },

  async queryDocument(query: UserQuery): Promise<any> {
    return await fetchApi(ApiEndpoint.QUERY_DOCUMENT, 'POST', query);
  },

};

async function fetchApi(url: string, method: string, data: any, isJson: boolean = true): Promise<any> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/json',
    };

    if (isJson) {
      headers['Content-Type'] = 'application/json';
    }

    const body = isJson ? JSON.stringify(data) : data;

    console.log('Fetching API:', url, method, body);

    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error(`Error during API call to ${url}:`, error);
    throw error;
  }
}