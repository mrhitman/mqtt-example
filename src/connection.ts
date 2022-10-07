import {iot, mqtt} from "aws-crt";

export interface ConnectionParams {
  cert: string;
  key: string;
  endpoint: string;
  ca_file?: string;
  client_id?: string;
}

export function generateRandomClientId(): string {
  return `client_${Math.floor(Math.random() * 1e9)}`;
}

export function createConnection(argv: ConnectionParams): mqtt.MqttClientConnection {
  const configBuilder =
    iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
      argv.cert,
      argv.key
    );
  configBuilder.with_certificate_authority_from_path(undefined, argv.ca_file);
  configBuilder.with_clean_session(false);
  configBuilder.with_client_id(
    argv.client_id ?? generateRandomClientId(),
  );
  configBuilder.with_endpoint(argv.endpoint);
  const config = configBuilder.build();
  const client = new mqtt.MqttClient();
  return client.new_connection(config);
};
