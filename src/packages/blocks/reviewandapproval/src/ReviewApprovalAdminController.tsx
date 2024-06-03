import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import {BlockComponent} from "../../../framework/src/BlockComponent";
import MessageEnum, {
	getName,
} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";
// Customizable Area Start
import {ReviewApprovalResponseDataType, ApprovalType} from "./common";
// Customizable Area End


const navigation = require("react-navigation");
export const configJSON = require("./config");

export interface Props {
	navigation: typeof navigation;
	id: string;
	// Customizable Area Start
	// Customizable Area End
}

interface S {
	// Customizable Area Start
	loading: boolean;
	token: string;
	searchTxt: string;
	data: ReviewApprovalResponseDataType[];
	// Customizable Area End
}

interface SS {
	// Customizable Area Start
	id: string;
	// Customizable Area End
}

export default class ReviewApprovalAdminController extends BlockComponent<Props,
	S,
	SS> {
	// Customizable Area Start
	apiReviewApprovalShowApiCallId: string = "";
	apiReviewApprovalUpdateApiCallId: string = "";
	// Customizable Area End

	constructor(props: Props) {
		super(props);
		this.receive = this.receive.bind(this);

		this.subScribedMessages = [
			// Customizable Area Start
			getName(MessageEnum.RestAPIResponceMessage),
			getName(MessageEnum.SessionResponseMessage),
			// Customizable Area End
		];

		this.state = {
			// Customizable Area Start
			loading: false,
			data: [],
			searchTxt: "",
			token: "",
			// Customizable Area End
		};

		runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);
		// Customizable Area Start
    	// Customizable Area End
	}

	// Customizable Area Start
	async componentDidMount() {
		super.componentDidMount();
		if (!this.isPlatformWeb()) {
			this.props.navigation.addListener("willFocus", () => {
				this.getToken();
			});
		} else {
			this.getToken();
		}
	}

	async componentWillUnmount() {
		if (!this.isPlatformWeb()) {
			this.props.navigation.removeListener("willFocus", () => {
				this.getToken();
			});
		}
	}

	getToken = () => {
		const msg: Message = new Message(
			getName(MessageEnum.SessionRequestMessage)
		);
		this.send(msg);
	};

	onChangeSearchTxt = (searchTxt: string) => {
		this.setState({searchTxt});
	};

	getReviews = (): boolean => {
		if (!this.state.loading) {
			this.setState({loading: true});
		}
		const header = {
			"Content-Type": configJSON.reviewApprovalApiContentType,
			token: this.state.token,
		};
		const requestMessage = new Message(
			getName(MessageEnum.RestAPIRequestMessage)
		);
		this.apiReviewApprovalShowApiCallId = requestMessage.messageId;
		requestMessage.addData(
			getName(MessageEnum.RestAPIResponceEndPointMessage),
			configJSON.reviewApprovalAPiEndPoint + this.state.searchTxt
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestHeaderMessage),
			JSON.stringify(header)
		);
		requestMessage.addData(
			getName(MessageEnum.RestAPIRequestMethodMessage),
			configJSON.reviewApprovalShowApiMethodType
		);
		runEngine.sendMessage(requestMessage.id, requestMessage);
		return true;
	};

	async receive(from: string, message: Message) {
		if (message.id === getName(MessageEnum.SessionResponseMessage)) {
			let token = message.getData(getName(MessageEnum.SessionResponseToken));
			this.setState(
				{
					token: token,
					loading: true,
				},
				() => this.getReviews()
			);
		} else if (message.id === getName(MessageEnum.RestAPIResponceMessage)) {
			const apiRequestCallId = message.getData(
				getName(MessageEnum.RestAPIResponceDataMessage)
			);

			const responseJson = message.getData(
				getName(MessageEnum.RestAPIResponceSuccessMessage)
			);

			const errorResponse = message.getData(
				getName(MessageEnum.RestAPIResponceErrorMessage)
			);

			if (apiRequestCallId != null && responseJson != null) {
				if (apiRequestCallId === this.apiReviewApprovalShowApiCallId) {
					const arrayHolder = responseJson.data;

					if (arrayHolder?.length > 0) {
						this.setState({
							data: arrayHolder,
							loading: false,
						});
						return;
					} else if (typeof arrayHolder === "object") {
						this.setState({
							data: [arrayHolder],
							loading: false,
						});
						return;
					}
					this.parseApiCatchErrorResponse(configJSON.noReviewsFound);
				} else if (
					apiRequestCallId === this.apiReviewApprovalUpdateApiCallId
				) {
					const dataHolder: ReviewApprovalResponseDataType = responseJson.data;

					if (dataHolder) {
						const data = this.state.data;
						data[data.findIndex((item) => item.id === dataHolder.id)] =
							dataHolder;
						this.setState({
							data,
							loading: false,
						});
						return;
					}
					this.setState({
						loading: false,
					});
					this.parseApiErrorResponse(responseJson);
					return;
				}
			}

			// Check Error Response
			this.parseApiCatchErrorResponse(errorResponse);
		}
	}

	onReviewApproval = (
		item: ReviewApprovalResponseDataType,
		approval_status: typeof ApprovalType[keyof typeof ApprovalType]
	) => {
		this.setState({loading: true}, () => {
			if (approval_status === ApprovalType.rejected) {
				this.setState({
					loading: false,
					data: this.state.data.filter((i) => i.id !== item.id),
				});
				return;
			}
			const header = {
				"Content-Type": configJSON.reviewApprovalApiContentType,
				token: this.state.token,
				// REVIEW: This is a temporary fix for the Stoplight Mock API to accept the request with a success response
				prefer: "code=200, example=success",
			};
			const requestMessage = new Message(
				getName(MessageEnum.RestAPIRequestMessage)
			);
			this.apiReviewApprovalUpdateApiCallId = requestMessage.messageId;
			requestMessage.addData(
				getName(MessageEnum.RestAPIResponceEndPointMessage),
				configJSON.reviewApprovalAPiEndPoint + item.id
			);
			requestMessage.addData(
				getName(MessageEnum.RestAPIRequestHeaderMessage),
				JSON.stringify(header)
			);
			requestMessage.addData(
				getName(MessageEnum.RestAPIRequestMethodMessage),
				configJSON.reviewApprovalUpdateApiMethodType
			);
			requestMessage.addData(
				getName(MessageEnum.RestAPIRequestMessage),
				JSON.stringify({
					review_and_approval: {approval_status},
				})
			);
			runEngine.sendMessage(requestMessage.id, requestMessage);
		});
	};
	// Customizable Area End
}
