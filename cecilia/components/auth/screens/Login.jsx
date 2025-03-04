import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { getAuth, signInWithEmailAndPassword, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../../utils/firebase.config';
import { useNavigation } from '@react-navigation/native';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { Input, Button } from 'react-native-elements';

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        console.log("Ingreso exitoso");
        save(userCredential.user.uid);
        navigation.navigate("HomeProfile");
      })
      .catch(error => {
        console.log("Error en inicio de sesión: ", error);
      });
  };

  const save = async (uid) => {
    const data = {
      name: "Max",
      phoneNumber: "7771932360",
      carrera: "Desarrollo de Software Multiplataforma"
    };

    try {
      if (uid) {
        const userRef = doc(db, 'users', uid);
        await setDoc(userRef, data, { merge: true });
        console.log("Perfil de usuario guardado:", data);
      } else {
        console.log("Error: UID inválido");
      }
    } catch (error) {
      console.log("Error guardando el perfil de usuario:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            onChangeText={(text) => setUser(text)}
            containerStyle={styles.input}
          />
          <Input
            placeholder="Contraseña"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            containerStyle={styles.input}
          />
        </View>
        <Button title="Ingresar" onPress={handleSignIn} buttonStyle={styles.button} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    width: '100%',
  }
});

export default Login;
