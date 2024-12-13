import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";

export default function mcpProxy({
  transportToClient,
  transportToServer,
  onerror,
}: {
  transportToClient: Transport;
  transportToServer: Transport;
  onerror: (error: Error) => void;
}) {
  let transportToClientClosed = false;
  let transportToServerClosed = false;

  transportToClient.onmessage = (message) => {
    try {
      console.log('Client -> Server:', JSON.stringify(message, null, 2));
      transportToServer.send(message).catch((error) => {
        console.error('Error sending message to server:', error);
        onerror(error);
      });
    } catch (error) {
      console.error('Error processing client message:', error);
      onerror(error as Error);
    }
  };

  transportToServer.onmessage = (message) => {
    try {
      console.log('Server -> Client:', JSON.stringify(message, null, 2));
      transportToClient.send(message).catch((error) => {
        console.error('Error sending message to client:', error);
        onerror(error);
      });
    } catch (error) {
      console.error('Error processing server message:', error);
      onerror(error as Error);
    }
  };

  transportToClient.onclose = () => {
    if (transportToServerClosed) {
      return;
    }

    transportToClientClosed = true;
    transportToServer.close().catch(onerror);
  };

  transportToServer.onclose = () => {
    if (transportToClientClosed) {
      return;
    }
    transportToServerClosed = true;

    transportToClient.close().catch(onerror);
  };

  transportToClient.onerror = onerror;
  transportToServer.onerror = onerror;
}
