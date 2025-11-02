import { Script, Transform } from '@engine/index';
import type { Quaternion } from '@engine/index';

/**
 * Optimized Quaternion-based Rotation Script
 * Uses quaternions for smooth, efficient rotation (qT = quaternion Transform)
 * Avoids gimbal lock and is more performant than Euler angles
 */
export class QuaternionRotateScript extends Script {
  private transform: Transform | null = null;
  private rotationSpeed: number = 0.5; // Radians per second (slow pace)
  private axis: { x: number; y: number; z: number } = { x: 0, y: 1, z: 0 }; // Y-axis rotation
  
  // Internal quaternion state for optimized rotation
  private currentQuaternion: Quaternion = { x: 0, y: 0, z: 0, w: 1 };

  protected onAwake(): void {
    // Initialize quaternion from Euler rotation
  }

  protected onStart(): void {
    // Get the Transform component from this entity
    this.transform = this.getComponent<Transform>('Transform');
    
    if (!this.transform) {
      console.warn('[QuaternionRotateScript] No Transform component found!');
      return;
    }

    // Convert initial Euler rotation to quaternion
    this.eulerToQuaternion(
      this.transform.rotation.x,
      this.transform.rotation.y,
      this.transform.rotation.z
    );
  }

  protected update(deltaTime: number): void {
    if (!this.transform) return;

    // Rotate quaternion around axis (optimized quaternion multiplication)
    const angle = this.rotationSpeed * deltaTime;
    const halfAngle = angle * 0.5;
    const s = Math.sin(halfAngle);
    const c = Math.cos(halfAngle);

    // Create rotation quaternion
    const rotQ: Quaternion = {
      x: this.axis.x * s,
      y: this.axis.y * s,
      z: this.axis.z * s,
      w: c
    };

    // Multiply quaternions (currentQuaternion = rotQ * currentQuaternion)
    this.multiplyQuaternions(rotQ, this.currentQuaternion);

    // Normalize quaternion to prevent drift
    this.normalizeQuaternion();

    // Convert back to Euler angles for Transform component
    const euler = this.quaternionToEuler(this.currentQuaternion);
    this.transform.rotation.x = euler.x;
    this.transform.rotation.y = euler.y;
    this.transform.rotation.z = euler.z;
  }

  /**
   * Convert Euler angles to quaternion (optimized)
   */
  private eulerToQuaternion(x: number, y: number, z: number): void {
    const c1 = Math.cos(x * 0.5);
    const c2 = Math.cos(y * 0.5);
    const c3 = Math.cos(z * 0.5);
    const s1 = Math.sin(x * 0.5);
    const s2 = Math.sin(y * 0.5);
    const s3 = Math.sin(z * 0.5);

    this.currentQuaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
    this.currentQuaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
    this.currentQuaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
    this.currentQuaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
  }

  /**
   * Convert quaternion to Euler angles (optimized)
   */
  private quaternionToEuler(q: Quaternion): { x: number; y: number; z: number } {
    // Roll (x-axis rotation)
    const sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
    const cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
    const x = Math.atan2(sinr_cosp, cosr_cosp);

    // Pitch (y-axis rotation)
    const sinp = 2 * (q.w * q.y - q.z * q.x);
    const y = Math.abs(sinp) >= 1 
      ? (sinp > 0 ? 1 : -1) * Math.PI / 2 
      : Math.asin(sinp);

    // Yaw (z-axis rotation)
    const siny_cosp = 2 * (q.w * q.z + q.x * q.y);
    const cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
    const z = Math.atan2(siny_cosp, cosy_cosp);

    return { x, y, z };
  }

  /**
   * Multiply two quaternions (q1 * q2) - optimized
   */
  private multiplyQuaternions(q1: Quaternion, q2: Quaternion): void {
    const x = q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y;
    const y = q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x;
    const z = q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w;
    const w = q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z;

    this.currentQuaternion.x = x;
    this.currentQuaternion.y = y;
    this.currentQuaternion.z = z;
    this.currentQuaternion.w = w;
  }

  /**
   * Normalize quaternion to prevent drift
   */
  private normalizeQuaternion(): void {
    const length = Math.sqrt(
      this.currentQuaternion.x * this.currentQuaternion.x +
      this.currentQuaternion.y * this.currentQuaternion.y +
      this.currentQuaternion.z * this.currentQuaternion.z +
      this.currentQuaternion.w * this.currentQuaternion.w
    );

    if (length > 0.00001) {
      const invLength = 1.0 / length;
      this.currentQuaternion.x *= invLength;
      this.currentQuaternion.y *= invLength;
      this.currentQuaternion.z *= invLength;
      this.currentQuaternion.w *= invLength;
    }
  }

  /**
   * Set rotation speed (public API)
   */
  public setRotationSpeed(speed: number): void {
    this.rotationSpeed = speed;
  }

  /**
   * Set rotation axis (public API)
   */
  public setRotationAxis(x: number, y: number, z: number): void {
    const length = Math.sqrt(x * x + y * y + z * z);
    if (length > 0.00001) {
      this.axis.x = x / length;
      this.axis.y = y / length;
      this.axis.z = z / length;
    }
  }

  protected onDestroy(): void {
    // Cleanup
  }
}

