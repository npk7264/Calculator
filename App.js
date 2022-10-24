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
  // history
  const [historyExpressions, setHistoryExpressions] = useState([]);
  // search
  // check if search TextInput change
  const [searchChange, setSearchChange] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredText, setFilteredText] = useState([]);

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = historyExpressions.filter((item) => {
        return (
          item.expression.indexOf(text) > -1 || item.result.indexOf(text) > -1
        );
      });
      setFilteredText(newData);
      setSearchText(text);
    } else {
      setSearchChange(false);
      setSearchText("");
    }
  };

  return (
    <View>
      <View style={styles.results}>
        <View style={styles.searchMenu}>
          <TextInput
            style={styles.searchBar}
            onChangeText={(text) => {
              setSearchChange(true);
              searchFilter(text);
            }}
            value={searchText}
            placeholder="Search History"
            keyboardType="visible-password"
          />
          <TouchableOpacity style={styles.refreshSearchButton}>
            <Icon
              name={"refresh"}
              size={24}
              color={"black"}
              onPress={() => {
                setSearchText("");
                setSearchChange(false);
              }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => {
            if (text[text.length-1] == "÷") {setCurrentNumber(currentNumber+"/")}
            else if (text[text.length-1] == "×") {setCurrentNumber(currentNumber+"*")}
            else if (text[text.length-1] == "^") {setCurrentNumber(currentNumber+"**")}
            else {setCurrentNumber(text);}
          }}
          value={currentNumber}
          placeholder="Enter expression"
          keyboardType="visible-password"
        />
        <View style={styles.menuButton}>
          <TouchableOpacity
            style={styles.buttonEqual}
            onPress={() => {
              try {
                let temp = eval(currentNumber).toString();
                setLastNumber(temp);
                setHistoryExpressions([
                  ...historyExpressions,
                  { expression: currentNumber, result: temp },
                ]);
              } catch {
                setLastNumber("");
              }
            }}
          >
            <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
              =
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonEqual}
            onPress={() => {
              setCurrentNumber("");
              setLastNumber("");
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "bold" }}>
              CLEAR
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.expText}>{lastNumber}</Text>
      </View>

      <View style={styles.historyList}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          History
        </Text>
        <ScrollView style={{ height: "80%", marginLeft: 10 }}>
          {searchChange
            ? filteredText.map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={[styles.historyText, { fontWeight: "bold" }]}
                    onPress={() => {
                      setCurrentNumber(item.expression),
                        setLastNumber(item.result);
                    }}
                  >
                    {item.expression + "=" + item.result}
                  </Text>
                );
              })
            : historyExpressions.map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={styles.historyText}
                    onPress={() => {
                      setCurrentNumber(item.expression),
                        setLastNumber(item.result);
                    }}
                  >
                    {item.expression + "=" + item.result}
                  </Text>
                );
              })}
        </ScrollView>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
            alignSelf: "center",
            padding: 5,
            color: "#2c7ef4",
            width: "36%",
          }}
          onPress={() => {
            setHistoryExpressions([]);
            setFilteredText([]);
          }}
        >
          Delete history
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchMenu: {
    flexDirection: "row",
    bottom: "15%",
  },
  menuButton: {
    flexDirection: "row",
    height: "12%",
    bottom: "5%",
    marginVertical: 15,
  },
  buttonEqual: {
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2c7ef4",
    borderRadius: 25,
    marginHorizontal: 10,
  },
  refreshSearchButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#c1c1c1",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchBar: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#c1c1c1",
    fontSize: 18,
    textAlign: "right",
    padding: 10,
    width: "72%",
    height: 50,
    borderRadius: 25,
  },
  results: {
    backgroundColor: "#282f3b",
    maxWidth: "100%",
    minHeight: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  inputText: {
    fontSize: 30,
    width: "92%",
    textAlign: "right",
    padding: 10,
    color: "#000",
    backgroundColor: "#fff",
    bottom: "5%",
    borderRadius: 25,
  },
  expText: {
    color: "#2c7ef4",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    textAlign: "right",
    width: "92%",
    backgroundColor: "#c1c1c1",
    bottom: "5%",
    borderRadius: 25,
  },
  historyList: {
    paddingRight: 10,
    width: "100%",
    height: "50%",
    backgroundColor: "#c1c1c1",
  },
  historyText: {
    fontSize: 22,
    color: "#414853",
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: "right",
  },
});
