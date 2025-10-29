import { VerifiedStatus } from './statusTypes';

export enum EUserRole {
  ADMIN = 'ADMIN',
  COACH = 'COACH',
  CLIENT = 'CLIENT',
}

export type IUser = {
  _id: string;
  username: string;
  email?: string;
  phone?: string;
  role: EUserRole;
  emailStatus?: VerifiedStatus;
  phoneStatus?: VerifiedStatus;
};
