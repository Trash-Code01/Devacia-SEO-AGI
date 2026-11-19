import fs from 'fs';
import path from 'path';

/**
 * Lightweight, zero-dependency environment loader.
 * Loads variables from .env and .env.local into process.env without overriding existing environment variables.
 */
export function loadEnv(rootDir = process.cwd()) {
  const envFiles = [
    path.resolve(rootDir, '.env'),
    path.resolve(rootDir, '.env.local')
  ];

  for (const envFile of envFiles) {
    if (fs.existsSync(envFile)) {
      try {
        const content = fs.readFileSync(envFile, 'utf-8');
        for (const rawLine of content.split(/\r?\n/)) {
          const line = rawLine.trim();
          if (!line || line.startsWith('#')) continue;
          
          const eqIdx = line.indexOf('=');
          if (eqIdx > 0) {
            const key = line.slice(0, eqIdx).trim();
            let val = line.slice(eqIdx + 1).trim();
            
            // Remove matching enclosing quotes
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }

            // Expand escaped newlines
            val = val.replace(/\\n/g, '\n');

            if (process.env[key] === undefined) {
              process.env[key] = val;
            }
          }
        }
      } catch (err) {
        // Silently continue if .env reading fails
      }
    }
  }
}

// Auto-run if imported
loadEnv();
