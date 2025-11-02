import { ISystem } from './ISystem';

/**
 * Physics types
 */
export type Vector3 = { x: number; y: number; z: number };
export type Quaternion = { x: number; y: number; z: number; w: number };

export interface IRigidBody {
  id: string;
  entityId: string;
  position: Vector3;
  rotation: Quaternion;
  velocity: Vector3;
  angularVelocity: Vector3;
  mass: number;
  isStatic: boolean;
  isKinematic: boolean;
  useGravity: boolean;
  
  applyForce(force: Vector3): void;
  applyImpulse(impulse: Vector3): void;
  applyTorque(torque: Vector3): void;
  setVelocity(velocity: Vector3): void;
}

export interface ICollider {
  id: string;
  entityId: string;
  type: 'box' | 'sphere' | 'capsule' | 'mesh';
  isTrigger: boolean;
  
  // Box
  size?: Vector3;
  
  // Sphere
  radius?: number;
  
  // Capsule
  height?: number;
}

export interface ICollisionInfo {
  entityA: string;
  entityB: string;
  point: Vector3;
  normal: Vector3;
  impulse: number;
}

/**
 * Physics system interface
 * Handles 3D physics simulation
 */
export interface IPhysics extends ISystem {
  /**
   * Gravity vector
   */
  gravity: Vector3;

  /**
   * Create a rigid body
   */
  createRigidBody(entityId: string, mass: number, isStatic: boolean): IRigidBody;

  /**
   * Remove a rigid body
   */
  removeRigidBody(id: string): void;

  /**
   * Get rigid body by entity ID
   */
  getRigidBody(entityId: string): IRigidBody | null;

  /**
   * Create a collider
   */
  createCollider(entityId: string, type: ICollider['type'], params: any): ICollider;

  /**
   * Remove a collider
   */
  removeCollider(id: string): void;

  /**
   * Raycast from origin in direction
   */
  raycast(origin: Vector3, direction: Vector3, maxDistance: number): {
    hit: boolean;
    entityId?: string;
    point?: Vector3;
    normal?: Vector3;
    distance?: number;
  };

  /**
   * Check if a sphere overlaps with any colliders
   */
  overlapSphere(center: Vector3, radius: number): string[];

  /**
   * Register collision callback
   */
  onCollisionEnter(callback: (collision: ICollisionInfo) => void): void;
  onCollisionExit(callback: (collision: ICollisionInfo) => void): void;
  onTriggerEnter(callback: (entityA: string, entityB: string) => void): void;
  onTriggerExit(callback: (entityA: string, entityB: string) => void): void;

  /**
   * Step the physics simulation manually
   */
  step(deltaTime: number): void;
}

