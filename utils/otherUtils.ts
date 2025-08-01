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