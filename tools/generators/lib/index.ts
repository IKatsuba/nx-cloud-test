import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import {
  libraryGenerator,
  applicationGenerator,
} from '@nrwl/angular/generators';
import { range } from 'rxjs';
import { concatMap } from 'rxjs/operators';

export default async function (host: Tree, schema: any) {
  await range(0, 24)
    .pipe(
      concatMap(async (index) => {
        await applicationGenerator(host, { name: `app${index}` });
        await libraryGenerator(host, { name: `lib${index}` });
      })
    )
    .toPromise();

  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}
