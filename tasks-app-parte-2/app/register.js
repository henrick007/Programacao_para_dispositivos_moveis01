import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Input } from "../src/components/Input";
import { Button } from "../src/components/Button";
import { api } from '../src/api/api';

/** Tela de Cadastro */
export default function Page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const disabledButton =
        name === '' ||
        email == '' ||
        password === '';

    /** Função para fazer Cadastro:
    *
    *  Executa um método POST chamando a rota /register da API, passa os dados (name, email, password),
    *  o token retornado da API é armezando na memória do aparelho para fazer outras requisições de tarefas,
    *  se tudo funcionar corretamente é redirecionado para a tela de Tarefas.
    */
    const handleRegister = async () => {
        try {
            setLoading(true);
            const result = await api.post('/register', {
                name,
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
            <Text style={styles.title}>Crie uma conta</Text>
            <Input
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Nome"
            />
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
                onPress={handleRegister}
                title="Criar conta"
                disabled={disabledButton}
            />
            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.link}>Já tenho uma conta</Text>
            </TouchableOpacity>
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
        marginBottom: 30,
    },
    link: {
        textDecorationLine: 'underline',
        color: '#ababab',
        fontSize: 16,
        marginTop: 30,
    }
});
