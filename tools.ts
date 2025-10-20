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

async function compress(dirs: string[]) {
  const $$ = $({ verbose: true });
  for (const dir of dirs) {
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
  }
}

program
  .command("compress")
  .description("Compress photos in a folder")
  .argument("<dir...>", "The directories in static/assets/, like 20221018")
  .action(async (dirs: string[]) => {
    await compress(dirs);
  });

function directoryFiles(dir: string) {
  try {
    return readdirSync(dir)
      .map((x) => path.join(dir, x))
      .sort();
  } catch (_e) {
    return [];
  }
}

program
  .command("add-post")
  .description("Add a new post")
  .argument("<date>", "The date in YYYYMMDD")
  .argument("[title]", "The title", "TODO")
  .option("--compress", "Also compress the assets folder if it exists")
  .action(async (date: string, title: string, opts: { compress?: boolean }) => {
    if (typeof date !== "string" || date.length !== 8) {
      throw new Error("Date should be YYYYMMDD");
    }
    if (opts?.compress) {
      await compress([date]);
    }
    const year = parseInt(date.slice(0, 4));
    const rocYear = year - 1911;
    const month = date.slice(4, 6);
    const semester = getSemester(rocYear, parseInt(month));
    const day = date.slice(6, 8);
    const filename = `content/posts/${date}.md`;
    const photos = directoryFiles(`static/assets/${date}`).map(
      (path) => `${path.replace("static/", "/")}`,
    );
    const now = new Date();
    function pad(v: number) {
      return `${v}`.padStart(2, "0");
    }
    writeFileSync(
      filename,
      `
---
title: ${year}.${month}.${day} ${title}
date: ${year}-${month}-${day}
published: ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}
tags: [社團活動, ${title}]
author: 如月
semester: ${semester}
cover: ${photos[0]}
---

${photos.map((path) => `{{< photo "${path}" >}}`).join("\n")}
`.trim() + "\n",
    );
    console.log(`Created ${filename}`);
  });

await program.parseAsync();
