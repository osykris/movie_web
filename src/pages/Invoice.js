import React from "react";
import { Page, Document, StyleSheet } from "@react-pdf/renderer";
import PDFTitle from "../components/pdf/PDFTitle";
import PDFItemsTable from "../components/pdf/PDFItemsTable";
import PDFThankYouMsg from "../components/pdf/PDFThankYouMsg";

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 50,
        paddingRight: 50,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
});

const PdfDocument = ({ productData }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                <PDFTitle title={'Product'} />
                <PDFItemsTable product={productData} />
                <PDFThankYouMsg />
            </Page>
        </Document>
    );
}

export default PdfDocument;