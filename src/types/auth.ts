import { EClientSegment, EClientStatus } from './client';
import { EUserRole } from './user';

export interface LoginParams {
  username: string;
  password: string;
  role: EUserRole;
}

export interface RegisterParams {
  username: string;
  password: string;
  email?: string;
  phone?: string;
  countryCode?: string;
  role?: EUserRole
  profile: {
    firstName?: string;
    lastName?: string;
    segment: EClientSegment;
    gender: string;
    birthDate: Date;
    status: EClientStatus
  };
}
