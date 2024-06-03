import React from "react";

// Customizable Area Start
import ReactToPrint from "react-to-print";
// Customizable Area End

import PrintController, { Props, configJSON } from "./PrintController";

export default class Print extends PrintController {
  // Customizable Area Start
  print: any = React.createRef();
  // Customizable Area End

  constructor(props: Props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <button style={{ margin: 20 }}>Print this out!</button>;
          }}
          content={() => this.print}
        />
        <div
          style={{
            backgroundColor: "#6200EE",
            height: "100vh",
            display: "flex-column",
            alignItems: "center",
            justifyContent: "center",
          }}
          ref={(el) => (this.print = el)}
        >
          <div>
            <p style={{ color: "#ffffff", fontSize: 50, textAlign: "center" }}>
              Welcome to builder.ai
            </p>
          </div>
          <div>
            <p
              style={{
                color: "#ffffff",
                fontSize: 20,
                textAlign: "center",
                margin: 30,
              }}
            >
              Help anyone to build and run software So we make it easy and
              remove all the issues that usually put people off. That's how we
              won ‘Hottest AI Startup’ at the 2020 Europas, and ‘Best COVID-19
              Innovation for Recovery’ at CogX 2020. We also made the Inc 5,000
              list of Fastest Growing Companies in America. Crazy statistic,
              isn’t it? 78% of software projects started by small and medium
              businesses fail1. Our founders were also let down by developers –
              it’s why we’re here. Their answer was an assembly line of reusable
              parts (features like login, Live Chat or shopping cart). Tell us
              about your idea and AI suggests ones you might need. Our AI also
              manages the human specialists who’ll customise these features, so
              they fit your idea perfectly. Software as easy as ordering pizza
              isn’t just about our no-code, open-to-everyone way of building.
              You also don’t worry that your pizza delivery driver is going to
              turn up 3 months late demanding extra cash for a cold burrito. The
              automation we’ve added means (unlike agencies, DevShops, internal
              engineering teams or freelancers) you can rely on our delivery
              dates, costs and the quality of our code. You also get a dedicated
              expert who’ll manage your entire project.
            </p>
          </div>
        </div>
      </div>
    );
    // Customizable Area End
  }
}

// Customizable Area Start
const webStyle = {
  buttonStyle: {
    width: "100%",
    height: "45px",
    marginTop: "40px",
    border: "none",
    backgroundColor: "rgb(98, 0, 238)",
  },
};
// Customizable Area End
