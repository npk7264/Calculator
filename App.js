import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');
  const [historyExpressions, setHistoryExpressions] = useState([]);
  // check if search TextInput change
  const [searchChange, setSearchChange] = useState(false);
  const [searchText, setSearchText] = useState('');
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
      setSearchText('');
    }
  };

  return (
    <View style={{height: '100%', backgroundColor: '#282f3b'}}>
      <View style={{top: '10%', alignItems: 'center', paddingBottom: 16}}>
        <TextInput
          style={styles.inputText}
          onChangeText={(text) => {
            if (text[text.length - 1] == '÷' || text[text.length - 1] == ':') {
              setCurrentNumber(currentNumber + '/');
            } else if (
              text[text.length - 1] == 'x' || text[text.length - 1] == 'x' ) {
              setCurrentNumber(currentNumber + '*');
            } else if (text[text.length - 1] == '^') {
              setCurrentNumber(currentNumber + '**');
            } else {
              setCurrentNumber(text);
            }
          }}
          value={currentNumber}
          placeholder="Enter expression"
          keyboardType="visible-password"
        />
        <View style={styles.menuButton}>
          <TouchableOpacity
            style={[styles.button, {width: '20%'}]}
            onPress={() => {
              try {
                let temp = eval(currentNumber).toString();
                setLastNumber(temp);
                setHistoryExpressions([...historyExpressions, { expression: currentNumber, result: temp },]);
              } catch {
                setLastNumber('');
              }
            }}>
            <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {width: '20%'}]}
            onPress={() => {
              setCurrentNumber('');
              setLastNumber('');
            }}>
            <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>CLEAR</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.resultText}>{lastNumber}</Text>
      </View>

      <View style={{top: '10%'}}>
        <Text
          style={{ textAlign: 'center', fontSize: 28, padding: 10, color: 'white', }}>
          History
        </Text>
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
          <TouchableOpacity
            style={styles.buttonRefreshSearch}
            onPress={() => {
              setSearchText('');
              setSearchChange(false);
            }}>
            <Icon name={'refresh'} size={24} color={'white'} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{ height: '25%', width: '92%', alignSelf: 'center',paddingHorizontal: 10, 
                  borderRadius: 25, backgroundColor: '#c1c1c1', }}>
          {
            (searchChange? filteredText: historyExpressions).map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={[styles.historyText, { fontWeight: searchChange? 'bold': null }]}
                    onPress={() => {
                      setCurrentNumber(item.expression);
                      setLastNumber(item.result);
                    }}>
                    {item.expression + '\n' + item.result}
                  </Text>
                );
              })
          }
        </ScrollView>
        <TouchableOpacity
          style={[styles.button, { width: '32%', alignSelf: 'center', marginVertical: '5%', }]}
          onPress={() => {
            setHistoryExpressions([]);
            setFilteredText([]);
          }}>
          <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>Delete history</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginVertical: 15
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c7ef4',
    borderRadius: 25,
    marginHorizontal: 10,
  },
  inputText: {
    fontSize: 30,
    width: '92%',
    textAlign: 'right',
    padding: 10,
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: 25,
  },
  resultText: {
    color: '#2c7ef4',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 10,
    textAlign: 'right',
    width: '92%',
    backgroundColor: '#c1c1c1',
    borderRadius: 25,
  },
  searchMenu: {
    flexDirection: 'row',
    height: '15%',
    width: '92%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 5
  },
  buttonRefreshSearch: {
    backgroundColor: '#2c7ef4',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  searchBar: {
    backgroundColor: '#fff',
    fontSize: 18,
    textAlign: 'right',
    paddingHorizontal: 10,
    width: '80%',
    height: 50,
    borderRadius: 25,
  },
  historyText: {
    fontSize: 22,
    color: '#414853',
    marginHorizontal: 10,
    marginVertical: 5,
    textAlign: 'right',
    borderColor: 'black',
  },
});
