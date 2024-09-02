import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Linking, TouchableOpacity, TouchableHighlight } from 'react-native';
import axios from 'axios';

const ProfileScreen = ({ route }: any) => {
  const { username } = route.params;
  const [userData, setUserData] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        setUserData(userResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setRepos(reposResponse.data);
      } catch (error) {
      }
    };
    fetchUserData();
  }, [username]);

  const openRepository = (repoUrl: string) => {
    Linking.openURL(repoUrl);
  };

  const openGitHubProfile = () => {
    const profileUrl = `https://github.com/${username}`;
    Linking.openURL(profileUrl);
  };

  return (
    <View style={styles.container}>
      {userData && (
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={openGitHubProfile}>
              <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
            </TouchableOpacity>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.login}>{userData.login}</Text>
            <Text style={styles.location}>{userData.location}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>🆔 ID: {userData.id}</Text>
            <Text style={styles.infoText}>🧑 Seguidores: {userData.followers}</Text>
            <Text style={styles.infoText}>🗂️ Repositórios Públicos: {userData.public_repos}</Text>
          </View>
          <FlatList
            data={repos}
            renderItem={({ item }) => (
              <TouchableHighlight
                style={styles.repoContainer}
                onPress={() => openRepository(item.html_url)}
                underlayColor="#e1e1e1"
              >
                <View>
                  <Text style={styles.repoName}>{item.name}</Text>
                  <Text style={styles.repoLang}>{item.language}</Text>
                  <Text style={styles.repoDesc}>{item.description}</Text>
                  <Text style={styles.repoDate}>Criado em: {new Date(item.created_at).toLocaleDateString()}</Text>
                  <Text style={styles.repoDate}>Última atualização: {new Date(item.pushed_at).toLocaleDateString()}</Text>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    borderBottomWidth: 0,
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
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  repoName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#440afa',
    marginBottom: 6,
  },
  repoLang: {
    fontSize: 14,
    color: '#33adac',
    marginBottom: 6,
  },
  repoDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  repoDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});

export default ProfileScreen;
