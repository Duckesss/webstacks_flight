import React from "react";
import { Text, TouchableOpacityProps, View, ViewProps, TouchableOpacity } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import { ListaVoo } from "../../interfaces/ListaVoo";
import styles from "./styles";
import { moneyBR } from "../../Utils"
import { format,parseISO } from "date-fns";

interface ListaVooProps{
    listaVoo:ListaVoo[];
    gridNumber: number;
    acao:boolean
    onPress?: () => void
}

export default function VooList(props : ListaVooProps){
    return <FlatList
        style={styles.container}
        keyExtractor={(_, index) => String(index)}
        data={props.listaVoo}
        numColumns={props.gridNumber}
        key={props.gridNumber}
        renderItem={voo => (
                <View style={styles.background}>
                    <View style={styles.title}>
                        <Text style={{color: "white", fontSize: 20}}>
                            {voo.item.destination.city}	
                        </Text>
                    </View>
                    <VooContainer acao={props.acao} onPress={props.onPress} style={styles.content}>
                        <Text style={{color: "white", fontSize: 16}}>
                            Preço: {moneyBR(voo.item.faresMoney)}
                        </Text>
                        <Text style={{color: "white", fontSize: 16}}>
                            Confirmados: {voo.item.passengers}
                        </Text>
                        <Text style={{color: "white", fontSize: 16}}>
                            Espaços livres: {voo.item.totalPassengers - voo.item.passengers}
                        </Text>
                        <Text style={{color: "white", fontSize: 16}}>
                            Saída: {format(parseISO(voo.item.departure1), "dd/MM/yyyy")}
                        </Text>
                    </VooContainer>
                </View>
            )
        }
    />
}

interface VooContainerInterface{
    acao:boolean
    onPress?: () => void
}

type PropsVooContainer = React.PropsWithChildren<ViewProps|TouchableOpacityProps> & VooContainerInterface
function VooContainer(props : PropsVooContainer){
    if(props.acao){
        return (
            <TouchableOpacity style={props.style} onPress={props.onPress}>
                {props.children}
            </TouchableOpacity>
        )
    }else{
        return (
            <View style={props.style}>
                {props.children}
            </View>
        )
    }
}

