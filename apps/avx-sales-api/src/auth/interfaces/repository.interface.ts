export interface ObjectLiteral {
  [key: string]: any;
}

export interface RepositoryInterface<EntityType> {
  save(entity: Partial<EntityType>): Promise<EntityType>;
  update(
    criteria:
      | string
      | number
      | string[]
      | Date
      | number[]
      | Date[]
      | Partial<EntityType>
      | EntityType,
    partialEntity: Partial<EntityType>,
  ): Promise<Partial<EntityType>>;
  findOne(options: any): Promise<EntityType>;
  find(options?: any): Promise<EntityType[]>;
  create(entity): EntityType;
}
