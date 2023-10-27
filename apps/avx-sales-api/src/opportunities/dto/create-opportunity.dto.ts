import { ICreateAvxOpportunityDto } from '@project-x/model';

export class CreateOpportunityDto implements ICreateAvxOpportunityDto {
  name: string;
  description: string;
  value: number;
  probability: number;
  status: string;
}
