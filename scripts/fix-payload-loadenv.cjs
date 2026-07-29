/* Preload shim: works around a CJS/ESM interop bug where tsx's transform of
   node_modules/payload/dist/bin/loadEnv.js loses the default import of
   `@next/env`, throwing "Cannot destructure property 'loadEnvConfig' of
   'import_env.default' as it is undefined" the moment `getPayload()` is
   called from a standalone tsx script (scripts/seed*.ts).

   Pre-populates require.cache for that exact file with a working
   implementation before payload/tsx ever load it. Node's package "exports"
   restrictions don't apply to direct filesystem requires, so this is safe
   without touching node_modules. Remove once payload/tsx ship a fix. */

const path = require('path');
const Module = require('module');
const { loadEnvConfig } = require('@next/env');

const loadEnvPath = path.join(__dirname, '..', 'node_modules', 'payload', 'dist', 'bin', 'loadEnv.js');

const shim = new Module(loadEnvPath, null);
shim.filename = loadEnvPath;
shim.loaded = true;
shim.exports = {
  loadEnv(envPath) {
    if (envPath?.length) {
      loadEnvConfig(envPath, true);
      return;
    }
    const dev = process.env.NODE_ENV !== 'production';
    loadEnvConfig(process.cwd(), dev);
  },
};

require.cache[loadEnvPath] = shim;
