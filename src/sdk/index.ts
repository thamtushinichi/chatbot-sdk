// Export the Independent component as default
export { default } from './components/Independent';
export type { IndependentProps } from './components/Independent';

// Re-export dependencies that the consumer might need
export { ConfigProvider } from 'antd';
export { StyleProvider, ThemeProvider } from 'antd-style';