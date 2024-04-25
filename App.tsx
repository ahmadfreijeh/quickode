/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';
import Main from './app/Main';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QuickodeProvider} from './app/contexts/Quickode';
import {Toasts} from '@backpackapp-io/react-native-toast';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = (props: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 1}},
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <GestureHandlerRootView style={styles.container}>
              <BottomSheetModalProvider>
                <QuickodeProvider>
                  <Main />
                </QuickodeProvider>
              </BottomSheetModalProvider>
            </GestureHandlerRootView>
          </QueryClientProvider>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
