import { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, router } from 'expo-router';

import { Input } from "../src/components/Input";
import { api } from '../src/api/api';
import { Button } from "../src/components/Button";

/** Tela de Login */
export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const disabledButton = email === '' || password === '';

    /** Função para fazer Login:
     *
     *  Executa um método POST chamando a rota /login da API, passa os dados (email, password),
     *  o token retornado da API é armezando na memória do aparelho para fazer outras requisições de tarefas,
     *  se tudo funcionar corretamente é redirecionado para a tela de Tarefas.
     */
    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await api.post('/login', {
                email,
                password
            });
            await AsyncStorage.setItem(
                '@tasks-app/token',
                result.data.accessToken
            );
            router.replace('/tasks');
        } catch (error) {
            Alert.alert('Houve um erro', error.response.data.error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.subTitle}>Entre na sua conta para acessar suas tarefas</Text>
            <Input
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholder="E-mail"
            />
            <Input
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                placeholder="Senha"
            />
            <Button
                loading={loading}
                onPress={handleLogin}
                title="Entrar"
                disabled={disabledButton}
            />
            <Link href={"/register"} style={styles.link}>Criar uma conta</Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: '#1a1a1a',
        padding: 24,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subTitle: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 50,
        width: '70%'
    },
    link: {
        textDecorationLine: 'underline',
        color: '#ababab',
        fontSize: 16,
        marginTop: 30,
    }
});
