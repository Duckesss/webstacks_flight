import React, { useState } from "react";
import { Text, TouchableOpacityProps, View, ViewProps, TouchableOpacity, FlatList } from "react-native";
import { ListaVoo } from "../../interfaces";
import styles from "./styles";
import Utils from "../../Utils"
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
interface ListaVooProps{
    listaVoo:ListaVoo[];
    gridNumber: number;
    acao:boolean
    onPress?: (voo : ListaVoo) => void
}

export function VooList(props : ListaVooProps){
    type CollapseIcon = "expand-less" | "expand-more"
	const [collapseIcon, setCollapseIcon] = useState<CollapseIcon>("expand-more");
    return <FlatList
        style={styles.container}
        keyExtractor={(_, index) => String(index)}
        data={props.listaVoo}
        numColumns={props.gridNumber}
        key={props.gridNumber}
        renderItem={voo => (
            <Collapse style={styles.background} onToggle={(collapsed : boolean) => {
                if(collapsed){
                    setCollapseIcon("expand-less")
                }else{
                    setCollapseIcon("expand-more")
                }
            }}>
                <CollapseHeader>
                     <View style={styles.title}>
                         <Text style={styles.titleText}>
                             {voo.item.destination.city} - {Utils.formatISO(voo.item.departure1, "dd/MM/yyyy")}
                         </Text>
                         <Text>
                            {(<Icon size={25} color={"white"} name={collapseIcon}/>)}
                         </Text>
                     </View>
                </CollapseHeader>
                <CollapseBody style={styles.body}>
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
                </CollapseBody>
            </Collapse>
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
        <TouchableOpacity activeOpacity={0.6} onPress={() => props.onPress()}>
            {(<Icon size={45} color={"#7cc79b"} name={"shopping-cart"}/>)}
        </TouchableOpacity>
    )
}

