import { task, series } from "gulp";
import requireDir from "require-dir";
requireDir("./gulp");

task("default", series("nuget-pack"));
