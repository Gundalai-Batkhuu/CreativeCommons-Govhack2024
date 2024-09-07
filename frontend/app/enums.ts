const API_BASE_URL = 'http://localhost:5500/api/v1';

export enum ApiEndpoint {
  // Existing endpoints
  QUERY_DOCUMENT = API_BASE_URL + '/store/query-document',
  CREATE_DOCUMENT_SELECTION = API_BASE_URL + '/store/create-document-selection',
  SEARCH_GOOGLE = API_BASE_URL + '/store/search-query',
  MANUAL_DOCUMENT_UPLOAD = API_BASE_URL + '/store/manual-document-upload',
  SEARCH_QUERY = API_BASE_URL + '/store/search-query',
  CREATE_DOCUMENT_MANUALLY = API_BASE_URL + '/store/create-document-manually',
  QUERY_DOCUMENT_QUICK = API_BASE_URL + '/store/query-document-quick',
  DELETE_DOCUMENT = API_BASE_URL + '/store/delete-document',
  CAPTURE_DOCUMENT = API_BASE_URL + '/store/capture-document',
  UPDATE_CAPTURED_DOCUMENT = API_BASE_URL + '/store/update-captured-document',
  DELETE_CAPTURED_FILE = API_BASE_URL + '/store/delete-captured-file',
  DELETE_CAPTURED_DOCUMENT = API_BASE_URL + '/store/delete-captured-document',
  CREATE_DOCUMENT_FROM_CAPTURED_DOCUMENT = API_BASE_URL + '/store/create-document-from-captured-document',
  UPDATE_DOCUMENT_INFO = API_BASE_URL + '/store/update-document-info',

  // New endpoints from the additional FastAPI router
  SHARE_DOCUMENT = API_BASE_URL + '/handle/share-document',
  ACCEPT_SHARED_DOCUMENT = API_BASE_URL + '/handle/accept-shared-document',
  CHANGE_DOCUMENT_VALIDITY = API_BASE_URL + '/handle/change-document-validity',
  CHANGE_DOCUMENT_VALIDITY_FOR_USER = API_BASE_URL + '/handle/change-document-validity-for-user',
  BLOCK_DOCUMENT_ACCESS = API_BASE_URL + '/handle/block-document-access',
  BLOCK_DOCUMENT_ACCESS_FOR_USER = API_BASE_URL + '/handle/block-document-access-for-user',
  REMOVE_SHARE_STATE = API_BASE_URL + '/handle/remove-share-state',
  REMOVE_SHARED_DOCUMENT_BY_USER = API_BASE_URL + '/handle/remove-shared-document-by-sharee',
  ADD_NEW_ACCESSOR = API_BASE_URL + '/handle/add-new-accessor',
  SHARE_DOCUMENT_TO_PUBLIC = API_BASE_URL + '/handle/allow-public-access',
  REMOVE_ALL_EXPIRED_DOCUMENTS = API_BASE_URL + '/handle/remove-all-expired-documents',

  // Previously added endpoints that weren't in either FastAPI router
  UPDATE_VALIDITY = API_BASE_URL + '/store/update-validity',
  UPDATE_SCOPED_VALIDITY = API_BASE_URL + '/store/update-scoped-validity',
  CHANGE_ACCESS = API_BASE_URL + '/store/change-access',
  CHANGE_SCOPED_ACCESS = API_BASE_URL + '/store/change-scoped-access',
  GET_DOCUMENT_STATUS = API_BASE_URL + '/store/get-document-status',
  REMOVE_DOCUMENT_SHARING = API_BASE_URL + '/store/remove-document-sharing',
  UPDATE_ACCESSOR = API_BASE_URL + '/store/update-accessor',
  SWITCH_SHARE_TYPE = API_BASE_URL + '/store/switch-share-type',
  GET_SHARED_DOCUMENT_SELECTION = API_BASE_URL + '/store/get-shared-document-selection',
}