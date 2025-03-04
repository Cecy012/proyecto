import { Avatar } from '@rneui/base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../../utils/firebase.config';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const AvatarProfile = ({ user }) => {
    const auth = getAuth(app);
    const [userCredential, setUserCredential] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserCredential(user);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size={120}
                source={user.photoUrl ? { uri: user.photoUrl } : { uri: 'https://image-cdn-fa.spotifycdn.com/image/ab67706c0000da8438a17815a33470df87e42ede' }}
                containerStyle={styles.avatar}
            />
            <Text style={styles.name}>{user.name ? user.name : 'Anónimo'}</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Mi Información</Text>
                <Text style={styles.infoText}>📞 {user.phoneNumber || 'No disponible'}</Text>
                <Text style={styles.infoText}>✉️ {userCredential?.email || 'No disponible'}</Text>
                <Text style={styles.infoText}>🎓 {user.carrera || 'No especificado'}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    avatar: {
        marginBottom: 15,
        borderWidth: 2,
        borderColor: '#007bff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#007bff',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
});

export default AvatarProfile;