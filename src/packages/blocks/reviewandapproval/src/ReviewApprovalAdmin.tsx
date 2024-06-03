import React from "react";

// Customizable Area Start
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableWithoutFeedback,
	TextInput,
	ActivityIndicator,
	FlatList,
	Text,
	ListRenderItemInfo,
	TouchableOpacity,
} from "react-native";
import BlockHelpers from "../../utilities/src/BlockHelpers";
import {ReviewApprovalResponseDataType, ApprovalType} from "./common";
// Customizable Area End

import ReviewApprovalAdminController, {Props} from "./ReviewApprovalAdminController";

export const config = require("./config");

export default class ReviewApprovalAdmin extends ReviewApprovalAdminController {
	constructor(props: Props) {
		super(props);
		// Customizable Area Start
		// Customizable Area End
	}

	// Customizable Area Start
	renderReviewApprovalItems = ({
		item,
	}: ListRenderItemInfo<ReviewApprovalResponseDataType>) => {
		const isComment =
			item.attributes.reviewable_type === config.commentableTypeComment;
		return (
			<View style={styles.reviewApprovalItem} key={item.id}>
				<View style={styles.flex}>
					{item.attributes.account && (
						<Text
							style={styles.reviewApprovalItemTxt}
							testID="reviewItemAccountName"
						>
							{item.attributes.account.first_name + ", " + item.attributes.account.last_name}
						</Text>
					)}
					<Text style={styles.reviewApprovalItemTxt} testID="reviewItemId">
						{config.reviewableId + ": " + item.attributes.reviewable_id}
					</Text>
					<Text style={styles.reviewApprovalItemTxt} testID="reviewItemType">
						{config.reviewableType + ": " + (item.attributes.reviewable_type === config.commentableTypeComment
							? config.comment
							: config.post)}
					</Text>
					{item.attributes.reviewable && (
						<View testID="reviewableSection">
							<Text style={styles.reviewApprovalItemTxt} testID="reviewableSectionIdText">
								{config.reviewable + " " + (isComment ? config.comment : config.post) + " " + config.id + ": " + item.attributes.reviewable.id}
							</Text>
							<Text style={styles.reviewApprovalItemTxt} testID="reviewableSectionContentText">
								{config.reviewable + " " + (isComment ? config.comment : config.post) + " " + (isComment ? config.message : config.content) + ": " + item.attributes.reviewable.body}
							</Text>
						</View>
					)}
				</View>
				{item.attributes.approval_status === "pending" ? (
					<View style={styles.reviewApprovalActionButtons}>
						<TouchableOpacity
							testID="approveBtn"
							onPress={() => this.onReviewApproval(item, ApprovalType.approved)}
							style={styles.button}
						>
							<Text style={styles.buttonTxt}>{config.approveBtnTxt}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							testID="rejectBtn"
							onPress={() => this.onReviewApproval(item, ApprovalType.rejected)}
							style={styles.button}
						>
							<Text style={styles.buttonTxt}>{config.rejectBtnTxt}</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.reviewApprovalActionButtons}>
						<Text style={styles.reviewApprovalItemTxt} testID="approvalStatus">
							{item.attributes.approval_status.toString().toUpperCase()}
						</Text>
					</View>
				)}
			</View>
		);
	};
	// Customizable Area End

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
						<View style={styles.searchContainer}>
							<TextInput
								placeholder={config.placeHolderSearchTxt}
								returnKeyType="search"
								value={this.state.searchTxt}
								onChangeText={this.onChangeSearchTxt}
								onSubmitEditing={this.getReviews}
								style={styles.inputContainer}
							/>
							<TouchableOpacity onPress={this.getReviews} style={styles.button}>
								<Text style={styles.buttonTxt}>{config.searchBtnTxt}</Text>
							</TouchableOpacity>
						</View>
						{this.state.loading ? (
							<ActivityIndicator style={styles.loading} size="large"/>
						) : null}
						<View style={styles.contentContainer}>
							<FlatList
								testID="reviewApprovalList"
								data={this.state.data}
								showsVerticalScrollIndicator={false}
								extraData={this.state}
								renderItem={this.renderReviewApprovalItems}
								keyExtractor={(_, index) => index.toString()}
								ListEmptyComponent={
									<Text style={styles.noDataTxt}>{config.noReviewsFound}</Text>
								}
							/>
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
		marginTop: 20,
	},
	searchContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	inputContainer: {
		flex: 1,
		flexDirection: "row",
		fontSize: 16,
		textAlign: "left",
		borderWidth: BlockHelpers.isPlatformWeb() ? 0 : 1,
		borderBottomWidth: 1,
		borderColor: "#767676",
		borderRadius: 3,
		padding: 10,
	},
	contentContainer: {
		flex: 1,
		marginTop: 10,
	},
	reviewApprovalItem: {
		flex: 1,
		width: "100%",
		marginTop: 10,
		padding: 5,
		borderWidth: 1,
		borderColor: "#767676",
		flexDirection: "column",
		justifyContent: "space-between",
		borderRadius: 3,
	},
	reviewApprovalItemTxt: {
		fontSize: 16,
	},
	reviewApprovalActionButtons: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginTop: 10,
		minHeight: 40,
	},
	button: {
		backgroundColor: config.btnColor,
		marginLeft: 5,
		height: "100%",
		paddingHorizontal: 15,
		flexDirection: "row",
		borderRadius: 5,
	},
	buttonTxt: {
		color: "#ffffff",
		alignSelf: "center",
		fontSize: 16,
	},
	noDataTxt: {
		fontSize: 16,
		alignSelf: "center",
		color: "#767676",
		marginTop: 20,
	},
});
// Customizable Area End
