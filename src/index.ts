import { getInput, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';

async function action(): Promise<void> {
  const token = getInput('token');
  const createRelease = getInput('create-release');
  const releaseName = getInput('release-name');
  const releaseBody = getInput('release-body');

  if (!context.ref.startsWith('refs/tags/')) {
    throw new Error('ref is not a tag');
  }

  const referenceTag = context.ref.slice(10);

  const semver = /^v(\d+)\.(\d+)\.(\d+)$/.exec(referenceTag);

  if (!semver) {
    throw new Error(`tag '${referenceTag}' is not a valid semver version`);
  }

  const octokit = getOctokit(token);

  for (const tag of [`v${semver[1]}`, `v${semver[1]}.${semver[2]}`, 'latest']) {
    await octokit.rest.git.deleteRef({ ...context.repo, ref: `tags/${tag}` }).catch(() => {});
    await octokit.rest.git.createRef({ ...context.repo, ref: `refs/tags/${tag}`, sha: context.sha });
  }

  if (createRelease === 'true') {
    const name = releaseName.replaceAll('%TAG%', referenceTag);
    const body = releaseBody.replaceAll('%TAG%', referenceTag);
    await octokit.rest.repos.createRelease({
      ...context.repo,
      tag_name: referenceTag,
      name,
      body
    });
  }
}

try {
  await action();
} catch (error) {
  setFailed((error as Error).message || `${error}`);
}
