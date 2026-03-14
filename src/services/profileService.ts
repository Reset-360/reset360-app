import api, { ApiServiceError, ApiValidationError } from '@/lib/axios';
import { ProfileData } from '@/types/client';
import axios from 'axios';

export interface UpdateProfilePayload {
  // ClientProfile fields
  firstName: string;
  lastName: string;
  segment: string;
  birthDate: string;
  gender: string;
  address?: string;
  city?: string;
  country?: string;
  maritalStatus?: string;
  notes?: string;
  highestEducationalAttainment?: string;
  occupation?: string;
  imageUrl?: string;
  presentingConcerns?: string[];

  // IUser fields (included only when present)
  email?: string;
  phone?: string;
  username?: string;
}

export interface UpdateProfileResult {
  profile: unknown;
  user?: unknown;
}

/**
 * Builds the payload for PATCH /client-profiles/:id
 * Maps ProfileData (local form state) → API shape expected by clientProfileSchema.
 * email and phone are only included if they have a value so the server
 * only runs the uniqueness check when the user actually provided them.
 */
export const buildUpdateProfilePayload = (
  profileData: ProfileData
): UpdateProfilePayload => {
  const payload: UpdateProfilePayload = {
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    segment: profileData.segment,
    birthDate: profileData.birthDate, // z.coerce.date() handles ISO string
    gender: profileData.gender,
    maritalStatus: profileData.maritalStatus,
    address: profileData.address || undefined,
    city: profileData.city || undefined,
    country: profileData.country || undefined,
    notes: profileData.notes || undefined,
    highestEducationalAttainment:
      profileData.highestEducationalAttainment || undefined,
    occupation: profileData.occupation || undefined,
    imageUrl: profileData.imageUrl || undefined,
    presentingConcerns: profileData.presentingConcerns?.length
      ? profileData.presentingConcerns
      : undefined,
  };

  // Only send username/ email / phone if the user has provided values —
  // the server will then check uniqueness against other users.
  if (profileData.username) payload.username = profileData.username;
  if (profileData.email) payload.email = profileData.email;
  if (profileData.phone) {
    // Combine countryCode + phone into a single E.164-style string
    // e.g. "+63" + "9171234567" → "+639171234567"
    const digits = profileData.phone.replace(/\D/g, '');
    payload.phone = digits;
  }

  return payload;
};

/**
 * PATCH /client/profiles/:id
 * Sends both clientProfile fields and optional user fields (email, phone)
 * in a single request. The server handles updating both models.
 */
export const updateClientProfile = async (
  clientProfileId: string,
  payload: UpdateProfilePayload
): Promise<UpdateProfileResult> => {
  try {
    const { data } = await api.put<UpdateProfileResult>(
      `/client/profiles/${clientProfileId}`,
      payload
    );
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // err.response.data is { [field]: "message" }
      const errors: Record<string, string> = err.response?.data ?? {};
      throw new ApiServiceError(err.response?.status ?? 500, errors);
    }

    throw err;
  }
};

export interface ChangePasswordPayload {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

/**
 * POST /proxy/users/:id/change-password
 *
 * Error response shape from the API: { [field]: "message" }
 * e.g. { "currentPassword": "Your current password is incorrect." }
 */
export const changePassword = async (
  payload: ChangePasswordPayload
): Promise<void> => {
  try {
    await api.post(`/users/${payload.userId}/change-password`, payload);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errors: Record<string, string> = err.response?.data ?? {};
      throw new ApiValidationError(errors);    
    }
    
    throw err;
  }
};