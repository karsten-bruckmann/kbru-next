import { formatFiles, getWorkspaceLayout, names, Tree } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js';

import { UtilGeneratorSchema } from './schema';

interface NormalizedSchema extends UtilGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: UtilGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const type = names('util').fileName;
  const projectDirectory = `shared/utils`;
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}`;
  const parsedTags = [`scope:shared`, `type:${type}`];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: UtilGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const gen = await libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    directory: normalizedOptions.projectDirectory,
    tags: normalizedOptions.parsedTags.join(','),
  });
  await gen();
  await formatFiles(tree);
}
