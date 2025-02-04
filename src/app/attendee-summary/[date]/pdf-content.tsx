import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { v4 } from "uuid";

// Define styles with improved layout and modern design
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 40,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color: "#1a1a1a",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 20,
  },
  table: {
    display: "flex",
    width: "100%",
    borderColor: "#e5e7eb",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: 1,
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
    minHeight: 30,
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRightWidth: 1,
    padding: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "#e5e7eb",
    borderRightWidth: 1,
    padding: 8,
  },
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  cellText: {
    fontSize: 9,
    color: "#4b5563",
    // Handle text overflow
    textOverflow: "ellipsis",
    maxWidth: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 8,
    color: "#9ca3af",
    textAlign: "center",
  },
});

type Attendee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

type PDFContentProps = {
  attendees: Attendee[];
  date: string;
};

const PDFContent: React.FC<PDFContentProps> = ({ attendees, date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Attendee List</Text>
          <Text style={styles.subtitle}>Generated on {formattedDate}</Text>
        </View>

        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>NAME</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>EMAIL</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>PHONE</Text>
            </View>
            <View style={styles.tableColHeader}>
              <Text style={styles.headerText}>ADDRESS</Text>
            </View>
          </View>

          {/* Table Body */}
          {attendees.map((attendee) => (
            <View style={styles.tableRow} key={v4()}>
              <View style={styles.tableCol}>
                <Text style={styles.cellText}>
                  {`${attendee.firstName} ${attendee.lastName}`.trim()}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cellText}>{attendee.email}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cellText}>{attendee.phone}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.cellText}>{attendee.address}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated from Attendee Management System • Page 1 of 1
        </Text>
      </Page>
    </Document>
  );
};

export default React.memo(PDFContent);
