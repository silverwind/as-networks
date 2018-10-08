"use strict";

const net = require("net");
const isCidr = require("is-cidr");

function uniq(arr) {
  return [...new Set(arr)];
}

module.exports = async (name, opts = {}) => {
  return new Promise((resolve, reject) => {
    const nets = [];

    opts = Object.assign({
      server: "whois.radb.net",
      port: 43,
    });

    const socket = new net.Socket();
    let output = "";

    socket.connect(opts.port, opts.server, () => {
      const type = /^MAINT/.test(name) ? "mnt-by" : "origin";
      socket.write(`-i ${type} ${name}\n`);
    });

    socket.on("error", err => {
      reject(err);
      socket.destroy();
    });

    socket.on("timeout", err => {
      reject(err);
      socket.destroy();
    });

    socket.on("data", data => {
      output += String(data);
    });

    socket.on("end", async () => {
      for (const line of output.split(/\r?\n/gm)) {
        if (!line.startsWith("route")) continue;
        const [_, net] = line.split(/\s+/) || [];
        if (net && isCidr(net)) nets.push(net.toLowerCase());
      }
      resolve(uniq(nets));
      socket.destroy();
    });
  });
};
