import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from 'react-native';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState('');

  // useEffect(() => {
  //   console.log(orders);
  // }, [orders]);

  const setDoneOrder = updateIndex => {
    const tempArr = orders.map(i => {
      return i;
    });
    tempArr.forEach(item => {
      if (item.id === updateIndex) {
        item.done = !item.done;
      }
    });
    setOrders(tempArr);
  };

  const renderOrders = props => {
    return (
      <View style={styles.ordersContainer}>
        <Pressable
          onPress={() => {
            setDoneOrder(props.item.id);
          }}>
          <Text
            style={props.item.done ? styles.orderTextDone : styles.orderText}>
            {props.item.info}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.appHeaderContainer}>
        <Text style={styles.appHeader}>Yapılacaklar</Text>
        <Text style={styles.appHeader}>{orders.length.toString()}</Text>
      </View>
      <FlatList
        data={orders}
        extraData={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrders}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          defaultValue={newOrder}
          placeholder="Yapılacak.."
          maxLength={255}
          ref={input => {
            this.textInput = input;
          }}
          onChangeText={newtxt => {
            setNewOrder(newtxt);
          }}
          multiline
        />
        <View style={styles.seperator} />
        <Pressable
          style={styles.kaydetPressable}
          onPress={() => {
            setOrders([
              ...orders,
              {id: orders.length, done: false, info: newOrder},
            ]);
            this.textInput.clear();
          }}>
          <Text style={styles.textPressable}>Kaydet</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  appHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  appHeader: {
    color: 'orange',
    fontSize: 32,
    fontWeight: 'bold',
  },
  seperator: {
    borderColor: '#78909C',
    borderWidth: 1,
  },
  ordersContainer: {},
  orderText: {
    color: 'white',
    fontSize: 26,
    backgroundColor: '#7DA453',
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  orderTextDone: {
    backgroundColor: '#37474F',
    color: 'grey',
    fontSize: 26,
    textDecorationLine: 'line-through',
    padding: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  textInput: {
    color: 'white',
    fontSize: 22,
    marginHorizontal: 10,
  },
  kaydetPressable: {
    backgroundColor: '#808080',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  textPressable: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#37474F',
    justifyContent: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default App;
