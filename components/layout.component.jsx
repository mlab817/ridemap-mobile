import {Image, SafeAreaView, StyleSheet} from "react-native";

const Layout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/banner.png')} style={styles.banner} />

      { children }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  banner: {
    marginTop: 20,
    width: 300,
    height: 100,
    resizeMode: 'contain'
  }
});

export default Layout