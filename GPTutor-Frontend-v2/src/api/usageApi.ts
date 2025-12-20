import { API_BASE_URL } from "./config";

export interface Usage {
  id: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  generationId?: string;
  aborted: boolean;
  createdAt: string;
}

export interface UsageFilters {
  model?: string;
  startDate?: string;
  endDate?: string;
}

export interface GetUsagesResponse {
  usages: Usage[];
  total: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface UsageStats {
  totalCost: number;
  totalTokens: number;
  totalRequests: number;
}

export interface GetStatsResponse {
  stats: UsageStats;
}

export interface GetModelsResponse {
  models: string[];
}

class UsageApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${window.location}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  }

  async getUsages(
    filters: UsageFilters = {},
    cursor?: string,
    limit: number = 20
  ): Promise<GetUsagesResponse> {
    const params = new URLSearchParams();
    
    if (filters.model) params.set("model", filters.model);
    if (filters.startDate) params.set("startDate", filters.startDate);
    if (filters.endDate) params.set("endDate", filters.endDate);
    if (cursor) params.set("cursor", cursor);
    params.set("limit", limit.toString());

    const queryString = params.toString();
    return this.makeRequest<GetUsagesResponse>(
      `/usage${queryString ? `?${queryString}` : ""}`
    );
  }

  async getStats(): Promise<GetStatsResponse> {
    return this.makeRequest<GetStatsResponse>("/usage/stats");
  }

  async getModels(): Promise<GetModelsResponse> {
    return this.makeRequest<GetModelsResponse>("/usage/models");
  }
}

export const usageApi = new UsageApiService();
