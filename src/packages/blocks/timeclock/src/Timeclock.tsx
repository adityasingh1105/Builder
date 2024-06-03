import React from "react";

// Customizable Area Start
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import TimeclockController, { Props, configJSON } from "./TimeclockController";
import { scaledSize } from "../../../framework/src/Utilities";

export default class Timeclock extends TimeclockController {
  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    const startGameButton = (
      <View style={styles.startGameButtonContainer}>
        <TouchableOpacity
          style={styles.startGameButton}
          onPress={() => this.onStartGame()}
          testID="testStartGameButton"
        >
          <Text style={styles.startGameButtonText}>
            {configJSON.startGameButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );

    const startGameContainer = (
      <View style={styles.startGameContainer}>
        <View style={styles.startGameTimeTextView}>
          <Text style={styles.startGameTimeText}>
            {this.convertHHMMSS(this.state.gameTime)}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.startGameButton}
          onPress={() => this.onFinishGame()}
          testID="testFinishGameButton"
        >
          <Text style={styles.startGameButtonText}>
            {configJSON.finishGameButtonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    );

    const startGameScreenView = () => {
      if (this.state.dataLoading) {
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      } else {
        if (this.state.isStartGame) {
          return startGameContainer;
        } else {
          return startGameButton;
        }
      }
    };
    // Merge Engine - render - Start
    return (
      <View style={styles.container}>
        {startGameScreenView()}
        {this.state.gameMessage !== "" && (
          <View style={styles.snackViewContainer}>
            <Text style={styles.messageText}>{this.state.gameMessage}</Text>
          </View>
        )}
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  startGameButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  startGameButton: {
    paddingHorizontal: scaledSize(10),
    paddingVertical: scaledSize(10),
    backgroundColor: "#2a9df4",
    borderRadius: scaledSize(10),
  },
  startGameButtonText: {
    fontSize: scaledSize(20),
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  startGameContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  startGameTimeTextView: {
    marginVertical: scaledSize(20),
  },
  startGameTimeText: {
    alignSelf: "center",
    fontSize: scaledSize(30),
    color: "#2a9df4",
    textAlign: "center",
    fontWeight: "bold",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  snackViewContainer: {
    position: "absolute",
    top: scaledSize(10),
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#138636",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    height: scaledSize(40),
    maxWidth: scaledSize(300),
    paddingHorizontal: scaledSize(10),
    elevation: 25,
    borderRadius: scaledSize(5),
    opacity: 0.7,
  },
  messageText: {
    fontSize: scaledSize(20),
    color: "#FFF",
  },
});
// Customizable Area End
