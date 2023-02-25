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

import { CoreGeneratorSchema } from './schema';

interface NormalizedSchema extends CoreGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: CoreGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const scope = names(options.scope).fileName;
  const type = names('core').fileName;
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

export default async function (tree: Tree, options: CoreGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, options);
  const gen = await libraryGenerator(tree, {
    name: normalizedOptions.projectName,
    directory: normalizedOptions.projectDirectory,
    flat: true,
    simpleName: true,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });
  gen();
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
