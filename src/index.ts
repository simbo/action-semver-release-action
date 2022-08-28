import { getInput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

async function action(): Promise<void> {
  const token = getInput('token');

  if (!context.ref.startsWith('refs/tags/')) {
    throw new Error('ref is not a tag');
  }

  const refTag = context.ref.substring(10);

  const semver = /^v([0-9]+)\.([0-9]+)\.([0-9]+)$/.exec(refTag);

  if (!semver) {
    throw new Error(`tag '${refTag}' is not a valid semver version`);
  }

  const octokit = getOctokit(token);

  for (const tag of [`v${semver[1]}`, `v${semver[1]}.${semver[2]}`, 'latest']) {
    await octokit.rest.git.deleteRef({ ...context.repo, ref: `tags/${tag}` }).catch(() => {});
    await octokit.rest.git.createRef({ ...context.repo, ref: `refs/tags/${tag}`, sha: context.sha });
  }

  await octokit.rest.repos.createRelease({
    ...context.repo,
    tag_name: refTag,
    name: refTag
  });
}

action().catch(error => setFailed(error.message));
