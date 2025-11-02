import { Scene, Entity, Transform, Camera, Light, MeshRenderer } from '@engine/index';

/**
 * Main Game Scene
 * Example scene showing how to use the engine
 */
export class MainScene extends Scene {
  constructor() {
    super('MainScene');
  }

  async load(): Promise<void> {
    await super.load();

    // Create camera entity
    const cameraEntity = new Entity('MainCamera');
    const cameraTransform = new Transform(
      { x: 0, y: 2, z: 5 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 }
    );
    const camera = new Camera(75, 0.1, 1000);
    camera.isMain = true;

    cameraEntity.addComponent(cameraTransform);
    cameraEntity.addComponent(camera);
    this.addEntity(cameraEntity);

    // Create directional light
    const lightEntity = new Entity('DirectionalLight');
    const lightTransform = new Transform(
      { x: 5, y: 10, z: 5 },
      { x: -45, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 }
    );
    const light = new Light('directional');
    light.intensity = 1.0;
    light.castShadows = true;

    lightEntity.addComponent(lightTransform);
    lightEntity.addComponent(light);
    this.addEntity(lightEntity);

    // Create ambient light
    const ambientLightEntity = new Entity('AmbientLight');
    const ambientLight = new Light('ambient');
    ambientLight.intensity = 0.3;
    ambientLightEntity.addComponent(ambientLight);
    this.addEntity(ambientLightEntity);

    // Create a cube entity (example game object)
    const cubeEntity = new Entity('Cube');
    const cubeTransform = new Transform(
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 }
    );
    const meshRenderer = new MeshRenderer('cube', 'defaultMaterial');

    cubeEntity.addComponent(cubeTransform);
    cubeEntity.addComponent(meshRenderer);
    cubeEntity.tags.add('interactable');
    this.addEntity(cubeEntity);

    console.log('[MainScene] Loaded');
  }

  onActivate(): void {
    super.onActivate();
    console.log('[MainScene] Activated');
  }

  onDeactivate(): void {
    super.onDeactivate();
    console.log('[MainScene] Deactivated');
  }
}

