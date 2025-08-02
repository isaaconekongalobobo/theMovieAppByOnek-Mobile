import NetInfo from '@react-native-community/netinfo';

// Utilitaire pour récuperer l'etat de la connexion
export const checkInternetConnecion = async () => {
  try {
    const state = await NetInfo.fetch();
    return !!(state.isConnected && state.isInternetReachable);
  } catch (error) {
    console.log('Erreur lors de la vérification de la connexion :', error);
    return false;
  }
};

// Découper un texte en plusieurs paragraphe en ayant comme délimiteur le point .
export const paragraphFromText = (text: string) => {
  return text
    .split('.')
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => p + '.'); // On remet le point à la fin
};