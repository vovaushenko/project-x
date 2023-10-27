import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import { Opportunity } from '../entities/opportunity.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from '../dto/create-opportunity.dto';

@Injectable()
export class OpportunitiesRepository {
  constructor(
    @InjectRepository(Opportunity)
    private optyRepository: Repository<Opportunity>,
  ) {}

  async create(saveOptyDto: CreateOpportunityDto & { id: string }) {
    const saveOptyResult = await this.optyRepository.save(saveOptyDto);
    return saveOptyResult;
  }

  async findAll() {
    return await this.optyRepository.find();
  }

  async findOne(id: string) {
    const foundOpty = await this.optyRepository.findOne({
      where: { id },
    });
    return foundOpty;
  }

  async update(
    toBeUpdatedOpty: Opportunity,
    updateOptyDto: UpdateOpportunityDto,
  ) {
    return await this.optyRepository.save({
      ...toBeUpdatedOpty,
      ...updateOptyDto,
    });
  }

  async remove(id: string) {
    return await this.optyRepository.delete({ id });
  }
}
