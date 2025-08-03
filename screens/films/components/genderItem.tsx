import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GenderItemProps {
  genre: string;
}

const genreColors: Record<string, string> = {
  Action: '#E53935',
  Aventure: '#F57C00',
  Animation: '#FDD835',
  Comédie: '#43A047',
  Crime: '#6D4C41',
  Documentaire: '#00ACC1',
  Drame: '#3949AB',
  Famille: '#8E24AA',
  Fantastique: '#5E35B1',
  Histoire: '#00897B',
  Horreur: '#C62828',
  Musique: '#EC407A',
  Mystère: '#7B1FA2',
  Romance: '#D81B60',
  'Science-Fiction': '#1E88E5',
  Téléfilm: '#546E7A',
  Thriller: '#FF7043',
  Guerre: '#3E2723',
  Western: '#A1887F',

  // Pour les séries :
  'Action & Adventure': '#EF6C00',
  Kids: '#00BFA5',
  News: '#455A64',
  Reality: '#8D6E63',
  'Science-Fiction / Fantastique': '#4A148C',
  Soap: '#F06292',
  'Talk-show': '#9E9E9E',
  'Guerre & Politique': '#3F51B5',
};

const GenderItem = ({ genre }: GenderItemProps) => {
    // couleur par défaut si non trouvée
    const backgroundColor = genreColors[genre] || '#9E9E9E'; 

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }]}>
            <Text style={styles.text}>{genre}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    margin: 4,
  },
  text: {
    color: '#fff',
    fontWeight: '500',
  },
});

export default GenderItem;
