import {IBlock} from "../../../framework/src/IBlock";
import {Message} from "../../../framework/src/Message";
import {BlockComponent} from "../../../framework/src/BlockComponent";
import MessageEnum, {
	getName,
} from "../../../framework/src/Messages/MessageEnum";
import {runEngine} from "../../../framework/src/RunEngine";
// Customizable Area Start
import {CommentableTypes} from "./common";
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
	reviewableIdInput: string;
	commentableType:
		| typeof CommentableTypes[keyof typeof CommentableTypes]
		| null;
	resultMessage: string | null;
	// Customizable Area End
}

interface SS {
	id: string;
	// Customizable Area Start
	// Customizable Area End
}

export default class ReviewApprovalBasicUserController extends BlockComponent<Props,
	S,
	SS> {
	// Customizable Area Start
	apiReviewApprovalCreateApiCallId: string = "";
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
			token: "",
			reviewableIdInput: "",
			commentableType: null,
			resultMessage: null,
			// Customizable Area End
		};
		runEngine.attachBuildingBlock(this as IBlock, this.subScribedMessages);

		// Customizable Area Start
    	// Customizable Area End
	}

	// Customizable Area Start
	async componentDidMount() {
		super.componentDidMount();
		if(!this.isPlatformWeb()) {
			this.props.navigation.addListener("willFocus", () => {
				this.getToken();
			});
		} else {
			this.getToken();
		}
	}

	async componentWillUnmount() {
		if(!this.isPlatformWeb()) {
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

	onReviewableIdInputChange = (text: string) => {
		this.setState({
			reviewableIdInput: text.replace(/\D/g, ""),
		});
	};

	onCommentableTypeChange = (commentableType: string | null) => {
		this.setState({
			commentableType,
		});
	};

	onSubmit = () => {
		this.setState(
			{
				loading: true,
			},
			() => {
				const header = {
					"Content-Type": configJSON.reviewApprovalApiContentType,
					token: this.state.token,
				};
				const requestMessage = new Message(
					getName(MessageEnum.RestAPIRequestMessage)
				);
				this.apiReviewApprovalCreateApiCallId = requestMessage.messageId;
				requestMessage.addData(
					getName(MessageEnum.RestAPIResponceEndPointMessage),
					configJSON.reviewApprovalAPiEndPoint
				);
				requestMessage.addData(
					getName(MessageEnum.RestAPIRequestHeaderMessage),
					JSON.stringify(header)
				);
				requestMessage.addData(
					getName(MessageEnum.RestAPIRequestMethodMessage),
					configJSON.reviewApprovalCreateApiMethodType
				);
				requestMessage.addData(
					getName(MessageEnum.RestAPIRequestMessage),
					JSON.stringify({
						review_and_approval: {
							reviewable_id: parseInt(this.state.reviewableIdInput),
							reviewable_type: this.state.commentableType,
						},
					})
				);
				runEngine.sendMessage(requestMessage.id, requestMessage);
			}
		);
	};

	async receive(from: string, message: Message) {
		switch (message.id) {
			case getName(MessageEnum.SessionResponseMessage):
				let token = message.getData(getName(MessageEnum.SessionResponseToken));
				this.setState({
					token: token,
				});
				break;

			case getName(MessageEnum.RestAPIResponceMessage):
				const apiRequestCallId = message.getData(
					getName(MessageEnum.RestAPIResponceDataMessage)
				);

				const responseJson = message.getData(
					getName(MessageEnum.RestAPIResponceSuccessMessage)
				);

				const errorResponse = message.getData(
					getName(MessageEnum.RestAPIResponceErrorMessage)
				);

				if(apiRequestCallId != null) {
					if(
						apiRequestCallId === this.apiReviewApprovalCreateApiCallId &&
						responseJson !== undefined
					) {
						const arrayHolder = responseJson.data;

						if(arrayHolder && arrayHolder.length !== 0) {
							this.setState({
								loading: false,
								resultMessage: responseJson.meta.message,
							});
						} else {
							this.setState({
								resultMessage: null,
								loading: false,
							});
							this.parseApiErrorResponse(responseJson);
						}
					}

					// Check Error Response
					this.parseApiCatchErrorResponse(errorResponse);
				}
		}
	}
	// Customizable Area End
}
