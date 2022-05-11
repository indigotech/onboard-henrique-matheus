import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, SafeAreaView, Button} from 'react-native';
import {ClientCard} from './components/client-card';
import {getUserToken} from './utils/cache';
import {MainContainer} from './utils/style';
import {useUserList} from './utils/user-service';
import styled from 'styled-components/native';
import FAB from 'react-native-fab';
import {COLORS} from './utils/colors';
import { navigateToAddUser } from './utils/navigation-service';

const ClientsPerLoad = 20;

export const HomePage = props => {
  const [token, setToken] = useState<any>();
  const [offset, setOffset] = useState(0);
  const { loading, error, clientList, getClientList } = useUserList(token, offset, ClientsPerLoad);
  const [ clientListDisplayed, setClientListDisplayed] = useState<any[]>([]);


  useEffect(() => {
    const loadUserToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
      getClientList();
    };
    loadUserToken();
  }, []);

  useEffect(() => {
    if (clientList) {
      setClientListDisplayed((currentList) => currentList ? currentList.concat(clientList) : clientList)
    }
  }, [clientList]);

  return (
    <SafeAreaView>
      <MainContainer>
        <Text>Lista de clientes</Text>
        {!loading && (
          <View style={{height: '95%'}}>
            <FlatList
              data={clientListDisplayed}
              renderItem={({item}) => item && <ClientCard client={item} />}
              ListFooterComponent={() => (
                <Button
                  title="Carregar mais"
                  onPress={() => setOffset(offset + ClientsPerLoad)}
                />
              )}
              extraData={true}
            />
          </View>
        )}
        {!loading && <Text>{error}</Text>}
        {loading && <Text>Loading...</Text>}
        <FAB
          buttonColor={COLORS.purple}
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            navigateToAddUser(props.componentId);
          }}
          visible={true}
        />
      </MainContainer>
    </SafeAreaView>
  );
};
