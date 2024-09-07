const API_BASE_URL = 'http://localhost:5500/api/v1/user';

interface User {
  name: string;
  email: string;
  user_id: string;
}

interface DocumentStatus {
  user_id: string;
  document_id: string;
}

export const userService = {

  async createUser(userId: string, email: string): Promise<any> {
    try {
      const user: User = {
        name: 'user', // Using 'user' as the default username
        email: email,
        user_id: userId
      };
      const response = await fetch(`${API_BASE_URL}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating user in backend database:', error);
      throw error;
    }
  },

  async getUserArtifacts(userId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/get-user-artifacts?user_id=${encodeURIComponent(userId)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting user artifacts:', error);
      throw error;
    }
  },

  async getSharedDocumentState(payload: DocumentStatus): Promise<any> {
    try {
      const params = new URLSearchParams({
        user_id: payload.user_id,
        document_id: payload.document_id,
      });
      const response = await fetch(`${API_BASE_URL}/get-shared-document-state?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting shared document state:', error);
      throw error;
    }
  }


};

export default userService;