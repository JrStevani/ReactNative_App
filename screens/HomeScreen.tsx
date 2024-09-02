
import React, { useState } from 'react';
import { View, TextInput, Button, Image, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

interface User {
  login: string;
  name: string;
  avatar_url: string;
  location: string;
}

const HomeScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [history, setHistory] = useState<User[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data);
      
      setHistory((prevHistory) => {
        if (!prevHistory.some(user => user.login === response.data.login)) {
          const newHistory = [...prevHistory, response.data];
          if (prevHistory.length === 0) {
            setShowHistory(true);
          }
          return newHistory;
        }
        return prevHistory;
      });
    } catch (error) {
      alert("Usuário não encontrado. Verifique o nome de usuário e tente novamente.");
    }
  };

  const handleProfilePress = (user: User) => {
    navigation.navigate('Perfil de usuário', { username: user.login });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo-clicksoft.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome de usuario do Github..."
          onChangeText={setUsername}
          value={username}
        />
        <Button title="Buscar" onPress={fetchUserData} color="#440afa" />
      </View>
      {userData && (
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => handleProfilePress(userData)}>
            <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
            <Text style={styles.name}>📑 {userData.name}</Text>
            <Text style={styles.login}>👤 {userData.login}</Text>
            <Text style={styles.location}>📍 {userData.location}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={[styles.historyContainer, { display: showHistory ? 'flex' : 'none' }]}>
        <Text style={styles.historyTitle}>Histórico de Perfis</Text>
        <FlatList
          data={history}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.historyItem} onPress={() => handleProfilePress(item)}>
              <Image source={{ uri: item.avatar_url }} style={styles.historyAvatar} />
              <View style={styles.historyInfo}>
                <Text style={styles.historyName}>{item.name}</Text>
                <Text style={styles.historyLogin}>{item.login}</Text>
                <Text style={styles.historyLocation}>{item.location}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.login}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f9',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  userContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  login: {
    fontSize: 20,
    color: '#33adac',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 10,
  },
  historyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  historyLogin: {
    fontSize: 16,
    color: '#33adac',
  },
  historyLocation: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen;
