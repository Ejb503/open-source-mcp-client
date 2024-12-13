# MCP Inspector & Prompt Manager

This fork of the Anthropic MCP Inspector adds prompt management capabilities while maintaining the original MCP server inspection functionality.

![MCP Inspector Screenshot](mcp-inspector.png)

## Features

- **MCP Server Inspection**: Debug and test MCP server implementations
- **Prompt Management**: Create, edit, and organize prompts in an MCP context
- **Prompt Execution**: Test prompts directly through the inspector interface
- **Version Control**: Track changes to your prompts and maintain prompt history

## Running the Inspector

### From an MCP server repository

To inspect an MCP server implementation and manage prompts, use `npx`. For example, if your server is built at `build/index.js`:

```bash
npx @modelcontextprotocol/inspector build/index.js
```

You can also pass arguments along which will get passed as arguments to your MCP server:

```
npx @modelcontextprotocol/inspector build/index.js arg1 arg2 ...
```

The inspector runs both a client UI (default port 5173) and an MCP proxy server (default port 3000). Open the client UI in your browser to use the inspector. You can customize the ports if needed:

```bash
CLIENT_PORT=8080 SERVER_PORT=9000 npx @modelcontextprotocol/inspector build/index.js
```

### From this repository

If you're working on the inspector itself:

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run build
npm start
```

## Prompt Management

### Creating Prompts
1. Navigate to the Prompts tab in the inspector interface
2. Click "New Prompt" to create a prompt template
3. Define prompt parameters, context requirements, and expected outputs
4. Save and version your prompt

### Testing Prompts
1. Select a prompt from your library
2. Configure test parameters and context
3. Execute the prompt through the MCP interface
4. Review results and debug as needed

### Prompt Version Control
- Track changes to prompts over time
- Maintain a history of prompt versions
- Compare prompt performance across versions
- Roll back to previous versions if needed

For more details on ways to use the inspector, see the [Inspector section of the MCP docs site](https://modelcontextprotocol.io/docs/tools/inspector).

## License

This project is licensed under the MIT License—see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This project is a fork of the original MCP Inspector by Anthropic, enhanced with prompt management capabilities.
