import React from 'react';
import Navigator from './Navigator';
import {SplashScreen, ForceUpdateScreen} from './screens';
import {LoginScreen} from './screens/user/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
const Stack = createNativeStackNavigator();

const Main = (props: any) => {
  const {loaded, forceUpdate} = useSelector((state: {app: any}) => state.app);
  const {user} = useSelector((state: {user: any}) => state.user);

  return (
    <NavigationContainer independent={true}>
      {!loaded && (
        <Stack.Navigator>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      )}

      {loaded && forceUpdate.has_update && (
        <Stack.Navigator>
          <Stack.Screen
            name="ForceUpdateScreen"
            component={ForceUpdateScreen}
          />
        </Stack.Navigator>
      )}

      {loaded && user == null && !forceUpdate.has_update && (
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        </Stack.Navigator>
      )}

      {loaded &&
        user != null &&
        (user?.actor == 'main' || !user.actor) &&
        !forceUpdate.has_update && <Navigator />}

      {/* {loaded && user != null && user.actor == 'other' && !forceUpdate.has_update && (
        <NavigatorTwo {...props} />
      )} */}
    </NavigationContainer>
  );
};

export default Main;
