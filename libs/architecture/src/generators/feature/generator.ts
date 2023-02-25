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
  const projectDirectory = `${options.shared ? 'shared/' : ''}${scope}/${type}`;
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}`;
  const parsedTags = [
    `scope:${options.shared ? 'shared' : scope}`,
    `type:${type}`,
  ];

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
  libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    directory: normalizedOptions.projectDirectory,
    flat: true,
    standalone: true,
    simpleName: true,
    importPath: normalizedOptions.projectName,
    style: 'scss',
    tags: normalizedOptions.parsedTags.join(','),
    displayBlock: true,
    prefix: 'feature-' + normalizedOptions.projectName,
    selector: 'feature-' + normalizedOptions.projectName,
    skipTests: true,
  });
  await formatFiles(tree);
}
