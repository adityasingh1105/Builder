import React from "react";
// Customizable Area Start
export const configLabel = require("./config");
import {
  Container,
  CircularProgress,
  Grid,
  Card,
  Select,
  CardContent,
  Typography,
  FormControl,
  CardMedia,
  Button,
} from "@material-ui/core";
// Customizable Area End
import PrioritiseController from "./PrioritiseController";


export interface ObjProps {
  id: string;
  image_uri: string;
  name: string;
  is_open: boolean;
  priority_type: string;
  priority: number;
  other_priorities: OtherPrioritiesProps[],
}

export interface OtherPrioritiesProps {
  priority: number;
  priorityType: string;
}


export default class Prioritise extends PrioritiseController {

  // Customizable Area Start
  renderLoader() {
    return (
      <div style={bodybg}>
        <Container style={loader_aline}>
          <CircularProgress />
        </Container>
      </div>
    );
  }

  renderEmptyView() {
    return (
      <div style={bodybg}>
        <Container>
          <Grid container spacing={3} style={grid_style}>
            <Grid>
              <h1>{configLabel.labelNoData}</h1>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }

  ListFooter() {
    return (
      <Button
        variant="contained"
        color="primary"
        id="btnSaveTestId"
        onClick={this.apiPostCall}
      >
        {configLabel.labelSave}
      </Button>
    );
  }

  renderRaw() {
    return (
      <div style={bodybg}>
        <Container>
          <Grid container spacing={3} style={grid_style}>
            <Grid>
              {this.ListFooter()}
            </Grid>
          </Grid>
          <Grid container spacing={3} style={grid_style} id="product_grid">
            {this.state.taskList.map((item: ObjProps, index: number) => {
              return (
                <Grid item sm={4} key={item.id.toString()}>
                  <Card style={root}>
                    <CardMedia
                      style={cover}
                      image={item.image_uri}
                      title={configLabel.labelPrioritise}
                    />
                    <div>
                      <CardContent style={content}>
                        <Typography
                          component="h5"
                          variant="h5"
                          style={task_tilte}
                        >
                          {item.name}
                        </Typography>
                        <div style={prioritis_status}>
                          <FormControl>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="select_priority"
                              value={item.priority}
                              onChange={(event) =>this.onChangeSelect(index, event.target.value as string)}
                         
                              autoWidth
                            >
                              <option value={item.priority}>
                                {item.priority_type}
                              </option>
                              {item.other_priorities.map(
                                (iitem: OtherPrioritiesProps, nnumber: number) => {
                                  return (
                                    <option key={nnumber} value={iitem.priorityType}>
                                      {iitem.priorityType}
                                    </option>
                                  );
                                }
                              )}
                            </Select>
                          </FormControl>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
  }

  // Customizable Area End

  render() {
    // Customizable Area Start
    if (this.state.isLoading) {
      return (
        this.renderLoader()
      );
    } else if (!this.state.isLoading && this.state.taskList.length == 0) {
      return (
        this.renderEmptyView()
      );
    } else {
      return (
        this.renderRaw()
      );
    }
    // Customizable Area End
  }
}

// Customizable Area Start
const bodybg = {
  backgroundColor: "#dddadaab",
};
const loader_aline = {
  justifyContent: "center",
  alignItems: "center",
};
const grid_style = {
  marginTop: "25",
  marginBottom: "25",
};
const task_tilte = {
  fontSize: "17",
};
const prioritis_status = {
  marginTop: "25",
};

const root = {
  display: "flex",
};
const details = {
  display: "flex",
  flexDirection: "column",
};
const content = {
  flex: "1 0 auto",
};
const cover = {
  width: 100,
};
// Customizable Area End
