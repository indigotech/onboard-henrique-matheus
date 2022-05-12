import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { LoadingLayer } from "./components/loading-layer";
import { getUserToken } from "./utils/cache";
import { InfoDisplayContainer, MainContainer, MainText, SubText, TitleText } from "./utils/style";
import { useUserInfo } from "./utils/user-service";

const InfoDisplay = ({title, value}) => {
  return(
    <InfoDisplayContainer>
      <TitleText>{title}: <SubText>{value}</SubText></TitleText>
    </InfoDisplayContainer>
  )
}

export const DetailsPage = (props) => {

  const [token, setToken] = useState<any>();
  const { loading, error, user, getUserInfo } = useUserInfo(token, props.id);

  useEffect(() => {
    const loadUserToken = async () => {
      const userToken = await getUserToken();
      setToken(userToken);
      getUserInfo();
    } 
    loadUserToken();
  },[]);

  return(
    <SafeAreaView>
      <MainContainer>
        {user &&
          <View>
            <MainText>Detalhes de {user.name}</MainText>
            <InfoDisplay title="Nome"value={user.name}/>
            <InfoDisplay title="Email"value={user.email}/>
            <InfoDisplay title="Telefone"value={user.phone}/>
            <InfoDisplay title="Data de nascimento"value={user.birthDate}/>
            <InfoDisplay title="Cargo"value={user.role}/>
          </View>
        }
        {error && <Text>{error}</Text>}
        {loading && <LoadingLayer text={"Buscando informações..."}/>}
      </MainContainer>
    </SafeAreaView>
  )
}