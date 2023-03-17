import { libraryGenerator } from '@nrwl/angular/generators';
import { formatFiles, getWorkspaceLayout, names, Tree } from '@nrwl/devkit';

import { UiGeneratorSchema } from './schema';

interface NormalizedSchema extends UiGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: UiGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = `shared/ui`;
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}`;
  const parsedTags = ['scope:shared', 'type:ui'];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

export default async function (tree: Tree, options: UiGeneratorSchema) {
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
    prefix: 'ui-' + normalizedOptions.projectName,
    selector: 'ui-' + normalizedOptions.projectName,
    skipTests: true,
  });
  gen();
  await formatFiles(tree);
}
