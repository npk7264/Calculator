import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const buttons = 
  [
    'C', '%', 'DEL', '/',
    7, 8,  9, '*',
    4, 5, 6, '-',
    1, 2, 3, '+',
    0, '.', '=',
  ];
  // history
  const [showHistory, setShowHistory] = useState(false);
  const [prevResults, setPrevResults] = useState([]);
  // search
  const [searchIcon, setSearchIcon] = useState(false);
  // check if search TextInput change
  const [searchChange, setSearchChange] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filteredText, setFilteredText] = useState([]);

  const validInput = (currentNumber) => {
    let len = currentNumber.length;
    if (!['+', '-', '*', '/', '%', '.'].includes(currentNumber[len - 1]))
      return true;
    return false;
  };

  const handleInput = (btnPressed) => {
    if (['+', '-', '*', '/', '%', '.'].includes(btnPressed)) {
      if (
        validInput(currentNumber) &&
        !(currentNumber.length == 0 && btnPressed != '-')
      ) {
        setCurrentNumber(currentNumber + btnPressed);
      } else if (
        !(
          btnPressed != '-' &&
          (currentNumber.length == 0 || currentNumber == '-')
        )
      ) {
        let temp = currentNumber.slice(0, currentNumber.length - 1);
        setCurrentNumber(temp + btnPressed);
      }
      return;
    }

    switch (btnPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'C':
        setLastNumber('');
        setCurrentNumber('');
        return;
      case '=':
        if (validInput(currentNumber) && currentNumber.length != 0) {
          setLastNumber(currentNumber + '=');
          calculate();
        }
        return;
    }

    setCurrentNumber(currentNumber + btnPressed);
  };

  const calculate = () => {
    let result = eval(currentNumber).toString();
    setPrevResults([...prevResults, currentNumber + '=' + result]);
    setCurrentNumber(result);
    return;
  };

  const searchFilter = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = prevResults.filter((item) => {
        return item.indexOf(text) > -1;
      });
      setFilteredText(newData);
      setSearchText(text);
    } else {
      setSearchChange(false);
      setSearchText('');
    }
  };

  return (
    <View>
      <View style={styles.results}>
        <View style={styles.menu}>
          {showHistory ? (
            <TextInput
              style={styles.searchBar}
              onChangeText={(text) => {
                setSearchChange(true);
                searchFilter(text);
              }}
              value={searchText}
              placeholder="Search Here"
            />
          ) : null}

          <View style={styles.historyButton}>
            <Icon
              name={!showHistory ? 'history' : 'calculator'}
              size={24}
              color={'black'}
              onPress={() => {
                setSearchIcon(!searchIcon);
                setShowHistory(!showHistory);
                setSearchChange(false);
                setSearchText('');
              }}
            />
          </View>
        </View>

        <Text style={styles.expText}>{lastNumber}</Text>

        <TextInput
          style={styles.inputText}
          onChangeText={(text) => {
            try {
              if (typeof eval(text) == 'number') setCurrentNumber(text);
            } catch {
              alert('Biểu thức không hợp lệ!');
            }
          }}
          value={currentNumber}
          showSoftInputOnFocus={false}
          selectTextOnFocus={false}
        />
      </View>

      <View style={!showHistory ? styles.buttons : styles.historyList}>
        {!showHistory ? (
          buttons.map((btn) => (
            <TouchableOpacity
              key={btn}
              style={[
                styles.button,
                ['+', '-', '*', '/', '='].includes(btn)
                  ? { backgroundColor: '#2c7ef4' }
                  : {
                      backgroundColor: ['C', '%', 'DEL'].includes(btn)
                        ? '#414853': '#303946',
                      minWidth: btn == 0 ? '36%' : btn == '.' ? '37%' : '24%',
                    },
              ]}
              onPress={() => handleInput(btn)}>
              <Text style={styles.textButton}>{btn}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <View>
            <ScrollView style={{ height: '90%' }}>
              <Text style={{ textAlign: 'center', fontSize: 28, padding: 10 }}>
                History
              </Text>
              {searchChange
                ? filteredText.map((ftext, index) => {
                    return (
                      <Text key={index} style={styles.historyText}>{ftext}</Text>
                    );
                  })
                : prevResults.map((presult, index) => {
                    return (
                      <Text key={index} style={styles.historyText}>{presult}</Text>
                    );
                  })}
            </ScrollView>
            <Text
              style={{ fontSize: 16, textAlign: 'center', paddingTop: 5 }}
              onPress={() => {
                setPrevResults([]);
                setFilteredText([]);
              }}>
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
    flexDirection: 'row',
    bottom: '10%',
  },
  historyButton: {
    margin: 10,
    backgroundColor: '#c1c1c1',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchBar: {
    margin: 10,
    backgroundColor: '#c1c1c1',
    fontSize: 18,
    textAlign: 'right',
    padding: 10,
    width: '75%',
    height: 50,
    borderRadius: 25,
  },
  results: {
    backgroundColor: '#282f3b',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  expText: {
    color: '#B5B7BB',
    fontSize: 30,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  inputText: {
    fontSize: 40,
    height: 60,
    width: '100%',
    textAlign: 'right',
    padding: 10,
    color: '#fff',
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderColor: '#c1c1c1',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '54%',
    flex: 1,
  },
  textButton: {
    color: '#b5b7bb',
    fontSize: 28,
  },
  historyList: {
    paddingRight: 10,
    width: '100%',
    height: '65%',
    backgroundColor: '#c1c1c1',
  },
  historyText: {
    fontSize: 22,
    color: '#414853',
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'right',
  },
});