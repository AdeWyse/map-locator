import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput, Pressable } from 'react-native';
import { useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  street: yup.string().required("You forgot the street"),
  number: yup.number().typeError("Use only numbers on number").required("You forgot the number"),
  zipCode: yup.number().typeError("Use only numbers on Zip-Code").min(5, "A zip code has at least 5 digits").required("You forgot the Zip-Code")
});

export default function App() {
  const {control, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      street: "",
      number: "",
      zipCode: ""

    },
    resolver: yupResolver(schema)
  });

  function locateOnMap(data){
    console.log(data)
  }

  return (
    <View style={styles.container}>
      <View style = {styles.navbar}>
        <h2>Map Locator</h2>
      </View>
      <View style={styles.mapArea}>
        <Controller  control={control} name="street" render={({field: {onChange, value}}) => (
          <TextInput style={styles.textInput} onChangeText={onChange} value={value} placeholder="Street"/>
        )}/>
        <View style={styles.sideBySide}>
            <Controller  control={control} name="number" render={({field: {onChange,  value}}) => (
              <TextInput style={styles.textInput} onChangeText={onChange} value={value} placeholder="Number"/>
            )}/>
            <Controller control={control} name="zipCode" render={({field: {onChange,  value}}) => (
              <TextInput style={styles.textInput} onChangeText={onChange} value={value} placeholder="Zip-Code"/>
            )}/>
        </View>
        {errors.street && <View><Text style={styles.error}>{errors.street?.message}</Text></View>}
        {errors.number && <Text style={styles.error}>{errors.number?.message}</Text>}
        {errors.zipCode && <Text style={styles.error}>{errors.zipCode?.message}</Text>}
        <Pressable style={styles.locateButton} onPress={handleSubmit(locateOnMap)}><Text style={{color: 'white'}}>Locate</Text></Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    backgroundColor: '#2b2525',
    color: '#ffffff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontFamily: 'helvetica',
  },

  navbar: {
    backgroundColor: '#1b8a5a',
    width: '100%',
    paddingLeft: 5,
    height: 'auto'
  },

  mapArea: {
    height: '100%',
    color: 'white',
    backgroundColor: '#2b2525',
    alignItems: 'center',
    paddingTop: 10
  },

  textInput: {
      color: '#2b2525',
      backgroundColor: 'white',
      margin: 3,
      width: '75%',
      padding: 4,
      borderRadius: 3,
      border: 1
  },

  locateButton: {
    backgroundColor: '#1b8a5a',
    width: '75%',
    padding: 4,
    borderRadius: 3,
    border: 1,
    alignItems: 'center',
    marginTop: 5,
    fontFamily: 'helvetica'

  },

  sideBySide: {
    flexDirection: 'row',
    width: '75%',
  },


  error:{
    color: 'red',
    textAlign: 'left',
    fontFamily: 'helvetica'
  }

});
