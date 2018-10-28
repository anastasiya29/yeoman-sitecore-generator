import { task } from 'gulp';

task("ts-compile", () => $.run("npm run build").exec());
