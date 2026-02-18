export interface IAdaptsPriceTier {
  id: string;
  name: string;
  minQty: number;
  maxQty: number;
  unitAmount: number; // centavos
  description: string;
  features: string[]
}