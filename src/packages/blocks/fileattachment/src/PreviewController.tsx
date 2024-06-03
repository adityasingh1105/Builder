import { BlockComponent } from "../../../framework/src/BlockComponent";
const urlToBlob = require("urltoblob-ext");

export interface Props {
  visible: boolean;
  mimeType: string;
  src: string;
  onClose: () => void;
}

interface S {
  visible: boolean;
  blobUrl: string;
}

interface SS {
  id: any;
}

export default class PreviewController extends BlockComponent<Props, S, SS> {
  constructor(props: Props) {
    super(props);

    this.state = {
      visible: false,
      blobUrl: "",
    };
  }

  async componentDidUpdate(prevProps: Props) {
    if (this.props.visible !== prevProps.visible) {
      this.setState({ visible: this.props.visible });
    }

    if (this.props.src !== prevProps.src) {
      const blob = await urlToBlob.urlToBlob(this.props.src);
      const fileUrl = window.URL.createObjectURL(blob);
      this.setState({ blobUrl: fileUrl });
    }
  }

  async componentDidMount() {
    super.componentDidMount();
  }
}
