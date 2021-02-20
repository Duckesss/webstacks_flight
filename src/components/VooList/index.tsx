import React, { useState } from "react";
import { RefreshControl, Text, TouchableOpacityProps, View, ViewProps, TouchableOpacity, FlatList } from "react-native";
import { ListaVoo } from "../../interfaces";
import styles from "./styles";
import Utils from "../../Utils"
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { Collapse } from "../Collapse";

interface Props{
    listaVoo:ListaVoo[];
    gridNumber: number;
    repetidos?:{
		[key:string]:number;
    }
    acao: boolean;
    onPress?: (voo : ListaVoo) => void
    onRefresh:() => void
}
interface Selected{
    [key: string]: boolean;
}
export function VooList(props : Props){
    const [refreshing, setRefreshing] = React.useState(false);
    const collapseIcon = ["expand-less","expand-more"]
	const [selected, setSelected] = useState<Selected>({} as Selected);
    return <FlatList
        refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={async () => {
                    setRefreshing(true);
                    await props.onRefresh()
                    setRefreshing(false);
                }}
            />
        }
        style={styles.container}
        keyExtractor={(_, index) => String(index)}
        data={props.listaVoo}
        numColumns={props.gridNumber}
        key={props.gridNumber}
        renderItem={voo => (
            <Collapse
                style={styles.background}
                header={(
                    <View style={styles.title}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>
                                {voo.item.origin.city} {'até'} {voo.item.destination.city}
                                {props.repetidos? ` (${props.repetidos[voo.item._id]})` : false}
                            </Text>
                            <Text style={styles.titleText}>
                                {Utils.formatISO(voo.item.departure1, "dd/MM/yyyy")}
                            </Text>
                        </View>
                        <Text>
                            {(<Icon size={25} color={"white"} name={selected[voo.item._id]? collapseIcon[0] : collapseIcon[1] }/>)}
                        </Text>
                    </View>
                )}
                body={(
                    <View style={styles.body}>
                        <View style={styles.content}>
                            <Text style={{color: "white", fontSize: 16}}>
                                Preço: {Utils.moneyBR(voo.item.faresMoney)}
                            </Text>
                            <Text style={{color: "white", fontSize: 16}}>
                                Confirmados: {voo.item.passengers}
                            </Text>
                            <View style={styles.lastItem}>
                                <Text style={{color: "white", fontSize: 16}}>
                                    Espaços livres: {voo.item.totalPassengers - voo.item.passengers}
                                </Text>
                                <Text style={styles.botaoComprar}> 
                                    {
                                        props.acao && 
                                        <BotaoComprar onPress={() => props.onPress && props.onPress(voo.item)} />
                                    }
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
                onToggle={(collapsed : boolean) => {
                    if(collapsed){
                        let obj = {...selected}
                        obj[voo.item._id] = true
                        setSelected(obj)
                    }else{
                        let obj = {...selected}
                        obj[voo.item._id] = false
                        setSelected(obj)
                    }
                }}
            />
            )
        }
    />
}
interface VooContainerInterface{
    onPress: () => void
}
type PropsVooContainer = React.PropsWithChildren<ViewProps|TouchableOpacityProps> & VooContainerInterface

function BotaoComprar(props : PropsVooContainer){
    return (
        <TouchableOpacity activeOpacity={0.1} onPress={() => props.onPress()}>
            {(<Icon size={45} color={"#7cc79b"} name={"shopping-cart"}/>)}
        </TouchableOpacity>
    )
}

