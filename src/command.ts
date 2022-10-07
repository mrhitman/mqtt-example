import { Argv } from 'yargs';

export const parseArgs = (yargs: Argv, is_required = false) =>
  yargs
    .option("cert", {
      alias: "c",
      description:
        "<path>: File path to a PEM encoded certificate to use with mTLS.",
      type: "string",
      required: true,
    })
    .option("key", {
      alias: "k",
      description:
        "<path>: File path to a PEM encoded private key that matches cert.",
      type: "string",
      required: true,
    })
    .option("endpoint", {
      alias: "e",
      description:
        "<path>: Your AWS IoT custom endpoint, not including a port.",
      type: "string",
      required: true,
    })
    .option("ca_file", {
      alias: "r",
      description:
        "<path>: File path to a Root CA certificate file in PEM format (optional, system trust store used by default).",
      type: "string",
      required: is_required,
    })
    .option("topic", {
      alias: "t",
      description: "Topic to publish to (optional).",
      type: "string",
      default: "test/topic",
      required: is_required,
    })
    .option("client_id", {
      alias: "C",
      description: "Client ID for MQTT connection.",
      type: "string",
      required: is_required,
    })
    .option("debug", {
      alias: "d",
      description: "Show debug info",
      type: "boolean",
      default: false,
      required: is_required,
    });
