import api from './api';

export interface EmergencyRequestData {
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  contactName: string;
  contactPhone: string;
  urgencyLevel: 'urgent' | 'critical' | 'immediate';
  additionalInfo?: string;
}

export interface EmergencyRequestResponse {
  _id: string;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospital: string;
  location: string;
  contactName: string;
  contactPhone: string;
  urgencyLevel: string;
  additionalInfo?: string;
  status: 'active' | 'fulfilled' | 'expired';
  createdAt: Date;
  fulfilledBy: Array<{
    donor: {
      _id: string;
      name: string;
    };
    units: number;
    donatedAt: Date;
  }>;
}

const EmergencyService = {
  createRequest: async (data: EmergencyRequestData): Promise<EmergencyRequestResponse> => {
    const response = await api.post<EmergencyRequestResponse>('/emergency', data);
    return response.data;
  },

  getRequests: async (filters?: {
    bloodGroup?: string;
    location?: string;
    status?: string;
    urgencyLevel?: string;
  }) => {
    const response = await api.get('/emergency', { params: filters });
    return response.data;
  },

  getRequestById: async (id: string): Promise<EmergencyRequestResponse> => {
    const response = await api.get<EmergencyRequestResponse>(`/emergency/${id}`);
    return response.data;
  },

  updateRequest: async (
    id: string,
    data: Partial<EmergencyRequestData>
  ): Promise<EmergencyRequestResponse> => {
    const response = await api.put<EmergencyRequestResponse>(`/emergency/${id}`, data);
    return response.data;
  },

  fulfillRequest: async (id: string, units: number): Promise<EmergencyRequestResponse> => {
    const response = await api.post<EmergencyRequestResponse>(`/emergency/${id}/fulfill`, { units });
    return response.data;
  },

  expireRequest: async (id: string): Promise<EmergencyRequestResponse> => {
    const response = await api.patch<EmergencyRequestResponse>(`/emergency/${id}/expire`);
    return response.data;
  },
};

export default EmergencyService; 