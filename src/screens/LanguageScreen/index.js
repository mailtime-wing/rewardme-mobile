import React, {useContext} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import {IntlContext} from '@/context/Intl';

const LanguageOption = ({title, value}) => {
  const {saveLanguage} = useContext(IntlContext);
  return (
    <View style={styles.languageOption}>
      <TouchableOpacity onPress={() => saveLanguage(value)}>
        <Text>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const LanguageList = () => {
  const {languageList} = useContext(IntlContext);
  return (
    <SafeAreaView>
      <FlatList
        data={languageList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <LanguageOption title={item.label} value={item.value} />
        )}
      />
    </SafeAreaView>
  );
};

const LanguageScreen = () => (
  <View style={styles.containers}>
    <LanguageList />
  </View>
);

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  languageOption: {
    color: '#4a4a4a',
  },
});

export default LanguageScreen;
