#!/usr/bin/env node
/**
 * Model Download Script for RE:ST
 * Downloads the fine-tuned Qwen3-1.7B model from Hugging Face
 * 
 * Usage: node scripts/download-model.js
 * Or: npm run download-model
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODEL_URL = 'https://huggingface.co/intern26050018-Derek/re-st-qwen3-1.7b/resolve/main/qwen3-1.7b.Q4_K_M.gguf';
const MODEL_DIR = path.join(__dirname, '../models');
const MODEL_PATH = path.join(MODEL_DIR, 'qwen3-1.7b.Q4_K_M.gguf');
const EXPECTED_SIZE = 1084634693; // ~1.08 GB

function downloadFile(url, dest, expectedSize) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
    }

    const file = fs.createWriteStream(dest);
    let downloaded = 0;
    const startTime = Date.now();

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode} ${response.statusMessage}`));
        return;
      }

      const totalSize = parseInt(response.headers['content-length'], 10) || expectedSize;
      
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const progress = ((downloaded / totalSize) * 100).toFixed(1);
        const speed = (downloaded / (Date.now() - startTime) * 1000 / 1024 / 1024).toFixed(1);
        process.stdout.write(`\rDownloading: ${progress}% (${(downloaded/1024/1024).toFixed(1)} MB / ${(totalSize/1024/1024).toFixed(1)} MB) @ ${speed} MB/s`);
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`\n✅ Download complete: ${MODEL_PATH}`);
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🔄 RE:ST Model Downloader');
  console.log('==========================');
  console.log(`Model: Qwen3-1.7B (Q4_K_M quantized)`);
  console.log(`Size: ~1.08 GB`);
  console.log(`Destination: ${MODEL_PATH}`);
  console.log('');

  // Check if already exists
  if (fs.existsSync(MODEL_PATH)) {
    const stats = fs.statSync(MODEL_PATH);
    if (stats.size === EXPECTED_SIZE) {
      console.log('✅ Model already exists and is valid');
      return;
    }
    console.log('⚠️  Model exists but size mismatch, re-downloading...');
    fs.unlinkSync(MODEL_PATH);
  }

  try {
    await downloadFile(MODEL_URL, MODEL_PATH, EXPECTED_SIZE);
    
    // Verify
    const stats = fs.statSync(MODEL_PATH);
    if (stats.size !== EXPECTED_SIZE) {
      throw new Error(`Size mismatch: expected ${EXPECTED_SIZE}, got ${stats.size}`);
    }
    
    console.log('✅ Model verified and ready!');
    console.log(`   Path: ${MODEL_PATH}`);
    console.log(`   Size: ${(stats.size/1024/1024/1024).toFixed(2)} GB`);
  } catch (error) {
    console.error('❌ Download failed:', error.message);
    process.exit(1);
  }
}

main();