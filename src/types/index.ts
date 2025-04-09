export type EntityType = 's-corp' | 'c-corp' | 'llc' | 'partnership';

export type TaxPreparer = 'professional' | 'self';

export type AuditHistory = 'yes' | 'no';
export type TaxAdjustments = 'yes' | 'no';
export type TaxAmendments = 'yes' | 'no';
export type ForeignSubsidiaries = 'yes' | 'no';

export type PolicyState = 'Draft Quote' | 'Ineligible' | 'Priced Quote' | 'Payment Authorized';

export interface UnderwritingFormData {
  name: string;
  email: string;
  phone: string;
  entityType: EntityType;
  totalAssets: string;
  taxableIncome: string;
  taxPreparer: TaxPreparer;
  auditHistory: AuditHistory;
  taxAdjustments?: TaxAdjustments;
  taxAmendments: TaxAmendments;
  foreignSubsidiaries: ForeignSubsidiaries;
}

export interface PriceQuote {
  immediatePayout: number;
  defendingCost: {
    enabled: boolean;
    coverageAmount: number;
  };
  totalPrice: number;
}

export interface Policy {
  id: string;
  state: PolicyState;
  underwritingData: UnderwritingFormData;
  priceQuote?: PriceQuote;
  createdAt: Date;
  updatedAt: Date;
} 