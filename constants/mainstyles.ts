import { StyleSheet } from 'react-native';
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const ICON_SIZE = width * 0.25;

export const commonStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerButton: {
    backgroundColor: "rgba(92, 92, 92, 0.3)",
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
   button: {
    flex: 1,
    backgroundColor: "rgba(47, 43, 43, 0.5)",
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00bbff',
    borderRadius: 8,
    padding: 8,
    backgroundColor: '#93e4fd',
    marginHorizontal: 5
  },
  label: {
    fontWeight: "bold",
    fontSize: 16
  },
  errorContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(255, 123, 123, 0.1)",
    borderColor: '#ff2b2b',
  },
  notFoundContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(47, 43, 43, 0.1)",
    alignItems: "center",
    fontSize: 16
  },
  mainDataContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 8,
    gap: 8,
  },
   dataContainer: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: '#00bbff',
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#93e4fd",
  },
  dataLabel: {
    borderRadius: 35,
    backgroundColor: "rgba(47, 43, 43, 0.1)",
    margin: 8, 
    padding: 5,
    fontWeight: "bold",
  },
  dataText: {
    fontWeight: "semibold",
  },
});

export const conditionStyles = StyleSheet.create({
 mainLabel: {
    borderRadius: 35,
    backgroundColor: "rgba(47, 43, 43, 0.1)",
    margin: 8, 
    padding: 5,
    fontWeight: "bold",
    fontSize: 20
  },
  subLabel: {
    borderRadius: 35,
    backgroundColor: "rgba(47, 43, 43, 0.1)",
    margin: 8, 
    padding: 5,
    fontWeight: "bold",
    fontSize: 18
  },
})

export const homeStyles = StyleSheet.create({
  searchLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  imageContainer: {
    backgroundColor: "rgba(47, 43, 43, 0.1)",
    margin: 8, 
    padding: 10,
    borderRadius: 35,
    alignItems: "center"
  },
  image: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    resizeMode: "contain",
  },
  activityIndicatorContainer: {
    paddingTop: 30,
    alignItems: "center"
  },
  activityIndicatorText: {
    marginTop: 10,
    fontSize: 16
  }
});
