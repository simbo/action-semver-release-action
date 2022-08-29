# simbo/action-semver-release-action

A simple and lightning-fast GitHub action to create releases for actions based
on semantic version tags and move major, minor and latest tags accordingly.

Unfortunately, you still have to publish your action release to the GitHub
marketplace manually as there is no way to automate this at the moment.

## Usage

Add `simbo/action-semver-release-action@latest` to your workflow.

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
        uses: simbo/action-semver-release-action@latest
```

## Inputs

| Option  | Required | Default        | Description              |
| ------- | -------- | -------------- | ------------------------ |
| `token` | yes      | `github.token` | GitHub Repo Access Token |

## Development

### Creating a new Version

Use `./release.sh <major|minor|patch>` which will update `package.json` and
create a git tag for the respective version.

A release workflow will pick up the tag when pushed to GitHub, create a release
and move major, minor and latest tags accordingly.

To publish the release into the GitHub marketplace open
[releases](https://github.com/simbo/action-semver-release-action/releases) and
update the release for marketplace publishing.

## License and Author

[MIT &copy; Simon Lepel](http://simbo.mit-license.org/)
