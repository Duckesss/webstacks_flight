import React from "react";
import { Text, View } from "react-native";
import { FlatList, } from "react-native-gesture-handler";
import { ListaVoo } from "../../interfaces/ListaVoo";
import styles from "./styles";
import { moneyBR } from "../../Utils"
import { format,parseISO } from "date-fns";

interface ListaVooProps{
    listaVoo:ListaVoo[];
    gridNumber: number;
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
                    <View style={styles.content}>
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
                    </View>
                </View>
            )
        }
    />
}

