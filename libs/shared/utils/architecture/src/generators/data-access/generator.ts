import { libraryGenerator } from '@nrwl/angular/generators';
import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';

import { DataAccessGeneratorSchema } from './schema';

interface NormalizedSchema extends DataAccessGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: DataAccessGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const scope = names(options.scope).fileName;
  const type = names('data-access').fileName;
  const projectDirectory = `${scope}/${type}`;
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

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    `${options.projectRoot}/${options.projectDirectory}/${options.name}`,
    templateOptions
  );
}

export default async function (tree: Tree, options: DataAccessGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    directory: normalizedOptions.projectDirectory,
    flat: true,
    skipModule: true,
    simpleName: true,
    tags: normalizedOptions.parsedTags.join(','),
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
