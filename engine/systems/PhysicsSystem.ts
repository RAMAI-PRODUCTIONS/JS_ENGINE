import { IPhysics, IRigidBody, ICollider, ICollisionInfo, Vector3 } from '../interfaces/IPhysics';

/**
 * Physics System (simplified implementation)
 * In production, you'd integrate a physics engine like Cannon.js, Ammo.js, or Rapier
 */
export class PhysicsSystem implements IPhysics {
  public readonly name: string = 'Physics';
  public readonly priority: number = 10;
  public enabled: boolean = true;
  public gravity: Vector3 = { x: 0, y: -9.81, z: 0 };

  private rigidBodies: Map<string, IRigidBody> = new Map();
  private colliders: Map<string, ICollider> = new Map();
  private collisionEnterCallbacks: Array<(collision: ICollisionInfo) => void> = [];
  private collisionExitCallbacks: Array<(collision: ICollisionInfo) => void> = [];
  private triggerEnterCallbacks: Array<(entityA: string, entityB: string) => void> = [];
  private triggerExitCallbacks: Array<(entityA: string, entityB: string) => void> = [];

  async initialize(): Promise<void> {
    console.log('[PhysicsSystem] Initialized (Simple implementation - integrate real physics engine for production)');
  }

  update(deltaTime: number): void {
    this.step(deltaTime);
  }

  dispose(): void {
    this.rigidBodies.clear();
    this.colliders.clear();
  }

  createRigidBody(entityId: string, mass: number, isStatic: boolean): IRigidBody {
    const body: IRigidBody = {
      id: `rb_${entityId}`,
      entityId,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0, w: 1 },
      velocity: { x: 0, y: 0, z: 0 },
      angularVelocity: { x: 0, y: 0, z: 0 },
      mass,
      isStatic,
      isKinematic: false,
      useGravity: !isStatic,
      applyForce: (force: Vector3) => {
        if (!body.isStatic && body.mass > 0) {
          const acceleration = {
            x: force.x / body.mass,
            y: force.y / body.mass,
            z: force.z / body.mass
          };
          body.velocity.x += acceleration.x;
          body.velocity.y += acceleration.y;
          body.velocity.z += acceleration.z;
        }
      },
      applyImpulse: (impulse: Vector3) => {
        if (!body.isStatic) {
          body.velocity.x += impulse.x;
          body.velocity.y += impulse.y;
          body.velocity.z += impulse.z;
        }
      },
      applyTorque: (torque: Vector3) => {
        if (!body.isStatic) {
          body.angularVelocity.x += torque.x;
          body.angularVelocity.y += torque.y;
          body.angularVelocity.z += torque.z;
        }
      },
      setVelocity: (velocity: Vector3) => {
        body.velocity = { ...velocity };
      }
    };

    this.rigidBodies.set(body.id, body);
    return body;
  }

  removeRigidBody(id: string): void {
    this.rigidBodies.delete(id);
  }

  getRigidBody(entityId: string): IRigidBody | null {
    for (const body of this.rigidBodies.values()) {
      if (body.entityId === entityId) {
        return body;
      }
    }
    return null;
  }

  createCollider(entityId: string, type: ICollider['type'], params: any): ICollider {
    const collider: ICollider = {
      id: `col_${entityId}_${Date.now()}`,
      entityId,
      type,
      isTrigger: params.isTrigger || false,
      ...(type === 'box' && { size: params.size }),
      ...(type === 'sphere' && { radius: params.radius }),
      ...(type === 'capsule' && { height: params.height, radius: params.radius })
    };

    this.colliders.set(collider.id, collider);
    return collider;
  }

  removeCollider(id: string): void {
    this.colliders.delete(id);
  }

  raycast(_origin: Vector3, _direction: Vector3, _maxDistance: number) {
    // Simplified raycast - in production use physics engine's raycast
    return {
      hit: false
    };
  }

  overlapSphere(_center: Vector3, _radius: number): string[] {
    // Simplified overlap test
    return [];
  }

  onCollisionEnter(callback: (collision: ICollisionInfo) => void): void {
    this.collisionEnterCallbacks.push(callback);
  }

  onCollisionExit(callback: (collision: ICollisionInfo) => void): void {
    this.collisionExitCallbacks.push(callback);
  }

  onTriggerEnter(callback: (entityA: string, entityB: string) => void): void {
    this.triggerEnterCallbacks.push(callback);
  }

  onTriggerExit(callback: (entityA: string, entityB: string) => void): void {
    this.triggerExitCallbacks.push(callback);
  }

  step(deltaTime: number): void {
    // Simplified physics simulation
    this.rigidBodies.forEach(body => {
      if (body.isStatic) return;

      // Apply gravity
      if (body.useGravity) {
        body.velocity.x += this.gravity.x * deltaTime;
        body.velocity.y += this.gravity.y * deltaTime;
        body.velocity.z += this.gravity.z * deltaTime;
      }

      // Update position
      body.position.x += body.velocity.x * deltaTime;
      body.position.y += body.velocity.y * deltaTime;
      body.position.z += body.velocity.z * deltaTime;

      // Simple damping
      const damping = 0.99;
      body.velocity.x *= damping;
      body.velocity.y *= damping;
      body.velocity.z *= damping;
    });
  }
}

