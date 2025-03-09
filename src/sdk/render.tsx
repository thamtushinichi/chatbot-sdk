import React from 'react';
import { createRoot } from 'react-dom/client';
import Independent, { IndependentProps } from './components/Independent';
import { StyleProvider, ThemeProvider } from 'antd-style';
import { ConfigProvider } from 'antd';

// Define options for the renderer
export interface RenderIndependentOptions extends IndependentProps {
    container: HTMLElement | string;
    theme?: {
        token?: Record<string, any>;
    };
}

/**
 * Render the Independent component into a DOM element
 */
export function renderIndependent(options: RenderIndependentOptions): () => void {
    const { container, theme, ...independentProps } = options;

    // Get the container element
    const containerElement = typeof container === 'string'
        ? document.querySelector(container) as HTMLElement
        : container;

    if (!containerElement) {
        console.error(`Container element not found: ${container}`);
        return () => {};
    }

    // Create a root for React
    const root = createRoot(containerElement);

    // Render the component with proper providers
    root.render(
        <React.StrictMode>
            <ConfigProvider
                theme={theme}
            >
                <StyleProvider prefix="antd-x-sdk">
                    <ThemeProvider>
                        <Independent {...independentProps} />
                    </ThemeProvider>
                </StyleProvider>
            </ConfigProvider>
        </React.StrictMode>
    );

    // Return a cleanup function to unmount React when needed
    return () => {
        root.unmount();
    };
}