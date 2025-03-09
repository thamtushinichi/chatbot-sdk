# Ant Design X Chat SDK

This SDK allows you to easily integrate the Ant Design X Chat component into any web application using ES modules.

## Building the SDK

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Build the SDK:
   ```bash
   pnpm build:sdk
   ```

   This will create the SDK files in the `dist/sdk` directory:
   - `index.es.js` - ES Module version
   - `types/` - TypeScript type definitions

## Using the SDK in an HTML Page

Since some of the required dependencies don't have UMD builds available on CDNs, we'll use ES modules instead:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ant Design X SDK Demo</title>
  
  <!-- Define module imports -->
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18",
        "react-dom": "https://esm.sh/react-dom@18",
        "react-dom/client": "https://esm.sh/react-dom@18/client",
        "antd": "https://esm.sh/antd@5",
        "@ant-design/icons": "https://esm.sh/@ant-design/icons@5",
        "@ant-design/cssinjs": "https://esm.sh/@ant-design/cssinjs@1.23.0",
        "antd-style": "https://esm.sh/antd-style@3.7.1",
        "@ant-design/x": "https://esm.sh/@ant-design/x@1.0.5"
      }
    }
  </script>
  
  <!-- Ant Design CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/antd@5/dist/reset.css">
  
  <style>
    #chat-container {
      width: 100%;
      height: 700px;
    }
  </style>
</head>
<body>
  <div id="chat-container"></div>
  
  <script type="module">
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { ConfigProvider } from 'antd';
    import { StyleProvider, ThemeProvider } from 'antd-style';
    import Independent from './path/to/sdk/index.es.js';
    
    // Create a React root
    const root = ReactDOM.createRoot(document.getElementById('chat-container'));
    
    // Render with all required providers
    root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          ConfigProvider,
          {
            theme: {
              token: {
                colorPrimary: '#1677ff',
                borderRadius: 8
              }
            }
          },
          React.createElement(
            StyleProvider,
            { prefix: 'antd-x-sdk' },
            React.createElement(
              ThemeProvider,
              null,
              React.createElement(Independent, {
                logoSrc: 'https://example.com/logo.png',
                logoText: 'My Chat App',
                onRequestOverride: function(message, onSuccess) {
                  // Call your API here
                  fetch('https://your-api.com/chat', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message })
                  })
                    .then(response => response.text())
                    .then(response => {
                      onSuccess(response);
                    });
                }
              })
            )
          )
        )
      )
    );
  </script>
</body>
</html>
```

## API Reference

### Independent Component Props

| Property | Type | Description |
|----------|------|-------------|
| `logoSrc` | `string` | (Optional) URL for the logo image |
| `logoText` | `string` | (Optional) Text to display next to the logo |
| `onRequestOverride` | `function` | (Optional) Function to handle chat requests. Takes `(message, onSuccess)` parameters |

## Using with a Bundler (Webpack, Vite, etc.)

If you're integrating the SDK into a bundled application, you can import it directly:

```jsx
import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider, ThemeProvider } from 'antd-style';
import Independent from 'path/to/sdk';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8
        }
      }}
    >
      <StyleProvider prefix="antd-x-sdk">
        <ThemeProvider>
          <Independent 
            logoText="My Chat App"
            onRequestOverride={(message, onSuccess) => {
              // Your API logic here
              onSuccess(`Response to: ${message}`);
            }}
          />
        </ThemeProvider>
      </StyleProvider>
    </ConfigProvider>
  );
}
```

## Hosting the SDK

After building, you can host the SDK files on any static file server. For production use, you should:

1. Host the files on a CDN
2. Set proper cache headers
3. Consider using versioning in your URLs

## Development

To run the demo locally:

1. Build the SDK:
   ```bash
   pnpm build:sdk
   ```

2. Start the development server:
   ```bash
   pnpm dev
   ```

3. Open http://localhost:5173/demo-fixed.html in your browser