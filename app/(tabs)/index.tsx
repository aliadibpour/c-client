import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import axios from "axios";
import { io } from 'socket.io-client';


export default function HomeScreen() {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    // axios.get("http://192.168.1.101:3000/").then(res => {
    //   setData(res.data)
    //   console.log(data);
    // } 
    //)

  },[])
  return (
    <SafeAreaView style={tw`flex text-black justify-center items-center flex-1`}>
      <ScrollView style={{ flex: 1 }}>
      <Text style={tw``}>corner</Text>
        {
          data?.map((item:any, index:number) => 
          <View style={tw`justify-items-start bg-gray-900 mb-3 rounded-lg pb-2 m-2`} key={index}>
            {
              item.messagePhoto !== null ?
              <Image 
              style={tw`w-full rounded-lg h-58`}
              source={
                {uri: item.messagePhoto}
                }/> : 
                null
            }
            <Text style={tw`text-sm w-fit text-white p-3`}>{item.messageText}</Text>
          </View>
          )
        }
    </ScrollView>
    </SafeAreaView>
  );
}
