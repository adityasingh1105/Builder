import React from "react";
//Customizable Area Start
import ActivityFeedController, {
  Props,
  configJSON,
} from "./ActivityFeedController";
import { Box } from "@material-ui/core";
//Customizable Area End
import { ActivityInterface } from "./dataInterface";

export default class ActivityFeed extends ActivityFeedController {
  constructor(props: Props) {
    super(props);
    //Customizable Area Start
    //Customizable Area End
  }

  //Customizable Area Start
  renderActivityList() {
    return this.state.activities.map((activity: ActivityInterface) => {
      return this.renderActivity(activity);
    });
  }

  renderActivity(activity: ActivityInterface) {
    const date = new Date(activity.created_at);
    return (
      <Box sx={style.activityRow} key={`activity${activity.id}`}>
        <span>{activity.trackable_type.split("::")[0]}</span>
        <span>{`${activity.owner.first_name} ${activity.owner.last_name}`}</span>
        <span>{`${date.toDateString()}`}</span>
      </Box>
    );
  }

  renderOptions(opts: string[]) {
    const option = (option: { name: string; value: string }) => (
      <option key={`option-${option.name}`} value={option.value}>
        {option.name}
      </option>
    );

    return [
      option({ name: "All", value: "" }),
      opts.map((optionItem: string) =>
        option({ name: optionItem, value: optionItem })
      ),
    ];
  }

  renderSelect() {
    return (
      <select
        style={style.select}
        onChange={(event) => {
          this.setFilter(event.target.value);
        }}
      >
        {this.renderOptions(this.activityTypes)}
      </select>
    );
  }
  //Customizable Area End

  render() {
    // Customizable Area Start
    return (
      <Box sx={style.wrapper}>
        <Box sx={style.container}>
          <Box sx={style.header}>
            <h2>{configJSON.headerLabel}</h2>
            {this.renderSelect()}
          </Box>
          <Box sx={style.activityList}>
            {this.renderActivityList()}
            <a
              id="loadMoreButton"
              onClick={() => {
                this.getAcitivityData();
              }}
              style={style.loadMore}
            >
              {configJSON.loadLabel}
            </a>
          </Box>
        </Box>
      </Box>
    );
  }
  //Customizable Area End
}

// Customizable Area Start
const style = {
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 16,
    width: "100%",
    maxWidth: 650,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
  },
  activityRow: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  activityList: {
    overflowY: "scroll",
    height: "calc(100vh - 200px)",
  },
  loadMore: {
    cursor: "pointer",
  },
  select: {
    width: 100,
    height: 30,
    border: "1px solid #ccc",
  },
};
//Customizable Area End
