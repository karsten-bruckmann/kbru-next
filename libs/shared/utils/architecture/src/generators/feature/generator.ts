import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, getWorkspaceLayout, names, Tree } from '@nrwl/devkit';

import { FeatureGeneratorSchema } from './schema';

interface NormalizedSchema extends FeatureGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: FeatureGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const scope = names(options.scope).fileName;
  const type = names('feature').fileName;
  const projectDirectory = `${scope}/features`;
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}`;
  const parsedTags = [`scope:${scope}`, `type:${type}`];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: FeatureGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const gen = await libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    directory: normalizedOptions.projectDirectory,
    flat: true,
    standalone: true,
    simpleName: true,
    style: 'scss',
    tags: normalizedOptions.parsedTags.join(','),
    displayBlock: true,
    prefix:
      (normalizedOptions.scope === 'shared'
        ? 'kbru'
        : normalizedOptions.scope) +
      '-' +
      normalizedOptions.projectName,
    selector:
      (normalizedOptions.scope === 'shared'
        ? 'kbru'
        : normalizedOptions.scope) +
      '-' +
      normalizedOptions.projectName,
    skipTests: true,
  });
  gen();
  await formatFiles(tree);
}
