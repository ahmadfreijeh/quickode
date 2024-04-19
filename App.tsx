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

const App = (props: any) => {
  const queryClient = new QueryClient({
    defaultOptions: {queries: {retry: 1}},
  });

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={styles.container}>
            <StatusBar
              animated={true}
              backgroundColor="#5E8D48"
              barStyle="dark-content"
            />
            <BottomSheetModalProvider>
              <Main />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
