# simbo/action-semver-release-action

A simple and lightning-fast GitHub action to create releases for actions based
on semver tags and move major, minor and latest tags accordingly.

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
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 📦 Create Release
        uses: simbo/action-semver-release-action@v1
```

## Inputs

| Option  | Required | Default        | Description              |
| ------- | -------- | -------------- | ------------------------ |
| `token` | yes      | `github.token` | GitHub Repo Access Token |

## License and Author

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
