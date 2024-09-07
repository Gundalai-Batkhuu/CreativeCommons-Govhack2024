import { ApiEndpoint } from '@/app/enums'
import {
  SearchQuery,
  CreateDocument,
  QueryDocument,
  DeleteDocument,
  DeleteCapturedFile,
  DeleteCapturedDocument,
  CreateDocumentCapture,
  DocumentInfo,
  AcceptSharedDocument,
  ValidityUpdate,
  ScopedValidityUpdate,
  Access,
  ScopedAccess,
  DocumentStatus,
  DocumentSharingRemoval,
  AccessorUpdate,
  SwitchShareType,
  SharedDocumentSelection,
  ShareDocument,
} from '@/lib/types';

export const documentService = {

  async searchDocuments(query: SearchQuery): Promise<any> {
    return await fetchApi(ApiEndpoint.SEARCH_QUERY, 'POST', query);
  },

  async createDocumentSelection(document: CreateDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.CREATE_DOCUMENT_SELECTION, 'POST', document);
  },

  async createDocumentManually(formData: FormData): Promise<any> {
    return await fetchApi(ApiEndpoint.CREATE_DOCUMENT_MANUALLY, 'POST', formData, false);
  },

  async queryDocument(query: QueryDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.QUERY_DOCUMENT, 'POST', query);
  },

  async queryDocumentQuick(query: QueryDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.QUERY_DOCUMENT_QUICK, 'POST', query);
  },

  async deleteDocument(payload: DeleteDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.DELETE_DOCUMENT, 'DELETE', payload);
  },

  async captureDocument(formData: FormData): Promise<any> {
    return await fetchApi(ApiEndpoint.CAPTURE_DOCUMENT, 'POST', formData, false);
  },

  async updateCaptureDocument(formData: FormData): Promise<any> {
    return await fetchApi(ApiEndpoint.UPDATE_CAPTURED_DOCUMENT, 'PATCH', formData, false);
  },

  async deleteCapturedFile(payload: DeleteCapturedFile): Promise<any> {
    return await fetchApi(ApiEndpoint.DELETE_CAPTURED_FILE, 'DELETE', payload);
  },

  async deleteCapturedDocument(payload: DeleteCapturedDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.DELETE_CAPTURED_DOCUMENT, 'DELETE', payload);
  },

  async createDocumentFromCapturedDocument(payload: CreateDocumentCapture): Promise<any> {
    return await fetchApi(ApiEndpoint.CREATE_DOCUMENT_FROM_CAPTURED_DOCUMENT, 'POST', payload);
  },

  async updateDocumentInfo(payload: DocumentInfo): Promise<any> {
    return await fetchApi(ApiEndpoint.UPDATE_DOCUMENT_INFO, 'PATCH', payload);
  },

  // Additional methods for other endpoints not explicitly defined in the provided FastAPI router
  async acceptSharedDocument(payload: AcceptSharedDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.ACCEPT_SHARED_DOCUMENT, 'POST', payload);
  },

  async updateValidity(payload: ValidityUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.UPDATE_VALIDITY, 'PATCH', payload);
  },

  async updateScopedValidity(payload: ScopedValidityUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.UPDATE_SCOPED_VALIDITY, 'PATCH', payload);
  },

  async changeAccess(payload: Access): Promise<any> {
    return await fetchApi(ApiEndpoint.CHANGE_ACCESS, 'PATCH', payload);
  },

  async changeScopedAccess(payload: ScopedAccess): Promise<any> {
    return await fetchApi(ApiEndpoint.CHANGE_SCOPED_ACCESS, 'PATCH', payload);
  },

  async getDocumentStatus(payload: DocumentStatus): Promise<any> {
    return await fetchApi(ApiEndpoint.GET_DOCUMENT_STATUS, 'GET', payload);
  },

  async removeDocumentSharing(payload: DocumentSharingRemoval): Promise<any> {
    return await fetchApi(ApiEndpoint.REMOVE_DOCUMENT_SHARING, 'DELETE', payload);
  },

  async updateAccessor(payload: AccessorUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.UPDATE_ACCESSOR, 'PATCH', payload);
  },

  async switchShareType(payload: SwitchShareType): Promise<any> {
    return await fetchApi(ApiEndpoint.SWITCH_SHARE_TYPE, 'PATCH', payload);
  },

  async getSharedDocumentSelection(payload: SharedDocumentSelection): Promise<any> {
    return await fetchApi(ApiEndpoint.GET_SHARED_DOCUMENT_SELECTION, 'GET', payload);
  },


// New methods for the additional endpoints
  async shareDocument(payload: ShareDocument): Promise<any> {
    return await fetchApi(ApiEndpoint.SHARE_DOCUMENT, 'POST', payload);
  },

  async changeDocumentValidity(payload: ValidityUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.CHANGE_DOCUMENT_VALIDITY, 'PATCH', payload);
  },

  async changeDocumentValidityForUser(payload: ScopedValidityUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.CHANGE_DOCUMENT_VALIDITY_FOR_USER, 'PATCH', payload);
  },

  async blockDocumentAccess(payload: Access): Promise<any> {
    return await fetchApi(ApiEndpoint.BLOCK_DOCUMENT_ACCESS, 'PATCH', payload);
  },

  async blockDocumentAccessForUser(payload: ScopedAccess): Promise<any> {
    return await fetchApi(ApiEndpoint.BLOCK_DOCUMENT_ACCESS_FOR_USER, 'PATCH', payload);
  },

  async removeShareState(payload: DocumentSharingRemoval): Promise<any> {
    return await fetchApi(ApiEndpoint.REMOVE_SHARE_STATE, 'DELETE', payload);
  },

  async removeSharedDocumentByUser(payload: DocumentStatus): Promise<any> {
    return await fetchApi(ApiEndpoint.REMOVE_SHARED_DOCUMENT_BY_USER, 'DELETE', payload);
  },

  async addNewAccessor(payload: AccessorUpdate): Promise<any> {
    return await fetchApi(ApiEndpoint.ADD_NEW_ACCESSOR, 'POST', payload);
  },

  async shareDocumentToPublic(payload: SwitchShareType): Promise<any> {
    return await fetchApi(ApiEndpoint.SHARE_DOCUMENT_TO_PUBLIC, 'PATCH', payload);
  },

  async removeAllExpiredDocuments(payload: SharedDocumentSelection): Promise<any> {
    return await fetchApi(ApiEndpoint.REMOVE_ALL_EXPIRED_DOCUMENTS, 'DELETE', payload);
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