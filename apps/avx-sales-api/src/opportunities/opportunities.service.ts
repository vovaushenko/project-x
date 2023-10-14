import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { AVXOpportunity } from './entities/opportunity.entity';
import { OpportunitiesRepository } from './repository/opportunities.repository';

@Injectable()
export class OpportunitiesService {
  opportunitiesRepository: OpportunitiesRepository =
    new OpportunitiesRepository();

  create(createOpportunityDto: CreateOpportunityDto) {
    const newOpportunity = AVXOpportunity.from(createOpportunityDto);
    return this.opportunitiesRepository.create(newOpportunity);
  }

  findAll() {
    return this.opportunitiesRepository.findAll();
  }

  findOne(id: number) {
    return this.opportunitiesRepository.findOne(id);
  }

  update(id: number, updateOpportunityDto: UpdateOpportunityDto) {
    return this.opportunitiesRepository.update(id, updateOpportunityDto);
  }

  remove(id: number) {
    return this.opportunitiesRepository.remove(id);
  }
}
