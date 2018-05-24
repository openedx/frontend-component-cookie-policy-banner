import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import localResolve from 'rollup-plugin-local-resolve';
import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

const externalDependencies = [
  '@edx/edx-bootstrap',
  '@edx/paragon',
  'prop-types',
  'react',
  'react-dom',
  'universal-cookie',
];

const globals = {
  '@edx/paragon': 'Paragon',
  'prop-types': 'PropTypes',
  react: 'React',
  'react-dom': 'ReactDOM',
  'universal-cookie': 'Cookie',
};

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      globals,
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: pkg.name,
      globals,
    },
    {
      file: pkg.module,
      format: 'es',
      name: pkg.name,
      globals,
    },
  ],
  external: externalDependencies,
  plugins: [
    postcss({
      extract: true,
      minimize: true,
    }),
    babel({ exclude: 'node_modules/**' }),
    localResolve(),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      preferBuiltins: true,
      browser: true,
      modulesOnly: true,
    }),
    minify(),
    commonjs(),
    filesize(),
  ],
};

export default config;
