import React, { useEffect, useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { io } from 'socket.io-client';
import tw from 'twrnc';
import MatchItem from './match-item';

export default function Live() {
  const socket = io('http://192.168.172.115:3000/');
  const [matchList, setMatchList] = useState<any>()
  useEffect(() => {
    // گوش دادن به رویداد matchUpdate از سرور
    
    socket.on('connect', () => {
      console.log('Connected to server');
      socket.emit('send_index', 3);
  });

  socket.on('receive_data', (data) => {
      console.log(data);
      setMatchList(data.matchList)
  });

  socket.on('disconnect', () => {
      console.log('Disconnected from server');
  });
  }, []);
  return (
      <ScrollView style={tw`flex`}>
      <SafeAreaView>
      {
        matchList?.length ?
        matchList.map((matchList:any) => <MatchItem matchList={matchList} key={matchList.league} />) :
        <Text style={tw`text-white`}>eeeeeeeeee</Text>
      }
      </SafeAreaView>
      </ScrollView>
  )
};
