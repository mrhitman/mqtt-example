import { command } from "yargs";
import { parseArgs } from "./command";
import { createConnection, ConnectionParams } from "./connection";
import { PubSub, PubSubParams } from "./pub-sub";

type PubSubArgs = ConnectionParams & PubSubParams;
command<PubSubArgs>("*", false, parseArgs, async (argv) => {
  const connection = createConnection(argv);
  await connection.connect();
  const pubsub = new PubSub(connection, argv);

  setInterval(async () => {
    await pubsub.sendMessage({
      name: 'batteryLevel',
      value: `52.${~~(Math.random()*1e2)}%`,
      timestamp: Date.now(),
    }, 'topic_2');
  }, 5000);

}).parse();
