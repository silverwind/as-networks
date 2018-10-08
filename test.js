"use strict";

const asNetworks = require(".");
const assert = require("assert");

async function main() {
  assert((await asNetworks("AS237")).includes("2606:9700::/32"));
  assert((await asNetworks("MAINT-AS237")).includes("2606:9700::/32"));
}

function exit(err) {
  if (err) console.info(err);
  process.exit(err ? 1 : 0);
}

main().then(exit).catch(exit);
