import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import InitialScreen from './screens/user/InitialScreen';
import {Colors} from './constants/Colors';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = (props: any) => {
  const {width, height} = useWindowDimensions();
  const {user} = useSelector((state: any) => state.user);

  const routes = [{name: 'Item 1', screen: 'Screen 1'}];

  const DrawerNavigatorScreens = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => {
          return (
            <View style={[styles.darwerContainer]}>
              <View style={{paddingHorizontal: 12, paddingVertical: 12}}>
                {routes.map((route, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{marginBottom: 12}}
                      onPress={() => {
                        props.navigation.navigate(route.screen);
                      }}>
                      <Text
                        style={{
                          color: Colors.black,
                          fontSize: 34,
                        }}>
                        {route.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          );
        }}
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
          drawerActiveBackgroundColor: 'transparent',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerStyle: {
            width: width - 70,
          },
          drawerLabelStyle: {
            color: Colors.black,
            fontSize: 34,
          },
        }}>
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={({navigation}) => ({
            title: 'Home',
          })}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName={'Initial'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigatorScreens} />

      {/* This stack group for other screens not in tabs */}
      <Stack.Group>
        {/* <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> */}
      </Stack.Group>

      {/* This stack group for modals screens only */}
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        {/* <Stack.Screen name="AddItemScreen" component={AddItemScreen} /> */}
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  darwerContainer: {
    flex: 1,
  },
});

export default Navigator;
