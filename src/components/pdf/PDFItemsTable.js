import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#3778C2',
    },
});

const PDFItemsTable = ({ product }) => (
    <View style={styles.tableContainer}>
        <TableHeader />
        <TableRow items={product} />
    </View>
);

export default PDFItemsTable;