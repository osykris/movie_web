import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#3778C2',
        backgroundColor: '#3778C2',
        color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    category: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    name: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
});

const TableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.price}>Price</Text>
        <Text style={styles.category}>Category</Text>
        <Text style={styles.description}>Description</Text>
    </View>
);

export default TableHeader;