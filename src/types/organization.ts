import { IUser } from './user';

export enum EOrgMemberRole {
  Owner = 'OWNER',
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

export enum EOrgMemberStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Invited = 'INVITED',
  Suspended = 'SUSPENDED',
}

export enum EGenerationStatus {
  Queued = "QUEUED",
  Generating = "GENERATING",
  Done = "DONE",
  Failed = "FAILED",
}

export enum EOrgStatus {
  Active = 'ACTIVE',
  Pending = 'PENDING',
  Expired = 'EXPIRED',
  Suspended  = 'SUSPENDED',
  Deleted = 'DELETED'
}

export interface IOrgMember {
  _id: string;
  ref?: string;

  organizationId: string;
  userId: string;

  role: EOrgMemberRole;
  status: EOrgMemberStatus;

  invitedByUserId?: string;
  joinedAt?: Date;

  firstName?: string;
  lastName?: string;

  user?: IUser;
  organization: IOrganization;

  createdAt: Date;
  updatedAt: Date;
}

export interface IOrganization {
  _id: string;
  ref?: string;

  name: string;
  email?: string; // contact email
  phone?: string;
  address?: string;

  // For billing / tracking
  createdBy?: string; // Admin or org owner user
  primaryAdminUserId?: string;
  latestPurchaseId?: string;

  logoUrl?: string;

  status: EOrgStatus;

  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IOrgSeatBatch {
  _id: string;
  ref?: string;
  organizationId: string;
  cohortId?: string; // Remove this
  purchaseId?: string;
  totalSeats: number;
  seatsIssued: number; // how many codes generated
  seatsRedeemed: number; // how many codes redeemed
  status: EGenerationStatus;
  expiresAt?: Date;
  lockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

