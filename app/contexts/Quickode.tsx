import React, {
  useState,
  ReactNode,
  useContext,
  createContext,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import {ToastPosition, toast} from '@backpackapp-io/react-native-toast';

import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import {QuickodeContextInterface} from '../interfaces/QuickodeContextInterface';
import {Text} from 'react-native';
import {Colors} from '../constants';

import {useDispatch} from 'react-redux';
import {setAppError} from '../redux/slices/appSlice';

const QuickodeContext = createContext<QuickodeContextInterface>(
  {} as QuickodeContextInterface,
);

function QuickodeProvider({children}: {children: ReactNode}) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [bottomSheetSnapPoints, setBottomSheetSnapPoints] = useState<string[]>([
    '25%',
    '100%',
  ]);

  const [bottomSheetChildren, setBottomSheetChildren] =
    useState<ReactNode>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const [bottomSheetProps, setBottomSheetProps] = useState({
    enableDismissOnClose: true,
    enableContentPanningGesture: true,
    enableHandlePanningGesture: true,
  } as {
    enableDismissOnClose: boolean;
    enableContentPanningGesture: boolean;
    enableHandlePanningGesture: boolean;
  });

  const setToast = (
    message = 'This is a toast message',
    options?: {
      duration?: number;
      position?: ToastPosition;
      icon?: string;
      styles?: {
        view?: any;
        pressable?: any;
        text?: any;
        indicator?: any;
      };
    },
  ) => {
    const {
      duration = 3000,
      position = ToastPosition.BOTTOM,
      icon = null,
      styles = {},
    } = options || {};

    toast(message, {
      duration,
      position,
      icon,
      styles,
    });
  };

  const toggleBottomSheet = (
    isVisible: boolean,
    snapPoints?: string[],
    children?: ReactNode,
    bottomSheetProps?: Object,
  ) => {
    setBottomSheetSnapPoints(snapPoints || ['25%', '100%']);
    setBottomSheetChildren(
      children || (
        <Text style={{textAlign: 'center'}}>Bottom Sheet Content</Text>
      ),
    );

    if (bottomSheetProps) setBottomSheetProps(bottomSheetProps as any);

    if (isVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  };

  const toggleAppError = (
    isVisible: boolean,
    title: string,
    description?: string,
  ) => {
    dispatch(
      setAppError({
        has_error: isVisible,
        title: title,
        description: description,
      }),
    );
  };

  return (
    <QuickodeContext.Provider
      value={{
        isLoading,
        isAuthenticated,
        setToast,
        toggleBottomSheet,
        toggleAppError,
      }}>
      {children}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={bottomSheetSnapPoints}
        enableDismissOnClose={bottomSheetProps.enableDismissOnClose}
        enableContentPanningGesture={
          bottomSheetProps.enableContentPanningGesture
        }
        enableHandlePanningGesture={bottomSheetProps.enableHandlePanningGesture}
        enableOverDrag={false}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            flex: 1,
            padding: 24,
            justifyContent: 'center',
            backgroundColor: Colors.white,
          }}>
          {bottomSheetChildren}
        </BottomSheetView>
      </BottomSheetModal>
    </QuickodeContext.Provider>
  );
}

const useQuickode = () => useContext(QuickodeContext);

export {QuickodeProvider, useQuickode};
