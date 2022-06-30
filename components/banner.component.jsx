import {Image, StyleSheet} from "react-native";

const Banner = () => {
  return <Image source={require('../assets/images/banner.png')} style={styles.banner} />
}

const styles = StyleSheet.create({
  banner: {
    marginTop: 10,
    marginBottom: 20,
    width: 250,
    height: 75,
    resizeMode: 'contain'
  },
})

export default Banner