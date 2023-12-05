# simbo/action-semver-release-action

A simple and lightning-fast GitHub action to create releases for actions based
on semantic version tags and move major, minor and latest tags accordingly.

## Usage

Add `simbo/action-semver-release-action@latest` to your workflow.

Make sure your tags have a valid semantic versioning format and start with a
`v`.

If you create or push a version tag like `v1.2.3`, this action will move or
create the tags `v1`, `v1.2` and `latest` to the same position and creates a
GitHub release.

The action is meant to be run on a
[`push:tags`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#running-your-workflow-only-when-a-push-of-specific-tags-occurs)
event.

Unfortunately, you still have to publish your action release to the GitHub
marketplace manually as there is no way to automate this at the moment.

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
    permissions: write-all
    steps:
      - name: 🛎 Checkout
        uses: actions/checkout@v4

      - name: 📦 Create Release
        uses: simbo/action-semver-release-action@latest
```

## Inputs

| Option           | Required | Default               | Description                                                            |
| ---------------- | -------- | --------------------- | ---------------------------------------------------------------------- |
| `token`          | no       | `${{ github.token }}` | GitHub Repo Access Token (needs permission to write tags and releases) |
| `create-release` | no       | `'true'`              | whether to create a GitHub release                                     |
| `release-name`   | no       | `'Release %TAG%'`     | The name of the created release                                        |
| `release-body`   | no       | `''`                  | The description of the created release                                 |

All appearances of `%TAG%` in `release-name` and `release-body` will be replaced
with the version tag.

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

[MIT &copy; 2022 Simon Lepel](http://simbo.mit-license.org/2022/)
