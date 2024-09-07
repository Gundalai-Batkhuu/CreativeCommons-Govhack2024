const API_BASE_URL = 'http://localhost:5500';

export enum ApiEndpoint {
  QUERY_DOCUMENT = API_BASE_URL + '/query-document',
  CREATE_KNOWLEDGE_BASE = API_BASE_URL + '/create-knowledge-base',
  SEARCH_QUERY = API_BASE_URL + '/search-query',
}