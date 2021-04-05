import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const pkg = require('./package.json');
const plugins = [
    replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
        preventAssignment: true
    }),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript()
];

export default {
    input: 'src/index.ts',
    plugins: plugins,
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/graph-svg.min.js',
            format: 'iife',
            name: 'graphsvg',
            plugins: [terser()]
        }
    ]
};