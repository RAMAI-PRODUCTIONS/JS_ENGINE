import { IRenderer } from '../interfaces/IRenderer';
import { IScene } from '../interfaces/IScene';
import * as THREE from 'three';

/**
 * Three.js-based Renderer System
 */
export class RendererSystem implements IRenderer {
  public readonly name: string = 'Renderer';
  public readonly priority: number = 100;
  public enabled: boolean = true;

  public canvas: HTMLCanvasElement;
  public width: number;
  public height: number;
  public shadowsEnabled: boolean = true;
  public shadowQuality: 'low' | 'medium' | 'high' = 'medium';
  public postProcessingEnabled: boolean = false;

  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private threeScene: THREE.Scene | null = null;
  private entityMeshes: Map<string, THREE.Object3D> = new Map();
  private gltfLoader: any = null;
  private stats = {
    fps: 0,
    drawCalls: 0,
    triangles: 0,
    textures: 0,
    geometries: 0
  };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;

    // Create Three.js renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.shadowMap.enabled = this.shadowsEnabled;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Create default camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
  }

  async initialize(): Promise<void> {
    console.log('[RendererSystem] Initialized');
    this.threeScene = new THREE.Scene();
    
    // Lazy load GLTFLoader when needed
    // Initialize it here for async loading
  }

  update(_deltaTime: number): void {
    // Renderer updates happen in render() method
  }

  dispose(): void {
    this.renderer.dispose();
  }

  setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  setPixelRatio(ratio: number): void {
    this.renderer.setPixelRatio(ratio);
  }

  render(scene: IScene): void {
    if (!this.threeScene) {
      this.threeScene = new THREE.Scene();
    }

    // Clear previous frame (but keep loaded meshes)
    // We'll add back entities each frame
    const existingMeshes = Array.from(this.entityMeshes.values());
    existingMeshes.forEach(mesh => {
      if (this.threeScene!.children.includes(mesh)) {
        this.threeScene!.remove(mesh);
      }
    });

    // Get camera from scene
    const mainCameraEntity = scene.findEntitiesWithComponent('Camera').find(
      (e: any) => {
        const cam = e.getComponent('Camera');
        return cam && (cam as any).isMain;
      }
    );

    if (mainCameraEntity) {
      const transform = mainCameraEntity.getComponent('Transform');
      const camera = mainCameraEntity.getComponent('Camera');
      if (transform && camera) {
        this.camera.position.set(transform.position.x, transform.position.y, transform.position.z);
        this.camera.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
        this.camera.fov = (camera as any).fov;
        this.camera.near = (camera as any).near;
        this.camera.far = (camera as any).far;
        this.camera.updateProjectionMatrix();
      }
    }

    // Add lights from scene
    scene.findEntitiesWithComponent('Light').forEach((entity: any) => {
      const light = entity.getComponent('Light');
      const transform = entity.getComponent('Transform');
      if (light && this.threeScene) {
        const lightType = (light as any).lightType;
        let threeLight: THREE.Light;

        if (lightType === 'directional') {
          threeLight = new THREE.DirectionalLight();
        } else if (lightType === 'point') {
          threeLight = new THREE.PointLight();
        } else if (lightType === 'spot') {
          threeLight = new THREE.SpotLight();
        } else {
          threeLight = new THREE.AmbientLight();
        }

        if (transform && threeLight instanceof THREE.DirectionalLight || threeLight instanceof THREE.PointLight || threeLight instanceof THREE.SpotLight) {
          threeLight.position.set(transform.position.x, transform.position.y, transform.position.z);
        }

        threeLight.intensity = (light as any).intensity;
        threeLight.color.setRGB((light as any).color.r, (light as any).color.g, (light as any).color.b);
        this.threeScene.add(threeLight);
      }
    });

    // Render entities with GLTFModel components
    const gltfEntities = scene.findEntitiesWithComponent('GLTFModel');
    gltfEntities.forEach((entity: any) => {
      this.renderGLTFEntity(entity);
    });

    // Render entities with MeshRenderer (basic meshes)
    scene.findEntitiesWithComponent('MeshRenderer').forEach((entity: any) => {
      this.renderMeshEntity(entity);
    });

    // Render the scene
    this.renderer.render(this.threeScene, this.camera);
    
    // Update stats
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.triangles = this.renderer.info.render.triangles;
  }

  private renderGLTFEntity(entity: any): void {
    const gltfModel = entity.getComponent('GLTFModel');
    const transform = entity.getComponent('Transform');
    
    if (!gltfModel || !transform || !this.threeScene) return;

    const modelPath = (gltfModel as any).modelPath;
    if (!modelPath) return;

    // Check if already loaded
    const meshKey = `${entity.id}-${modelPath}`;
    let threeMesh = this.entityMeshes.get(meshKey);

    if (!threeMesh) {
      // Start async loading (non-blocking)
      this.loadGLTFAsync(meshKey, modelPath, gltfModel);
      return; // Skip this frame, will render once loaded
    }

    if (threeMesh && this.threeScene) {
      // Update transform
      threeMesh.position.set(transform.position.x, transform.position.y, transform.position.z);
      threeMesh.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
      threeMesh.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);

      // Add to scene if not already added
      if (!this.threeScene.children.includes(threeMesh)) {
        this.threeScene.add(threeMesh);
      }
    }
  }

  private async loadGLTFAsync(meshKey: string, modelPath: string, gltfModel: any): Promise<void> {
    if (!this.gltfLoader) {
      const GLTFLoaderModule = await import('three/examples/jsm/loaders/GLTFLoader.js');
      this.gltfLoader = new GLTFLoaderModule.GLTFLoader();
    }

    try {
      const gltf = await new Promise<any>((resolve, reject) => {
        this.gltfLoader.load(modelPath, resolve, undefined, reject);
      });

      if (gltf.scene) {
        const threeMesh = gltf.scene.clone();
        
        // Apply material override if specified
        const materialOverride = (gltfModel as any).materialOverride;
        if (materialOverride) {
          threeMesh.traverse((child: any) => {
            if (child.isMesh) {
              let material: THREE.Material;
              
              if (materialOverride.type === 'unlit') {
                material = new THREE.MeshBasicMaterial({
                  color: materialOverride.color 
                    ? new THREE.Color(materialOverride.color.r, materialOverride.color.g, materialOverride.color.b)
                    : 0xffffff
                });
              } else {
                material = new THREE.MeshStandardMaterial({
                  color: materialOverride.color 
                    ? new THREE.Color(materialOverride.color.r, materialOverride.color.g, materialOverride.color.b)
                    : 0xffffff
                });
              }

              child.material = material;
            }
          });
        }
        
        this.entityMeshes.set(meshKey, threeMesh);
      }
    } catch (error) {
      console.error(`[RendererSystem] Failed to load GLTF: ${modelPath}`, error);
    }
  }

  private renderMeshEntity(entity: any): void {
    const meshRenderer = entity.getComponent('MeshRenderer');
    const transform = entity.getComponent('Transform');
    
    if (!meshRenderer || !transform || !this.threeScene) return;

    // Create basic geometry (cube for now)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);
    
    mesh.position.set(transform.position.x, transform.position.y, transform.position.z);
    mesh.rotation.set(transform.rotation.x, transform.rotation.y, transform.rotation.z);
    mesh.scale.set(transform.scale.x, transform.scale.y, transform.scale.z);
    
    this.threeScene.add(mesh);
  }

  getStats() {
    return { ...this.stats };
  }

  getContext(): THREE.WebGLRenderer {
    return this.renderer;
  }

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
}

