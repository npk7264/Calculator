import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function App() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");
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
          (btnPressed == "*" || btnPressed == "/" || btnPressed == ".")
        )
      ) {
        setCurrentNumber(currentNumber + btnPressed);
      }
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
      setCurrentNumber(result);
      return;
    }
  };

  return (
    <View>
      <View style={styles.results}>
        <Text style={styles.prevText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((btn) =>
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  results: {
    backgroundColor: "#282f3b",
    maxWidth: "100%",
    minHeight: "35%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  resultText: {
    maxHeight: 45,
    color: "#b5b7bb",
    margin: 15,
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
});
