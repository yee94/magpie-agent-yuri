# Source and reproducibility

Adapted from [yee94/opencode-magpie-plugin 0.5.1](https://github.com/yee94/opencode-magpie-plugin/tree/2aa62282e3da728748956e770faca6c67714521d),
commit `2aa62282e3da728748956e770faca6c67714521d`, MIT. The original license
and icon are included unchanged. `src/` contains the complete runtime source,
including pricing data; no implementation is downloaded from the original npm
package. The catalog regression tests are adapted from the same source.

Local changes (also submitted in community PR #802): configurable `agentID` as an advisory header on discovery,
chat and image calls, without overriding the real host's User-Agent;
bundled Git-install metadata; credential-boundary and lifecycle tests. Existing
`magpie.providers` plugin identity and default `opencode` advisory label remain
compatible. The original package and this package must not be loaded together.

Build from this folder with Bun 1.3.14 (no dependencies or install scripts):

```sh
bun run build
bun test tests
```

`dist/index.mjs` is the unminified bundle committed for dependency-free loading.
This private nested package is shipped by the root Agent's Git installation and
loaded as a local directory. Its runtime source/bundle are identical to the
corrected community provider, but it retains the original
`opencode-magpie-plugin` name and requires no separate npm publication.
