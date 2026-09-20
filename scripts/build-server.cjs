const path = require('path');
const esbuild = require('esbuild');

esbuild
  .build({
    entryPoints: [path.join(process.cwd(), 'server.ts')],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    sourcemap: true,
    outfile: path.join(process.cwd(), 'dist', 'server.cjs')
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
