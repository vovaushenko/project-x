export interface IAVXOpportunity {
  id: string;
  name: string;
  description: string;
  value: number;
  probability: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export type ICreateAvxOpportunityDto = Pick<
  IAVXOpportunity,
  'name' | 'probability' | 'status' | 'value'
>;
