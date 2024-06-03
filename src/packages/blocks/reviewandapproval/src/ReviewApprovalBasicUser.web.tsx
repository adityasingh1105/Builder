import React from "react";

// Customizable Area Start
import {
	Container,
	Box,
	Button,
	Input,
	Typography,
	CircularProgress,
	Grid,
} from "@material-ui/core";
import Select from "react-select";
import {CommentableTypes} from "./common";
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
			<Container style={styles.container}>
				{this.state.loading ? (
					<CircularProgress style={styles.loading} size="large" data-testid="loader"/>
				) : null}
				<Input
					data-testid="reviewableIdInput"
					placeholder={config.placeHolderReviewableIdInputTxt}
					value={this.state.reviewableIdInput}
					onChange={(e) => this.onReviewableIdInputChange(e.target.value)}
					style={styles.inputContainer}
				/>
				<Typography
					style={styles.inputLabel}
					variant="subtitle1"
					component="div"
				>
					{config.commentableTypeLabel}
				</Typography>
				<Box style={styles.pickerContainer}>
					<Select
						data-testid="commentableTypePicker"
						options={Object.keys(CommentableTypes).map((key) => ({
							value: CommentableTypes[key as never],
							label:
								CommentableTypes[key as never] === config.commentableTypeComment
									? config.comment
									: config.post,
						}))}
						defaultValue={
							this.state.commentableType === config.commentableTypeComment
								? config.comment
								: config.post
						}
						onInputChange={this.onCommentableTypeChange}
					/>
				</Box>
				<Grid container style={styles.contentContainer} direction="column">
					<Button
						onClick={this.onSubmit}
						style={styles.button}
						data-testid="submitBtn">
						{config.submitBtnTxt}
					</Button>
					{this.state.resultMessage !== null && (
						<Typography
							data-testid="resultMessageTxt"
							style={styles.resultMessageTxt}
							variant="subtitle1"
							component="div"
							align="center"
						>
							{this.state.resultMessage}
						</Typography>
					)}
				</Grid>
			</Container>
		);
		// Customizable Area End
	}
}

// Customizable Area Start
const styles = {
	container: {
		flex: 1,
		padding: 16,
		marginLeft: "auto",
		marginRight: "auto",
		width: "100%",
		maxWidth: 650,
		backgroundColor: "#ffffffff",
	},
	loading: {
		flex: 1,
		opacity: 1,
	},
	inputContainer: {
		flex: 1,
		width: "100%",
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#767676",
		borderRadius: 3,
		padding: 5,
		marginTop: 10,
	},
	pickerContainer: {
		padding: 0,
		marginTop: 20,
		margin: 0,
		width: "100%",
		height: 50,
	},
	pickerPlaceholder: {
		color: "#76767675",
		fontSize: 16,
	},
	button: {
		backgroundColor: config.btnColor,
		height: "100%",
		paddingHorizontal: 15,
		alignItems: "center",
		alignSelf: "center",
		borderRadius: 10,
		marginTop: 20,
		maxHeight: 50,
		color: "#ffffff",
	},
	buttonTxt: {
		color: "#ffffff",
		alignSelf: "center",
		fontSize: 14,
	},
	inputLabel: {
		fontSize: 14,
		color: "#767676",
		alignSelf: "flex-start",
		marginTop: 20,
	},
	resultMessageTxt: {
		fontSize: 14,
		color: "#767676",
		marginTop: 20,
	},
	contentContainer: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		display: "flex",
	},
};
// Customizable Area End
