import { Entity } from "@/data/types";

export interface RetrieveRepository<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
  getByFilter(filter: (entitity: T) => boolean): T[];
}

export interface ModifyRepository<T> extends RetrieveRepository<T> {
  create(entity: T): T;
  update(id: string, entity: Partial<T>): T | undefined;
  delete(id: string): void;
}

export class InMemoryRepository<T extends Entity> implements RetrieveRepository<T> {
  private entities: T[];
  
  constructor (initialEntities: T[] = []) {
    this.entities = initialEntities;
  }
  
  getAll(): T[] {
    return this.entities;
  }
  
  getById(id: string): T | undefined {
    return this.entities.find(entity => entity.id === id);
  }

  getByFilter(filter: (entitity: T) => boolean): T[] {
    return this.entities.filter(filter);
  }
}

export class PersistRepository<T extends Entity> implements ModifyRepository<T> {
  getAll(): T[] {
    throw new Error("Method not implemented.");
  }

  getById(id: string): T | undefined {
    throw new Error("Method not implemented.");
  }

  getByFilter(filter: (entitity: T) => boolean): T[] {
    throw new Error("Method not implemented.");
  }

  create(entity: T): T {
    throw new Error("Method not implemented.");
  }

  update(id: string, entity: Partial<T>): T | undefined {
    throw new Error("Method not implemented.");
  }
  
  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
}
