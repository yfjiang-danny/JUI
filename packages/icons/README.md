# Practice For Web Icons With SVGR

## Getting Started

```bash
yarn install && yarn start
```

## Integrate with SVGR

1.  Install package

    ```bash
    yarn add -D @svgr/cli
    ```

2.  Create icons folder

    ```
    src
    └── icons
        ├── src
        |   └── xxx.svg   # SVG source files
        |
        └── dist          # Output
            ├── index.ts  # Entry, all icons will be exported in this file
            └── xxx.tsx   # Output file, correspond to svg source file.
    ```

3.  Add configs

    1.  `svgrrc.js` for `@svgr/cli`

        ```js
        // .svgrrc.js
        module.exports = {
          typescript: true,
          icon: true,
          ref: true,
          expandProps: true,
          filenameCase: "kebab",
          outDir: "src/icons/dist",
          svgoConfig: "svgo.config.js",
        };
        ```

    2.  `svgo.config.js` for `svgo`

        ```js
        // svgo.config.js
        module.exports = {
          multipass: true,
          plugins: [
            {
              name: "preset-default",
              params: {
                overrides: {
                  removeViewBox: false, // Disable removeViewBox, otherwise it might get incorrect performance as change svg's size.
                },
              },
            },
            {
              name: "removeAttrs", // Remove fill attr
              params: {
                attrs: "fill",
              },
            },
            {
              name: "addAttributesToSVGElement", // Add fill's value to be currentColor so we can change svg's color through style.color/class.color
              params: {
                attributes: [
                  {
                    fill: "currentColor",
                  },
                ],
              },
            },
          ],
        };
        ```

4.  Add script to `package.json`
    `"svgr": "rm -fr ./src/icons/dist/* && svgr ./src/icons/src --config-file svgrrc.js --svgo-config svgo.config.js"`

5.  Run `yarn svgr` will auto convert `.svg` to svg component
