import { TextDecoder } from 'util';
import { mqtt } from 'aws-iot-device-sdk-v2';

export interface PubSubParams {
  topic: string;
  debug?: boolean;
}

export type MessagePayload = NodeJS.TypedArray | DataView | ArrayBuffer | null;
export class PubSub {
  private decoder: TextDecoder;
  private topic: string;

  constructor(private readonly connection: mqtt.MqttClientConnection, params: PubSubParams) {
    this.decoder = new TextDecoder('utf8');
    this.topic = params.topic;

    connection.subscribe(
      this.topic,
      mqtt.QoS.AtLeastOnce,
      this.onMessage.bind(this),
    );
  }

  async onMessage(topic: string, payload: ArrayBuffer, dup: boolean, qos: mqtt.QoS, retain: boolean): Promise<string> {
    const json = this.decoder.decode(payload);

    console.log(`Publish received. topic:"${topic}" dup:${dup} qos:${qos} retain:${retain}`);
    console.log(json);

    return json;
  }

  async sendMessage(message: unknown, topic?: string): Promise<mqtt.MqttRequest> {
    const json = JSON.stringify(message);
    console.log(`Push message to ${topic ?? this.topic}`, json);
    return await this.connection.publish(topic ?? this.topic, json, mqtt.QoS.AtLeastOnce);
  }
}
