import React, { useEffect, useState } from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { io } from 'socket.io-client';
import MatchItem from '../../components/live-match/MatchItem';
import MatchDays from '@/components/live-match/MatchDays';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';

const socket = io('http://192.168.1.101:3000/');
export default function LiveMatch() {
  const [matchList, setMatchList] = useState<any>();
  const router = useRouter();
  const {day} = useGlobalSearchParams();
  
  useEffect(() => {
    router.setParams({day: "2"})
  },[])
  useEffect(() => {
    socket.emit("live-match",day, (response: any) => {
      console.log(response);
      console.log(day)
      setMatchList(response.matchList)
    })
  }, [day])
  return (
      <ScrollView>
      <SafeAreaView className='max-w-screen-xl m-auto flex'>
        <MatchDays />
      {
        matchList?.length ?
        matchList.map((matchList:any) => <MatchItem matchList={matchList} key={matchList.league} />) :
        <Text>loading</Text>
      }
      </SafeAreaView>
      </ScrollView>
  )
};