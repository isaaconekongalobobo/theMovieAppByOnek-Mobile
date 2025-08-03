import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';

const Music = () => {
  const [tracks, setTracks] = useState<MediaLibrary.Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    ( async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission refusée', "Impossible d'accéder aux fichiers audio.");
        setIsLoading(false);
        return;
      }

      try {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: MediaLibrary.MediaType.audio,
          first: 1000,
          sortBy: MediaLibrary.SortBy.default,
        });
        setTracks(media.assets);
      } catch (e) {
        Alert.alert('Erreur', 'Impossible de récupérer les fichiers audio.');
      }
      setIsLoading(false);
    })();

    // Cleanup au unmount : décharge le son
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const playTrack = async (track: MediaLibrary.Asset) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );
      soundRef.current = sound;
      setCurrentTrackId(track.id);

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setCurrentTrackId(null);
          sound.unloadAsync();
          soundRef.current = null;
        }
      });
    } catch (error) {
      Alert.alert('Erreur', "Impossible de lire ce fichier audio.");
    }
  };

  const pauseTrack = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setCurrentTrackId(null);
    }
  };

  const togglePlayPause = (track: MediaLibrary.Asset) => {
    if (currentTrackId === track.id) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  const renderItem = ({ item }: { item: MediaLibrary.Asset }) => {
    const isPlaying = currentTrackId === item.id;
    return (
      <TouchableOpacity
        onPress={() => togglePlayPause(item)}
        style={[styles.trackItem, isPlaying && styles.trackItemPlaying]}
      >
        <Text style={styles.trackText}>
          {item.filename}
          {isPlaying ? ' ⏸️' : ' ▶️'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Ma Musique</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Chargement des morceaux...</Text>
      ) : tracks.length === 0 ? (
        <Text style={styles.emptyText}>Aucun fichier audio trouvé.</Text>
      ) : (
        <FlatList
          data={tracks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF0800', marginBottom: 12 },
  loadingText: { color: '#fff' },
  emptyText: { color: '#888' },
  trackItem: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  trackItemPlaying: {
    backgroundColor: '#FF0800',
  },
  trackText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Music;
