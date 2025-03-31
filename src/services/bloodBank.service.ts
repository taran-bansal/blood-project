import api from './api';

export interface BloodBankData {
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  operatingHours?: {
    open: string;
    close: string;
  };
  services?: string[];
  isOpen24x7?: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
  };
}

export interface InventoryUpdate {
  bloodGroup: string;
  units: number;
}

export interface BloodBankResponse {
  _id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  operatingHours?: {
    open: string;
    close: string;
  };
  inventory: Array<{
    bloodGroup: string;
    units: number;
    lastUpdated: Date;
  }>;
  services: string[];
  isOpen24x7: boolean;
  emergencyContact?: {
    name: string;
    phone: string;
  };
  updatedAt: Date;
}

const BloodBankService = {
  createBloodBank: async (data: BloodBankData): Promise<BloodBankResponse> => {
    const response = await api.post<BloodBankResponse>('/blood-banks', data);
    return response.data;
  },

  getBloodBanks: async (filters?: { location?: string; name?: string; isOpen24x7?: boolean }) => {
    const response = await api.get('/blood-banks', { params: filters });
    return response.data;
  },

  getBloodBankById: async (id: string): Promise<BloodBankResponse> => {
    const response = await api.get<BloodBankResponse>(`/blood-banks/${id}`);
    return response.data;
  },

  updateBloodBank: async (id: string, data: Partial<BloodBankData>): Promise<BloodBankResponse> => {
    const response = await api.put<BloodBankResponse>(`/blood-banks/${id}`, data);
    return response.data;
  },

  updateInventory: async (id: string, data: InventoryUpdate): Promise<BloodBankResponse> => {
    const response = await api.patch<BloodBankResponse>(`/blood-banks/${id}/inventory`, data);
    return response.data;
  },

  searchByAvailability: async (bloodGroup: string, minUnits: number = 1) => {
    const response = await api.get('/blood-banks/search/availability', {
      params: { bloodGroup, minUnits },
    });
    return response.data;
  },

  searchNearby: async (latitude: number, longitude: number, maxDistance: number = 10) => {
    const response = await api.get('/blood-banks/search/nearby', {
      params: { latitude, longitude, maxDistance },
    });
    return response.data;
  },
};

export default BloodBankService; 