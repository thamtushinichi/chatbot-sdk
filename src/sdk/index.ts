// Export the Independent component as default
export { default } from './components/Independent';
export type { IndependentProps } from './components/Independent';

// Export the renderIndependent function directly at the top level
export { renderIndependent } from './render';

// Re-export dependencies that the consumer might need
export { ConfigProvider } from 'antd';
export { StyleProvider, ThemeProvider } from 'antd-style';