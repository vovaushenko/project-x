import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import { AVXOpportunity } from '../entities/opportunity.entity';

export class OpportunitiesRepository {
  private opportunities: AVXOpportunity[] = [];

  constructor() {
    this._seedOpportunities();
  }

  create(opportunity: AVXOpportunity): boolean {
    this.opportunities.push(opportunity);
    return true;
  }

  findAll() {
    return this.opportunities;
  }

  findOne(id: number) {
    const foundOpportunity = this.opportunities.find((opty) => opty.id === id);
    return foundOpportunity;
  }

  update(id: number, updateOpportunityDto: UpdateOpportunityDto) {
    const opportunity = this.findOne(id);
    if (!opportunity) {
      return false;
    }
    this.opportunities = this.opportunities.map((opty) =>
      opty.id === id ? { ...opty, ...updateOpportunityDto } : opty,
    );
    return true;
  }

  remove(id: number) {
    const isOpportunityExist = this.findOne(id);
    if (!isOpportunityExist) {
      return false;
    }
    this.opportunities = this.opportunities.filter((opty) => opty.id !== id);
    return true;
  }

  private _seedOpportunities() {
    for (let i = 0; i < 50; i++) {
      this.create(this._generateRandomOpportunity());
    }
  }

  private _generateRandomOpportunity(): AVXOpportunity {
    const randomId = Math.floor(Math.random() * 999);

    return new AVXOpportunity({
      id: randomId,
      name: `Opportunity ${randomId}`,
      description: `Description for opportunity ${randomId}`,
      value: Math.floor(Math.random() * 9999),
      probability: Math.floor(Math.random() * 100),
      status: 'open',
      created_at: Date.now(),
      updated_at: Date.now(),
    });
  }
}
