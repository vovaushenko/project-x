# @project-x Model package

This package is the source of truth for sales applications both for client and server.
Contains models, dtos, interfaces and validation schemas to be used by other packages.

!! Important: package should be build before working in dev mode

```sh
 pnpm run build
```

## @project-x/model export cjs and esm modules

Since current backend framework has hard time with esm, for now we are bundling cjs and esm modules.
