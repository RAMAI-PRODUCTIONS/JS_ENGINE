import { IScene } from '../interfaces/IScene';
import { IEntity } from '../interfaces/IEntity';
import { generateId } from '../utils/IdGenerator';

/**
 * Scene implementation
 * Manages entities and scene-level data
 */
export class Scene implements IScene {
  public readonly id: string;
  public name: string;
  public readonly entities: IEntity[] = [];
  public isLoaded: boolean = false;

  private entityMap: Map<string, IEntity> = new Map();

  constructor(name: string = 'Scene') {
    this.id = generateId();
    this.name = name;
  }

  async load(): Promise<void> {
    if (this.isLoaded) return;
    
    // Override in subclasses to load scene-specific assets
    this.isLoaded = true;
  }

  async unload(): Promise<void> {
    if (!this.isLoaded) return;
    
    // Clean up all entities
    this.entities.forEach(entity => entity.destroy());
    this.entities.length = 0;
    this.entityMap.clear();
    
    this.isLoaded = false;
  }

  onActivate(): void {
    // Override in subclasses for scene activation logic
  }

  onDeactivate(): void {
    // Override in subclasses for scene deactivation logic
  }

  update(deltaTime: number): void {
    this.entities.forEach(entity => entity.update(deltaTime));
  }

  addEntity(entity: IEntity): void {
    this.entities.push(entity);
    this.entityMap.set(entity.id, entity);
  }

  removeEntity(entity: IEntity): boolean {
    const index = this.entities.indexOf(entity);
    if (index === -1) return false;
    
    this.entities.splice(index, 1);
    this.entityMap.delete(entity.id);
    entity.destroy();
    return true;
  }

  findEntity(id: string): IEntity | null {
    return this.entityMap.get(id) || null;
  }

  findEntityByName(name: string): IEntity | null {
    return this.entities.find(e => e.name === name) || null;
  }

  findEntitiesByTag(tag: string): IEntity[] {
    const results: IEntity[] = [];
    
    const search = (entity: IEntity) => {
      if (entity.tags.has(tag)) {
        results.push(entity);
      }
      entity.children.forEach(search);
    };
    
    this.entities.forEach(search);
    return results;
  }

  findEntitiesWithComponent(componentType: string): IEntity[] {
    const results: IEntity[] = [];
    
    const search = (entity: IEntity) => {
      if (entity.hasComponent(componentType)) {
        results.push(entity);
      }
      entity.children.forEach(search);
    };
    
    this.entities.forEach(search);
    return results;
  }

  serialize(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      entities: this.entities.map(entity => ({
        id: entity.id,
        name: entity.name,
        active: entity.active,
        tags: Array.from(entity.tags),
        components: entity.getAllComponents().map(c => c.serialize())
      }))
    };
  }

  async deserialize(data: Record<string, any>): Promise<void> {
    // Implementation would reconstruct scene from data
    // This is a placeholder for scene serialization
    this.name = data.name || this.name;
  }
}

