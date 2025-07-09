#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

(function sync() {
  const rootDir = process.cwd();
  const srcPath = path.join(rootDir, 'AGENTS.md');

  if (!fs.existsSync(srcPath)) {
    console.error('Error: AGENTS.md 不存在於根目錄！');
    process.exit(1);
  }

  const content = fs.readFileSync(srcPath, 'utf8');
  const targets = [
    path.join(rootDir, '.github', 'copilot-instructions.md'),
    path.join(rootDir, 'GEMINI.md'),
    path.join(rootDir, 'CLAUDE.md'),
    path.join(rootDir, '.clinerules', '00.README.MD'),
  ];

  for (const dest of targets) {
    try {
      fs.writeFileSync(dest, content, 'utf8');
      console.log(`Copied AGENTS.md → ${path.relative(rootDir, dest)}`);
    } catch (err) {
      console.error(`寫入 ${path.relative(rootDir, dest)} 失敗：`, err);
    }
  }
})();
