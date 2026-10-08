import esbuild from 'esbuild';
import vue from 'esbuild-plugin-vue3';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isDev = process.argv.includes('--dev');
const watch = isDev;

const define = {
    '__VUE_OPTIONS_API__': 'false',
    '__VUE_PROD_DEVTOOLS__': 'false',
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': 'false',
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
};

const commonConfig = {
    bundle: true,
    minify: !isDev,
    format: 'esm',
    define,
    loader: {
        '.html': 'text'
    },
    plugins: [vue()]
};

async function build() {
    const contexts = [
        // UI Logic (Vue App)
        await esbuild.context({
            ...commonConfig,
            entryPoints: ['src/ui.js'],
            outfile: 'popup/ui-logic.js',
        }),
        // Wrapper Script
        await esbuild.context({
            ...commonConfig,
            entryPoints: ['src/wrapper.js'],
            outfile: 'popup/wrapper.js',
        }),
    ];

    if (watch) {
        await Promise.all(contexts.map(ctx => ctx.watch()));
        console.log('Watching for changes...');
    } else {
        await Promise.all(contexts.map(ctx => ctx.rebuild()));
        await Promise.all(contexts.map(ctx => ctx.dispose()));
        console.log('Build complete');
    }
}

build().catch(err => {
    console.error(err);
    process.exit(1);
});
