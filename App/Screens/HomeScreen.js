import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../../firebase";
import { getChoirs } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";

export default function HomeScreen({ navigation }) {
  const currentUser = auth.currentUser.displayName;
  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");

  const [choirs, setChoirs] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getChoirs(location)
        .then((choirs) => {
          setChoirs(choirs);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, [location])
  );

  if (isLoading) {
    return (
      <Image
        style={styles.loading}
        source={{
          uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
        }}
      />
    );
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
        <Text style={styles.titleWelcome}>Hello {currentUser}! </Text>
          <Text style={styles.title}>Find your local choir</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.location}>
            <Text style={styles.loc}>LOCATION</Text>
          </View>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={location}
              itemStyle={{ height: 40, fontSize: 14 }}
              textStyle={{ fontSize: 2 }}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            >
              <Picker.Item label="Manchester" value="Manchester" />
              <Picker.Item label="Liverpool" value="Liverpool" />
              <Picker.Item label="Chester" value="Chester" />
              <Picker.Item label="See all" value="" />
            </Picker>
          </View>
        </View>

        <View style={styles.choirCardsContainer}>
        <Image style={{width: 70, height: 70}} source={{ uri: "https://i.pinimg.com/originals/70/22/72/7022729bcf716a1ec717377094161cd4.gif"}} />
          <ScrollView style={{ margin: 0, padding: 0}}>
            {choirs.map((choir) => {
              return (
                <View key={choir._id} style={[styles.card, styles.shadowProp]}>
                  <Text
                    style={styles.choirTitle}
                    onPress={() =>
                      navigation.navigate("Choir", { choirId: choir._id })
                    }
                  >
                    {choir.name}
                  </Text>
                  <Text style={styles.loc}>
                    {capitalizeFirstLetter(choir.location)}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.choirDesc}
                    onPress={() =>
                      navigation.navigate("Choir", { choirId: choir._id })
                    }
                  >
                    {choir.description}{" "}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Create choir");
            }}
          >
            <Text style={styles.buttonText}>Create a choir group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },

  //-------------------------TITLE
  titleContainer: {
    marginTop: 10,
    flex: 1,
    width: "100%",
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    color: "#2F4550",
  },
  titleWelcome: {
    fontSize: 16,
    color: '#BD5C1E',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  //-------------------------SEARCH
  searchContainer: {
    marginTop: 10,
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    flexDirection: "row",
    width: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    width: "40%",
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  dropdown: {
    width: "60%",
    // borderWidth: 1,
    // borderColor: 'pink',
  },
  buttonContainer: {
    flex: 1,
    width: 350,
    // borderWidth: 1,
    // borderColor: 'black',
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    marginTop: 200,
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  //-------------------------CARDS
  choirCardsContainer: {
    flex: 10,
    // borderWidth: 1,
    width: 380,
    // borderColor: 'green',
    alignItems: "center",
    // justifyContent: 'center',
    // alignContent: "flex-start",
    // margin: 5,
  },
  card: {
    height: 100,
    width: 330,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    // borderColor: 'red',
    // borderWidth: 1,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  loc: {
    fontWeight: "700",
  },
  choirTitle: {
    fontWeight: "700",
    color: "#586F7C",
  },
  choirDesc: {},
  seeMore: {
    color: "#BC9C22",
    alignSelf: "flex-start",
  },
  //-------------------------BUTTONS
  logo: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  //------------------------------BUTTON
  buttonContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    // width: "60%",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
    width: 200,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },
});
