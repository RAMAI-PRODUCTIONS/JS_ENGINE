/**
 * Build-time tool for processing GLTF models with gltfjsx
 * Run this during build to optimize and generate components
 * 
 * Usage:
 *   node tools/gltfjsx/process-models.js --input assets/models --output assets/models/processed
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, existsSync, mkdirSync } from 'fs';
import { join, resolve, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '../..');

/**
 * Process GLTF models with gltfjsx
 */
class ModelProcessor {
  constructor(options = {}) {
    this.inputDir = options.inputDir || join(rootDir, 'assets', 'models');
    this.outputDir = options.outputDir || join(rootDir, 'assets', 'models', 'processed');
    this.transform = options.transform !== false;
    this.types = options.types || false;
    this.instance = options.instance || false;
    this.instanceAll = options.instanceAll || false;
  }

  /**
   * Process all GLTF/GLB files in input directory
   */
  async processAll() {
    console.log('========================================');
    console.log('GLTFJSX Model Processor');
    console.log('========================================\n');

    if (!existsSync(this.inputDir)) {
      console.error(`Input directory not found: ${this.inputDir}`);
      process.exit(1);
    }

    // Create output directory
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }

    // Find all GLTF/GLB files
    const modelFiles = this.findModelFiles(this.inputDir);
    
    if (modelFiles.length === 0) {
      console.log('No GLTF/GLB files found in', this.inputDir);
      return;
    }

    console.log(`Found ${modelFiles.length} model(s) to process\n`);

    for (const modelFile of modelFiles) {
      await this.processModel(modelFile);
    }

    console.log('\n========================================');
    console.log('Processing complete!');
    console.log('========================================');
  }

  /**
   * Process a single model file
   */
  async processModel(modelPath) {
    const fileName = basename(modelPath);
    const nameWithoutExt = fileName.replace(/\.(gltf|glb)$/i, '');
    const outputPath = join(this.outputDir, `${nameWithoutExt}.tsx`);

    console.log(`Processing: ${fileName}`);

    try {
      const args = [
        modelPath,
        '--output', outputPath
      ];

      if (this.transform) {
        args.push('--transform');
      }

      if (this.types) {
        args.push('--types');
      }

      if (this.instance) {
        args.push('--instance');
      }

      if (this.instanceAll) {
        args.push('--instanceall');
      }

      // Run gltfjsx
      execSync(`npx gltfjsx ${args.join(' ')}`, {
        cwd: rootDir,
        stdio: 'inherit'
      });

      console.log(`✓ Generated: ${outputPath}\n`);
    } catch (error) {
      console.error(`✗ Failed to process ${fileName}:`, error.message);
    }
  }

  /**
   * Find all GLTF/GLB files recursively
   */
  findModelFiles(dir, files = []) {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        this.findModelFiles(fullPath, files);
      } else if (stat.isFile()) {
        const ext = extname(item).toLowerCase();
        if (ext === '.gltf' || ext === '.glb') {
          files.push(fullPath);
        }
      }
    }

    return files;
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

for (let i = 0; i < args.length; i += 2) {
  const key = args[i]?.replace(/^--/, '');
  const value = args[i + 1];
  
  if (key === 'input') {
    options.inputDir = resolve(value);
  } else if (key === 'output') {
    options.outputDir = resolve(value);
  } else if (key === 'transform') {
    options.transform = value !== 'false';
  } else if (key === 'types') {
    options.types = value !== 'false';
  } else if (key === 'instance') {
    options.instance = value !== 'false';
  } else if (key === 'instanceall') {
    options.instanceAll = value !== 'false';
  }
}

// Run processor
const processor = new ModelProcessor(options);
processor.processAll().catch(console.error);

