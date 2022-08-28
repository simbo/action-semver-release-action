# simbo/action-semver-release-action

A simple and lightning-fast GitHub action to create releases for actions based
on semver tags and move major, minor and latest tags accordingly.

Unfortunately, you still have to publish your release to the GitHub marketplace
manually as there is no way to automate this at the moment.

## Usage

Add `simbo/action-semver-release-action@v1` to your workflow.

Let the workflow react on tags. Make sure your tags have a valid semantic
versioning format and start with a `v`.

### Example

```yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: 🛎 Checkout
        uses: actions/checkout@v3

      - name: 📦 Create Release
        uses: simbo/action-semver-release-action@v1
```

## Inputs

| Option  | Required | Default        | Description              |
| ------- | -------- | -------------- | ------------------------ |
| `token` | yes      | `github.token` | GitHub Repo Access Token |

## License and Author

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
