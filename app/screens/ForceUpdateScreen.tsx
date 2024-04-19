import React, {useEffect} from 'react';
import {Colors} from '../constants/Colors';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
const ForceUpdateScreen = (props: any) => {
  const {forceUpdate} = useSelector((state: {app: any}) => state.app);

  useEffect(() => {
    props.navigation.setOptions({
      headerShown: false,
      headerShadowVisible: false,
    });
  }, []);

  const openStore = async () => {
    let link = '';
    if (Platform.OS === 'ios') {
      link = '';
    }
    Linking.canOpenURL(link).then(
      supported => {
        supported && Linking.openURL(link);
      },
      err => console.error(err),
    );
  };

  return (
    <View style={[styles.container]}>
      <View>
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'left',
            }}>
            {forceUpdate.update_title}
          </Text>
        </View>
        <View style={{paddingTop: 6}}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'left',
              color: Colors.black,
            }}>
            {forceUpdate.new_version}
          </Text>
        </View>
      </View>

      <View style={{paddingVertical: 18}}>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'left',
          }}>
          {forceUpdate.update_description}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => openStore()}
          style={[
            styles.cardButton,
            {
              backgroundColor: Colors.black,
            },
          ]}>
          <Text style={[styles.cardButtonText, {textAlign: 'center'}]}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardButton: {
    borderRadius: 8,
    paddingVertical: 16,
  },
  cardButtonText: {
    fontSize: 16,
    color: '#ffffff',
  },
});

export default ForceUpdateScreen;
