import { IAVXOpportunity } from '@project-x/model';
import {
  BaseEntity,
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'opportunities' })
@Check(`"probability" >= 0 AND "probability" <= 100`)
export class Opportunity extends BaseEntity implements IAVXOpportunity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  description: string;

  @Column()
  value: number;

  @Column()
  probability: number;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
