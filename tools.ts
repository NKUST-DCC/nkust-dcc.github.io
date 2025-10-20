#!/usr/bin/env -S deno run -A
// -*- mode: typescript; lsp-disabled-clients: (ts-ls); -*-

import * as path from "node:path";
import { writeFileSync, readdirSync } from "node:fs";
import { $ } from "zx";
import { program } from "commander";

/**
 * Return semester (as eg. "110-1") from the ROC year and month.
 */
function getSemester(rocYear: number, month: number) {
  if (2 < month && month < 8) {
    // the second semester starts on 02-01 and ends on 07-31
    return `${rocYear - 1}-2`;
  } else {
    return `${rocYear}-1`;
  }
}

program
  .command("add-calendar")
  .description("Add a calendar file")
  .argument("<calendar-file>", "The calendar file")
  .argument("<name>", "The new base name")
  .action(async (calendarFile: string, newName: string) => {
    if (calendarFile.endsWith(".pdf")) {
      await $`pdftoppm ${calendarFile} > ${newName}.ppm`;
      await $`gm convert ${newName}.ppm ${newName}.png`;
      await $`rm ${newName}.ppm`;
      await $`mv ${newName}.png static/assets/calendar`;
      await $`cp ${calendarFile} static/assets/calendar/${newName}.pdf`;
    } else {
      await $`gm convert ${calendarFile} static/assets/calendar/${newName}.png`;
    }
  });

program
  .command("compress")
  .description("Compress photos in a folder")
  .argument("<dir>", "The directory in static/assets/, like 20221018")
  .action(async (dir: string) => {
    const $$ = $({ verbose: true });
    const fullDir = `static/assets/${dir}`;
    console.log("Before:");
    await $$`du -h ${fullDir}`;
    console.log("Resizing to height = 1080...");
    console.log(
      "(This assumes no photo is smaller than that, they might become bigger in that case)",
    );
    await $`
  cd ${fullDir}
  mkdir -p smaller
  parallel gm convert -resize x1080 '{}' smaller/'{.}'.jpg ::: $(find -iregex ".*\\.\\(jpe?g\\|heic\\)")
  mv smaller/*.jpg .
  find -regex ".*\.\(jpeg\|JPG\|HEIC\)" -exec rm '{}' ';'
  rm smaller -r
`;
    console.log("After:");
    await $$`du -h ${fullDir}`;
    console.log("Please check git log for any anomolies! This code is janky.");
  });

function directoryFiles(dir: string) {
  try {
    return readdirSync(dir).map((x) => path.join(dir, x));
  } catch (_e) {
    return [];
  }
}

program
  .command("add-post")
  .description("Add a new post")
  .argument("<date>", "The date in YYYYMMDD")
  .action((date: string) => {
    if (typeof date !== "string" || date.length !== 8) {
      throw new Error("Date should be YYYYMMDD");
    }
    const year = parseInt(date.slice(0, 4));
    const rocYear = year - 1911;
    const month = parseInt(date.slice(4, 6));
    const semester = getSemester(rocYear, month);
    const day = date.slice(6, 8);
    writeFileSync(
      `content/posts/${date}.md`,
      `
---
title: ${year}.${month}.${day} %s
date: ${year}-${month}-${day}
tags: [社團活動]
author: 如月
semester: ${semester}
cover: /assets/
---

${directoryFiles(`static/assets/${date}`)
  .map((path) => `{{< photo "${path.replace("static/", "/")}" >}}`)
  .join("\n")}
`.trim(),
    );
  });

await program.parseAsync();
