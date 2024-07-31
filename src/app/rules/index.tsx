import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

type Props = {}

export default function Rules (props: Props)  {
  return (
    <View>
      <Text>Rules</Text>
      <Link href={'/'}>
      Back to home
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({})