import { useEffect, useState } from 'react';
import { Image, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

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
      <Text className='text-red-700 text-lg'>corner</Text>
      <Text className='text-blue-800 text-xs'>corner</Text>
      <Text >corner</Text>
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
