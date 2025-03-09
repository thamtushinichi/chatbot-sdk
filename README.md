# Ant Design X Chat SDK (Fully Bundled)

A fully bundled chatbot SDK based on Ant Design X that can be easily integrated into any web application without requiring external dependencies.

## Features

- **Zero External Dependencies**: All dependencies (React, Ant Design, etc.) are bundled into the SDK
- **Simple Integration**: Just include the script and start using it
- **Customizable**: Supports custom themes, logo, and API integration
- **TypeScript Support**: Includes TypeScript definitions

## Building the SDK

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Build the SDK:
   ```bash
   npm run build:sdk
   # or
   pnpm build:sdk
   ```

   This will create the SDK files in the `dist/sdk` directory:
   - `index.umd.js` - Universal Module Definition (UMD) version
   - `index.es.js` - ES Module version
   - `types/` - TypeScript type definitions

## Using the SDK

### Direct HTML Integration

Simply include the UMD version in your HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Demo</title>
  <style>
    #chat-container {
      width: 100%;
      height: 700px;
    }
  </style>
</head>
<body>
  <div id="chat-container"></div>
  
  <!-- Include the bundled SDK -->
  <script src="path/to/index.umd.js"></script>
  
  <script>
    // Initialize the chat when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
      const { renderIndependent } = window.AntDesignXChatSDK;
      
      const cleanup = renderIndependent({
        container: '#chat-container',
        logoSrc: 'https://example.com/logo.png',
        logoText: 'My Chat App',
        theme: {
          colorPrimary: '#1677ff',
          borderRadius: 8
        },
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
      });
      
      // Cleanup function to unmount the component when needed
      // window.unmountChat = cleanup;
    });
  </script>
</body>
</html>
```

### Using with a Module Bundler (Webpack, Vite, etc.)

If you're using a module bundler, you can import the ES module version:

```javascript
import { renderIndependent } from 'path/to/sdk';

// Initialize the chat
const cleanup = renderIndependent({
  container: '#chat-container',
  logoText: 'My Chat App',
  onRequestOverride: (message, onSuccess) => {
    // Your API logic here
    onSuccess(`Response to: ${message}`);
  }
});

// Call cleanup() when you want to unmount the component
```

## API Reference

### renderIndependent Options

| Property | Type | Description |
|----------|------|-------------|
| `container` | `HTMLElement\|string` | Element or CSS selector where the chat will be rendered |
| `logoSrc` | `string` | (Optional) URL for the logo image |
| `logoText` | `string` | (Optional) Text to display next to the logo |
| `theme` | `object` | (Optional) Theme customization |
| `theme.colorPrimary` | `string` | Primary color (hex code) |
| `theme.borderRadius` | `number` | Border radius for UI elements |
| `onRequestOverride` | `function` | (Optional) Function to handle chat requests. Takes `(message, onSuccess)` parameters |
| `onError` | `function` | (Optional) Function to handle rendering errors |

### Return Value

The `renderIndependent` function returns a cleanup function that you can call to unmount the component.

## Browser Support

The SDK supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Hosting Recommendations

Since the SDK is fully bundled:

1. Host the build output (`dist/sdk/index.umd.js`) on your CDN or static file server
2. Set appropriate cache headers
3. Consider versioning in your URLs (e.g., `/assets/chat-sdk/v1.0.0/index.umd.js`)

## Development

To run the demo locally:

1. Start the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Open http://localhost:5173 in your browser

## License

MIT