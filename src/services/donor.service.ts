import api from './api';

export interface DonorData {
  bloodGroup: string;
  age: number;
  location: string;
  phone: string;
  medicalConditions?: string;
}

export interface DonorResponse {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  bloodGroup: string;
  age: number;
  location: string;
  phone: string;
  lastDonation?: Date;
  medicalConditions?: string;
  isAvailable: boolean;
  donationCount: number;
  updatedAt: Date;
}

const DonorService = {
  createProfile: async (data: DonorData): Promise<DonorResponse> => {
    const response = await api.post<DonorResponse>('/donors', data);
    return response.data;
  },

  getDonors: async (filters?: { bloodGroup?: string; location?: string; isAvailable?: boolean }) => {
    const response = await api.get('/donors', { params: filters });
    return response.data;
  },

  getDonorById: async (id: string): Promise<DonorResponse> => {
    const response = await api.get<DonorResponse>(`/donors/${id}`);
    return response.data;
  },

  updateProfile: async (id: string, data: Partial<DonorData>): Promise<DonorResponse> => {
    const response = await api.put<DonorResponse>(`/donors/${id}`, data);
    return response.data;
  },

  updateDonationCount: async (id: string): Promise<DonorResponse> => {
    const response = await api.patch<DonorResponse>(`/donors/${id}/donate`);
    return response.data;
  },

  toggleAvailability: async (id: string): Promise<DonorResponse> => {
    const response = await api.patch<DonorResponse>(`/donors/${id}/toggle-availability`);
    return response.data;
  },
};

export default DonorService; 