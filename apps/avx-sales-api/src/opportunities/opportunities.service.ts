import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
import { OpportunitiesRepository } from './repository/opportunities.repository';
import { getUUID } from 'src/common/uuid';

@Injectable()
export class OpportunitiesService {
  constructor(private opportunitiesRepository: OpportunitiesRepository) {}

  async create(createOpportunityDto: CreateOpportunityDto) {
    return await this.opportunitiesRepository.create({
      ...createOpportunityDto,
      id: getUUID(),
    });
  }

  async findAll() {
    return await this.opportunitiesRepository.findAll();
  }

  async findOne(id: string) {
    const foundOpty = await this.opportunitiesRepository.findOne(id);
    if (!foundOpty) {
      throw new NotFoundException('Resource not found');
    }
    return this.opportunitiesRepository.findOne(id);
  }

  async update(id: string, updateOpportunityDto: UpdateOpportunityDto) {
    const toBeUpdatedOpty = await this.findOne(id);

    return this.opportunitiesRepository.update(
      toBeUpdatedOpty,
      updateOpportunityDto,
    );
  }

  async remove(id: string) {
    const toBeDeletedOpty = await this.findOne(id);
    this.opportunitiesRepository.remove(toBeDeletedOpty.id);
  }
}
