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
