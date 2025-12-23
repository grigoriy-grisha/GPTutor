import { API_BASE_URL } from './config';

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  createdAt: string;
}

export interface UploadFileResponse {
  message: string;
  file: FileInfo;
  timestamp: string;
}

export interface FilesListResponse {
  success: boolean;
  data: {
    message: string;
    files: FileInfo[];
    total: number;
    timestamp: string;
  };
}

export interface DeleteFileResponse {
  success: boolean;
  data: {
    message: string;
    fileId: string;
    timestamp: string;
  };
}

/** Fallback-сообщения об ошибках по HTTP-статусу */
const HTTP_ERROR_MESSAGES: Record<number, string> = {
  400: 'Некорректный файл',
  413: 'Файл больше 50 МБ',
  503: 'Сервис недоступен',
};

const DEFAULT_ERROR_MESSAGE = 'Ошибка загрузки';

class FilesApi {
  private baseUrl = API_BASE_URL;

  async uploadFile(file: File): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await this.extractErrorMessage(response);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    console.log('Upload response:', result);
    
    return result;
  }

  /**
   * Извлекает сообщение об ошибке из ответа сервера или использует fallback по статусу
   */
  private async extractErrorMessage(response: Response): Promise<string> {
    const errorData = await response.json().catch(() => ({ error: null }));
    
    if (errorData.error) {
      return errorData.error;
    }

    return HTTP_ERROR_MESSAGES[response.status] ?? DEFAULT_ERROR_MESSAGE;
  }

  async getFiles(): Promise<FilesListResponse> {
    const response = await fetch(`${this.baseUrl}/files`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteFile(fileId: string): Promise<DeleteFileResponse> {
    const response = await fetch(`${this.baseUrl}/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  private getAuthToken(): string {
    return window.location.toString();
  }
}

export const filesApi = new FilesApi();
