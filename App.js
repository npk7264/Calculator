import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export default function App() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [searchIcon, setSearchIcon] = useState(false);
  // search
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [exp, setExp] = useState([]);
  const [exp, setExp] = useState(["1+1=2", "2+2=4", "4+1=5", "5+5=10"]);
  const buttons = [
    "C",
    "%",
    "DEL",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    1,
    2,
    3,
    "+",
    0,
    ".",
    "=",
  ];

  const validInput = (currentNumber) => {
    let len = currentNumber.length;
    if (
      currentNumber[len - 1] !== "+" &&
      currentNumber[len - 1] !== "-" &&
      currentNumber[len - 1] !== "*" &&
      currentNumber[len - 1] !== "/" &&
      currentNumber[len - 1] !== "%" &&
      currentNumber[len - 1] !== "."
    )
      return true;
    return false;
  };

  const handleInput = (btnPressed) => {
    if (
      btnPressed === "+" ||
      btnPressed === "-" ||
      btnPressed === "*" ||
      btnPressed === "/" ||
      btnPressed === "%" ||
      btnPressed === "."
    ) {
      if (
        validInput(currentNumber) &&
        !(
          currentNumber.length == 0 &&
          (btnPressed == "*" ||
            btnPressed == "/" ||
            btnPressed == "." ||
            btnPressed == "%" ||
            btnPressed == "+")
        )
      ) {
        setCurrentNumber(currentNumber + btnPressed);
      } else if (
        !validInput(currentNumber) &&
        !(
          currentNumber.length == 0 &&
          (btnPressed == "*" ||
            btnPressed == "/" ||
            btnPressed == "." ||
            btnPressed == "%" ||
            btnPressed == "+")
        ) &&
        !(
          currentNumber == "-" &&
          (btnPressed == "*" ||
            btnPressed == "/" ||
            btnPressed == "." ||
            btnPressed == "%" ||
            btnPressed == "+")
        )
      )
        setCurrentNumber(
          currentNumber.replace(
            currentNumber[currentNumber.length - 1],
            btnPressed
          )
        );
      return;
    }

    switch (btnPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case "C":
        setLastNumber("");
        setCurrentNumber("");
        return;
      case "=":
        if (validInput(currentNumber)) {
          setLastNumber(currentNumber + "=");
          calculate();
        }
        return;
    }
    setCurrentNumber(currentNumber + btnPressed);
  };

  const calculate = () => {
    let lastChar = currentNumber[currentNumber.length - 1];
    if (
      lastChar === "/" ||
      lastChar === "*" ||
      lastChar === "-" ||
      lastChar === "+" ||
      lastChar === "." ||
      lastChar === "%"
    ) {
      return;
    } else {
      let result = eval(currentNumber).toString();
      setExp([...exp, currentNumber + "=" + result]);
      setCurrentNumber(result);
      return;
    }
  };

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the history
      // Update FilteredDataSource
      const newData = exp.filter((item) => {
        return item.indexOf(text) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Reset FilteredDataSource
      setFilteredDataSource([]);
      setSearch(text);
    }
  };

  return (
    <View>
      <View style={styles.results}>
        <View style={styles.menu}>
          {searchIcon ? (
            <View style={styles.historyButton}>
              <Icon
                name={"search"}
                size={24}
                color={"black"}
                onPress={() => {
                  //
                }}
              />
            </View>
          ) : null}
          <View style={styles.historyButton}>
            <Icon
              name={"history"}
              size={24}
              color={"black"}
              onPress={() => {
                setSearchIcon(!searchIcon);
                setShowHistory(!showHistory);
              }}
            />
          </View>
        </View>
        <TextInput
          style={{ backgroundColor: "#fff" }}
          onChangeText={(text) => searchFilter(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <View>
          {filteredDataSource.map((item) => {
            return <Text style={styles.history_text}>{item}</Text>;
          })}
        </View>
        <Text style={styles.prevText}>{lastNumber}</Text>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => {
            try {
              setCurrentNumber(text);
            } catch {
              alert("Biểu thức không hợp lệ!");
            }
          }}
          value={currentNumber}
          showSoftInputOnFocus={false}
          selectTextOnFocus={true}
        />
      </View>

      <View style={!showHistory ? styles.buttons : styles.history_theme}>
        {!showHistory ? (
          buttons.map((btn) =>
            btn === "=" ||
            btn === "/" ||
            btn === "*" ||
            btn === "-" ||
            btn === "+" ? (
              <TouchableOpacity
                key={btn}
                style={[styles.button, { backgroundColor: "#2c7ef4" }]}
                onPress={() => handleInput(btn)}
              >
                <Text
                  style={[styles.textButton, { color: "white", fontSize: 28 }]}
                >
                  {btn}
                </Text>
              </TouchableOpacity>
            ) : //
            btn === 0 ? (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  {
                    backgroundColor: "#303946",
                    minWidth: "36%",
                  },
                ]}
                onPress={() => handleInput(btn)}
              >
                <Text style={styles.textButton}>{btn}</Text>
              </TouchableOpacity>
            ) : //
            btn === "." ? (
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  {
                    backgroundColor: "#303946",
                    minWidth: "37%",
                  },
                ]}
                onPress={() => handleInput(btn)}
              >
                <Text style={styles.textButton}>{btn}</Text>
              </TouchableOpacity>
            ) : (
              //
              <TouchableOpacity
                key={btn}
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      typeof btn === "number" ? "#303946" : "#414853",
                  },
                ]}
                onPress={() => handleInput(btn)}
              >
                <Text style={styles.textButton}>{btn}</Text>
              </TouchableOpacity>
            )
          )
        ) : (
          <View>
            <ScrollView style={{ height: "90%" }}>
              <Text style={{ textAlign: "center", fontSize: 28, padding: 10 }}>
                History
              </Text>
              {exp.map((item) => {
                return <Text style={styles.history_text}>{item}</Text>;
              })}
            </ScrollView>
            <Text
              style={{ fontSize: 16, textAlign: "center", paddingTop: 5 }}
              onPress={() => {
                setExp([]);
              }}
            >
              Delete history
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    flexDirection: "row",
  },
  historyButton: {
    bottom: "15%",
    margin: 10,
    backgroundColor: "#7b8084",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  results: {
    backgroundColor: "#282f3b",
    maxWidth: "100%",
    minHeight: "35%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputText: {
    height: 60,
    width: "100%",
    textAlign: "right",
    padding: 10,
    color: "#fff",
    fontSize: 40,
  },
  prevText: {
    color: "#B5B7BB",
    fontSize: 30,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  buttons: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    borderColor: "#a6a0a0",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    minWidth: "24%",
    minHeight: "54%",
    flex: 1,
  },
  textButton: {
    color: "#b5b7bb",
    fontSize: 28,
  },
  history_theme: {
    paddingRight: 10,
    width: "100%",
    height: "65%",
    backgroundColor: "#c1c1c1",
  },
  history_text: {
    fontSize: 28,
    color: "#414853",
    marginRight: 10,
    textAlign: "right",
  },
});
