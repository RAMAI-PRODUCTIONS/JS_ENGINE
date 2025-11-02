import { IEntity } from '../interfaces/IEntity';
import { IComponent } from '../interfaces/IComponent';
import { generateId } from '../utils/IdGenerator';

/**
 * Entity implementation
 * Container for components in the ECS architecture
 */
export class Entity implements IEntity {
  public readonly id: string;
  public name: string;
  public parent: IEntity | null = null;
  public readonly children: IEntity[] = [];
  public active: boolean = true;
  public tags: Set<string> = new Set();

  private components: Map<string, IComponent[]> = new Map();

  constructor(name: string = 'Entity') {
    this.id = generateId();
    this.name = name;
  }

  addComponent(component: IComponent): void {
    component.entityId = this.id;
    
    const type = component.type;
    if (!this.components.has(type)) {
      this.components.set(type, []);
    }
    
    this.components.get(type)!.push(component);
    component.onAttach?.();
  }

  getComponent<T extends IComponent>(type: string): T | null {
    const components = this.components.get(type);
    return (components?.[0] as T) || null;
  }

  getComponents<T extends IComponent>(type: string): T[] {
    return (this.components.get(type) as T[]) || [];
  }

  getAllComponents(): IComponent[] {
    const all: IComponent[] = [];
    this.components.forEach(components => all.push(...components));
    return all;
  }

  removeComponent(component: IComponent): boolean {
    const type = component.type;
    const components = this.components.get(type);
    
    if (!components) return false;
    
    const index = components.indexOf(component);
    if (index === -1) return false;
    
    component.onDetach?.();
    components.splice(index, 1);
    
    if (components.length === 0) {
      this.components.delete(type);
    }
    
    return true;
  }

  hasComponent(type: string): boolean {
    return this.components.has(type);
  }

  addChild(entity: IEntity): void {
    if (entity.parent) {
      entity.parent.removeChild(entity);
    }
    
    entity.parent = this;
    this.children.push(entity);
  }

  removeChild(entity: IEntity): boolean {
    const index = this.children.indexOf(entity);
    if (index === -1) return false;
    
    entity.parent = null;
    this.children.splice(index, 1);
    return true;
  }

  findChild(name: string): IEntity | null {
    return this.children.find(child => child.name === name) || null;
  }

  update(deltaTime: number): void {
    if (!this.active) return;
    
    // Update all components
    this.components.forEach(components => {
      components.forEach(component => {
        if (component.enabled && component.onUpdate) {
          component.onUpdate(deltaTime);
        }
      });
    });
    
    // Update children
    this.children.forEach(child => child.update(deltaTime));
  }

  destroy(): void {
    // Destroy all children first
    this.children.forEach(child => child.destroy());
    this.children.length = 0;
    
    // Remove all components
    this.components.forEach(components => {
      components.forEach(component => component.onDetach?.());
    });
    this.components.clear();
    
    // Remove from parent
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }
}

