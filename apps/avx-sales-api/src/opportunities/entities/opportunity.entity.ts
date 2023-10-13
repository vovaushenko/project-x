import { IAVXOpportunity } from '@project-x/model';

export class AVXOpportunity implements IAVXOpportunity {
  id: number;
  name: string;
  description: string;
  value: number;
  probability: number;
  status: string;
  created_at: number;
  updated_at: number;

  constructor(partial: Partial<AVXOpportunity>) {
    Object.assign(this, partial);
    this.id = randomId();
  }

  static from(dto: Partial<AVXOpportunity>) {
    return new AVXOpportunity(dto);
  }

  static fromEntity(entity: AVXOpportunity) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      value: entity.value,
      probability: entity.probability,
      status: entity.status,
      created_at: entity.created_at,
      updated_at: entity.updated_at,
    });
  }
}

function randomId() {
  return Math.floor(Math.random() * 999);
}
