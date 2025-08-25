#!/usr/bin/env -S deno run -A
// -*- mode: typescript; lsp-disabled-clients: (ts-ls); -*-

import * as path from "node:path";

import { $ } from "npm:zx";
import { program } from "npm:commander";

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

await program.parseAsync();
