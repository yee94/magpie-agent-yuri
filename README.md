# Yuri as a Magpie Agent

Yuri original website: **https://useyuri.top**.

## Community review status

[Community PR #802](https://github.com/magpie-community/plugins/pull/802)
now includes the provider's complete source as a separate
`@magpie-community/opencode-magpie-provider` package awaiting first publication,
configurable advisory labels, mutation-checked safety tests and real Yuri Web
verification using Magpie's assigned connection key without changing the real
OpenCode User-Agent.
The standalone Git package shares the safety/exit tests, 3-second poll interval,
original Logo and localized package summaries. It no longer appends a mixed
English/Chinese warning to Magpie's localized connection message.

**Git installation is self-contained:** this repository includes the corrected
Provider's complete source and dependency-free runtime under [`provider/`](provider).
The root package remains `magpie-agent-yuri`; the bundled provider keeps the
original `opencode-magpie-plugin` name. The bridge loads that installed local
directory directly, with `agentID: "yuri"` as an advisory label. No package rename,
new npm publication, runtime dependency install or build step is required.
Actual local Agent attribution comes from the key Magpie assigns to the
connection, passed unchanged; OpenCode's real User-Agent is never overwritten.
Existing original/community provider installations remain recognized and are
preserved without duplication or option changes.

Nothing in this update replaces an existing user-owned provider or changes a
running installation automatically.

Adds **Yuri** to Magpie's Agents page. Connecting installs
the bundled [`opencode-magpie-plugin`](provider)
in Yuri's OpenCode V2 service configuration, rather than generating a second,
static provider catalog or changing Yuri's app bundle.

This is a **Magpie agent package**, not an OpenCode GUI plugin. Install this
package in Magpie; the package it injects runs in OpenCode. Yuri's existing
plugin settings show the latter as `magpie.providers`.

The Agent row and installed-plugin card both embed Yuri's original 32px app
icon for offline display. See [artwork provenance](ASSET_NOTICE.md).

## Install from GitHub

Install this package in **Magpie**, not in OpenCode's `plugins` array:

```sh
magpie plugin add github:yee94/magpie-agent-yuri
```

Installation alone does not connect Yuri or change OpenCode's plugins. Turn
**Yuri** on in Magpie's **Agents** page, then choose a model in Yuri. Keep Magpie
running while changing the switch; its Bun host applies the change within about
three seconds. OpenCode watches its configuration; no service restart is requested.

The package lives at this repository's root, so Magpie can install it directly
from GitHub. It is not published to npm or listed in Discover.

For local development:

```sh
git clone https://github.com/yee94/magpie-agent-yuri.git
cd magpie-agent-yuri
magpie plugin add "$(pwd)"
```

## What is written

- `~/.config/magpie/agents/yuri/connection.json` is the connection sidecar Magpie itself
  stashes and restores. It contains only the gateway API URL and assigned key.
- The companion Bun module merges **one entry** into the global OpenCode
  `plugins` array, pointing at the installed package's absolute `provider/`
  directory. A new entry passes
  `options.remote.baseURL` and `options.remote.token` from that connection,
  so it does not guess a port or copy any upstream subscription credentials.
  `options.agentID: "yuri"` sets an advisory header only, not a fake User-Agent
  or a claim to detect which UI sent a request.
- OpenCode's directory is `OPENCODE_CONFIG_DIR`, otherwise
  `$XDG_CONFIG_HOME/opencode`, otherwise `~/.config/opencode`. The bridge checks
  both `opencode.json` and `opencode.jsonc`, plus `OPENCODE_CONFIG` when set.
  It writes the explicit `OPENCODE_CONFIG` if set, otherwise the highest existing
  global file, otherwise a new `opencode.jsonc`.
- Existing npm string/object entries, including pinned versions and options,
  and readable local package references are **left untouched**. They are never
  taken over, downgraded or duplicated. Their own gateway configuration wins.
- JSONC comments, trailing commas, BOM, unrelated settings and plugins are kept.
  The bundled `jsonc-parser` performs token-level edits rather than rewriting
  the user's config as JSON; its license is included in `LICENSE-JSONC-PARSER`.
- `~/.config/magpie/agents/yuri/state.json` records ownership. A private
  `.pending` journal makes interrupted edits recoverable without overwriting
  a concurrent edit. These files can contain configuration credentials;
  they are mode 0600 and must not be shared.

The OpenCode environment variables above must be set on the **Magpie host** as
well as the OpenCode service if it uses non-default paths. Bridge-owned files
belong to Magpie and stay under `~/.config/magpie/agents/yuri/`; nothing is
written into Yuri's own data directory. The Agent's `dir: ~/.config/yuri` is
only an installation-detection hint.

The Agent descriptor API does not expose Magpie's resolved data directory.
This adapter therefore uses its default `~/.config/magpie` location, not an
automatically relocated XDG or portable data directory. A custom `YURI_DATA_DIR`
or Windows installation is not automatically detected either.

## Disconnect and ownership

Turn Yuri off on Magpie's Agents page. Only an unchanged entry this adapter
inserted is removed. If the whole config is unchanged since insertion, its
original bytes are restored (or the newly created file is removed). Otherwise
only the adapter's item is removed, keeping subsequent user edits.

An entry you upgrade, edit or remove yourself becomes user-managed: the bridge
does not keep reinstalling it, and Disconnect leaves it alone. An entry that
predated this adapter is also kept, so turning the Yuri switch off **does not
disable an independently installed Magpie plugin**.

Disable/remove the Magpie package through Magpie's plugin management so it can
unwire the sidecar first. Do not delete recovery files while connected. For a
forced process termination during an edit, leave them in place and run Magpie
with this package again to recover. Invalid JSONC, duplicate top-level keys,
missing local plugin paths, symlinked config files and conflicting recovery
edits stop the bridge without rewriting the configuration. Errors logged by
the timer intentionally omit source text and credentials.

## Scope and limits

Yuri is an OpenCode client. When Yuri and the OpenCode CLI share a service,
this global plugin change affects **both**, not an isolated Yuri instance.
For a remote/SSH service, install/configure the provider plugin on that service's
machine; this local adapter cannot install extensions on a remote host.

Models, native protocols, pricing and the 30-second catalog refresh belong to
`opencode-magpie-plugin`. This adapter neither sets the default model nor
enforces Magpie's per-agent model checkboxes. Choose models in Yuri; the
directory exposed by the provider plugin remains authoritative. It does not
add a Yuri-specific request hook, GUI extension or Library/MCP integration.

Do not use Magpie's built-in OpenCode adapter to maintain another static
`magpie` provider alongside this dynamic integration unless you intend to have
both catalogs.

A CLI using Yuri's same provider/key shares that connection's attribution.
`agentID` and `X-Magpie-Agent` are advisory labels, not per-UI isolation. The
built-in OpenCode adapter has its own catalog and connection; its provider/model
settings are preserved when this bridge disconnects.

## Tests

```sh
npm test
npm run test:mutations
bun test provider/tests
```

The tests use temporary homes and fake gateway keys. They do not install
anything into a running Yuri or contact a model provider.

See [`VERIFICATION.md`](VERIFICATION.md) for the native Yuri Web UI/CLI run,
unchanged real User-Agent, assigned-key checks and separate connection Usage.

## License

MIT. The bridge follows patterns from
[magpie-community/plugins](https://github.com/magpie-community/plugins).
Yuri artwork attribution is in [ASSET_NOTICE.md](ASSET_NOTICE.md) and
[LICENSE-YURI](LICENSE-YURI).
