import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { auth } from "../../firebase";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigation.navigate("Home");
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with: ", user.email);
        navigation.navigate("Register"); // change this to nested
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
        navigation.navigate("drawer", { screen: "Home" }); // change this to nested
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behaviour="padding">
      <ImageBackground
        style={styles.background}
        resizeMode="cover"
        source={require("../assets/background.png")}
      >
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome style={{ marginLeft: 13 }} name="envelope" size={15} color="#B8DBD9" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#B8DBD9" 
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
        <FontAwesome style={{ marginLeft: 15 }} name="unlock-alt" size={15} color="#B8DBD9" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#B8DBD9" 
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  logoContainer: {
    flex: 2,
    top: 70,
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderColor: '#000',
    // paddingBottom: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
    width: "70%",
    backgroundColor: "#2F4550",
  },
  input: {
    flex: 1,
    backgroundColor: "#2F4550",
    padding: 10,
    paddingBottom: 15,
    borderRadius: 25,
    marginTop: 5,
    color: "white",
  },
  buttonContainer: {
    flex: 1,
    // position: "absolute",
    width: "60%",
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "100%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#586F7C",
    marginTop: 25,
    borderRadius: 15,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 300,
  },
});
