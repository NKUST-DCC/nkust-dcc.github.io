#!/usr/bin/env -S deno run -A
// -*- mode: typescript; lsp-disabled-clients: (ts-ls); -*-

import * as path from "node:path";
import * as process from "node:process";
import { $ } from "zx";
import { program } from "commander";

program
  .command("add-calendar")
  .description("Add a calendar file")
  .argument("<calendar-file>", "The calendar file")
  .argument("<name>", "The new base name")
  .action(async (calendarFile: string, newName: string) => {
    if (calendarFile.endsWith(".pdf")) {
      await $`pdftoppm ${calendarFile} > ${newName}.ppm`;
      await $`magick ${newName}.ppm ${newName}.png`;
      await $`rm ${newName}.ppm`;
      await $`mv ${newName}.png static/assets/calendar`;
      await $`cp ${calendarFile} static/assets/calendar/${newName}.pdf`;
    } else {
      await $`magick ${calendarFile} static/assets/calendar/${newName}.png`;
    }
  });

program
  .command("compress")
  .description("Compress photos in a folder")
  .argument("<dir>", "The directory, liks static/assets/20221018")
  .action(async (dir: string) => {
    const $$ = $({ verbose: true });
    const startingDir = process.cwd();
    console.log("Before:");
    await $$`du -h ${dir}`;
    console.log("Resizing to height = 1080...");
    console.log(
      "(This assumes no photo is smaller than that, they might become bigger in that case)",
    );
    await $`
  cd ${dir}
  mkdir -p smaller
  parallel gm convert -resize x1080 '{}' smaller/'{.}'.jpg ::: $(find -iregex ".*\\.\\(jpe?g\\|heic\\)")
  mv smaller/*.jpg .
  find -regex ".*\.\(jpeg\|JPG\|HEIC\)" -exec rm '{}' ';'
  rm smaller -r
`;
    process.chdir(startingDir);
    console.log("After:");
    await $$`du -h ${dir}`;
    console.log("Please check git log for any anomolies! This code is janky.");
  });

await program.parseAsync();
