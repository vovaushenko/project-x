export class CreateOpportunityDto {
  name: string;
  description: string;
  value: number;
  probability: number;
  status: string;

  constructor(partial: Partial<CreateOpportunityDto>) {
    Object.assign(this, partial);
  }
}
