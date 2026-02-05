export type CurrencyCode = 'PHP';
export type AdaptsPricingMode = 'flat' | 'tiered';

export enum EPaymentProvider {
  Paymongo = 'paymongo',
  Manual = 'manual',
}

export enum EPaymentStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Voided = 'voided',
  Refunded = 'refunded',
}

export enum EManualPaymentMethod {
  Cash = 'cash',
  BankTransfer = 'bank_transfer',
  GCashManual = 'gcash_manual',
  Check = 'check',
  Invoice = 'invoice',
  Comp = 'comp',
  Other = 'other',
}

export enum EPurchaseBuyerType {
  Individual = 'individual',
  Organization = 'organization',
}

export enum EPurchaseStatus {
  Pending = 'pending',
  Paid = 'paid',
  Failed = 'failed',
  Expired = 'expired',
  Cancelled = 'cancelled',
}

export enum EProductCode {
  ADAPTS_SEAT = 'ADAPTS_SEAT',
}

export interface IPurchaseItem {
  code: EProductCode;
  quantity: number;
}

export interface IPricingSnapshotItem {
  code: EProductCode;
  quantity: number;
  unitAmount: number; // centavos
  totalAmount: number; // centavos
  currency: CurrencyCode;
  matchedTierId?: string;
  matchedTierName?: string | null;
}

export interface IPurchasePricingSnapshot {
  currency: CurrencyCode;
  items: IPricingSnapshotItem[];
  subtotalAmount: number; // centavos
  totalAmount: number; // centavos
}

export interface IPurchaseBuyer {
  type: EPurchaseBuyerType;

  // Individual checkout (logged-in)
  userId?: string;

  // Organization checkout (marketing website)
  organizationName?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
}

export interface IPurchase {
  _id: string;
  ref: string;

  buyer: IPurchaseBuyer;
  status: EPurchaseStatus;

  items: IPurchaseItem[];
  pricingSnapshot: IPurchasePricingSnapshot;

  // PayMongo fields come later (keep placeholder)
  paymentId: string;
  paymentProvider?: EPaymentProvider;
  paymongo?: {
    paymentIntentId?: string | null;
    paymentIntentStatus?: string | null;
    lastEventId?: string | null;

    checkoutSessionId?: string | null
    checkoutUrl?: string | null
  };

  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPaymentProviderMeta {
  paymongo?: {
    paymentIntentId?: string | null;
    paymentIntentStatus?: string | null;
    lastEventId?: string | null;
    clientKey?: string | null;
    
    checkoutSessionId?: string | null
    checkoutUrl?: string | null
  };

  manual?: {
    method?: EManualPaymentMethod | null;
    referenceNo?: string | null;
    notes?: string | null;
    receivedAt?: Date | null;
  };
}

export interface IPayment {
  _id: string;
  ref: string
  purchaseId: string | null;

  provider: EPaymentProvider;
  status: EPaymentStatus;

  currency: CurrencyCode;
  amount: number;

  createdBy?: string | null; // admin userId for manual logging
  paidAt?: Date | null;

  providerMeta?: IPaymentProviderMeta;

  createdAt?: Date;
  updatedAt?: Date;
}