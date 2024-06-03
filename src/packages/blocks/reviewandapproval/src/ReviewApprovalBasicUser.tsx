import React from "react";

// Customizable Area Start
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	ActivityIndicator,
	TextInput,
	TouchableOpacity,
	Text,
} from "react-native";
import {CommentableTypes} from "./common";
import RNPickerSelect from "react-native-picker-select";
// Customizable Area End

import ReviewApprovalBasicUserController, {Props} from "./ReviewApprovalBasicUserController";
export const config = require("./config");

export default class ReviewApprovalBasicUser extends ReviewApprovalBasicUserController {
	constructor(props: Props) {
		super(props);
		// Customizable Area Start
		// Customizable Area End
	}

	render() {
		// Customizable Area Start
		return (
			<ScrollView
				testID="ReviewApprovalView"
				keyboardShouldPersistTaps="handled"
				style={styles.container}
			>
				<TouchableWithoutFeedback
					testID="ReviewApprovalViewTouchable"
					onPress={() => {
						this.hideKeyboard();
					}}
				>
					<View>
						{this.state.loading ? (
							<ActivityIndicator style={styles.loading} size="large" testID="loader"/>
						) : null}
						<View style={styles.contentContainer}>
							<TextInput
								testID="reviewableIdInput"
								keyboardType="number-pad"
								placeholder={config.placeHolderReviewableIdInputTxt}
								value={this.state.reviewableIdInput}
								onChangeText={this.onReviewableIdInputChange}
								style={styles.inputContainer}
							/>
							<Text style={styles.inputLabel}>
								{config.commentableTypeLabel}
							</Text>
							<View
								style={styles.pickerContainer}
								testID="commentableTypePicker"
							>
								<RNPickerSelect
									style={{
										viewContainer: styles.pickerView,
										placeholder: styles.pickerPlaceholder,
										inputIOS: styles.pickerSelected,
										inputAndroid: styles.pickerSelected,
									}}
									placeholder={{
										label: config.placeHolderCommentableTypesTxt,
									}}
									value={this.state.commentableType}
									onValueChange={this.onCommentableTypeChange}
									items={Object.entries(CommentableTypes).map(([_, value]) => ({
										label: value === config.commentableTypeComment ? config.comment : config.post,
										value,
									}))}
								/>
							</View>
							<TouchableOpacity
								testID="submitBtn"
								onPress={this.onSubmit}
								style={styles.button}
							>
								<Text style={styles.buttonTxt}>{config.submitBtnTxt}</Text>
							</TouchableOpacity>
							{this.state.resultMessage !== null && (
								<Text style={styles.resultMessageTxt} testID="resultMessageTxt">
									{this.state.resultMessage}
								</Text>
							)}
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		);
		// Customizable Area End
	}
}

// Customizable Area Start
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		marginLeft: "auto",
		marginRight: "auto",
		width: "100%",
		maxWidth: 650,
		backgroundColor: "#ffffffff",
	},
	flex: {
		flex: 1,
	},
	loading: {
		flex: 1,
		opacity: 1,
	},
	contentContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		paddingTop: 50,
		paddingBottom: 30,
	},
	inputContainer: {
		width: "100%",
		fontSize: 16,
		textAlign: "left",
		borderWidth: 1,
		borderColor: "#767676",
		borderRadius: 3,
		marginTop: 10,
		padding: 10,
	},
	pickerContainer: {
		padding: 0,
		margin: 0,
		width: "100%",
		height: 50,
		flex: 1,
	},
	pickerView: {
		width: "100%",
		fontSize: 16,
		textAlign: "left",
		borderWidth: 1,
		borderColor: "#767676",
		borderRadius: 3,
		marginTop: 10,
	},
	pickerPlaceholder: {
		color: "#76767675",
		fontSize: 16,
		padding: 10,
	},
	pickerSelected: {
		color: "black",
		fontSize: 16,
		padding: 10,
	},
	button: {
		backgroundColor: config.btnColor,
		height: "100%",
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "flex-start",
		borderRadius: 10,
		marginTop: 60,
		maxHeight: 50,
	},
	buttonTxt: {
		color: "#ffffff",
		alignSelf: "center",
		fontSize: 16,
	},
	inputLabel: {
		fontSize: 16,
		color: "#767676",
		alignSelf: "flex-start",
		marginTop: 20,
	},
	resultMessageTxt: {
		fontSize: 16,
		color: "#767676",
		marginTop: 20,
	},
});
// Customizable Area End
