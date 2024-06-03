import React from "react";
import PreviewController, { Props } from "./PreviewController";

const webStyles = {
  opened: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: "100",
    background: "rgba(1, 1, 1, 0.6)",
    top: "0px",
    left: "0px",
    alignItems: "center",
    textAlign: "-webkit-center",
    display: "flex",
    justifyContent: "center",
  },
  closed: {
    display: "none",
  },
  content: {
    width: "fit-content",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default class Preview extends PreviewController {
  constructor(props: Props) {
    super(props);
  }

  renderImage = () => {
    return <img key={this.props.src} src={this.props.src} />;
  };

  renderVideo = () => {
    return (
      <video
        key={this.props.src}
        style={{ height: "480px" }}
        id="video"
        controls
        width="600"
        autoPlay>
        <source id="mp4" src={this.props.src} />
        <p>Your user agent does not support the HTML5 Video element.</p>
      </video>
    );
  };

  renderAudio = () => {
    return (
      <audio key={this.props.src} src={this.props.src} controls autoPlay />
    );
  };

  renderContent = () => {
    if (!this.props.src || !this.props.visible) {
      return;
    }
    if (
      this.props.mimeType.includes("png") ||
      this.props.mimeType.includes("jpg") ||
      this.props.mimeType.includes("jpeg")
    ) {
      return this.renderImage();
    } else if (
      this.props.mimeType.includes("mp4") ||
      this.props.mimeType.includes("mov")
    ) {
      return this.renderVideo();
    } else if (this.props.mimeType.includes("mp3")) {
      return this.renderAudio();
    } else if (
      this.props.mimeType.includes("pdf") ||
      this.props.mimeType.includes("doc")
    ) {
      return "pdf will be rendered";
    }
  };

  render() {
    return (
      <div
        data-test-id={"previewContainer"}
        style={this.state.visible ? webStyles.opened : webStyles.closed}
        onClick={() => this.props.onClose()}>
        <div
          data-test-id={"contentContainer"}
          style={webStyles.content}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
