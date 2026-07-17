
import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Alert } from 'react-native';

import App from '../App';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
}));

describe('App', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('alerts when pressing the main button', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => undefined);

    let renderer: ReactTestRenderer.ReactTestRenderer;

    await act(async () => {
      renderer = ReactTestRenderer.create(<App />);
    });

    const button = renderer!.root.findByProps({title: 'Press Me'});

    await act(async () => {
      button.props.onPress();
    });

    expect(alertSpy).toHaveBeenCalledWith('Button pressed!');
  });
});
