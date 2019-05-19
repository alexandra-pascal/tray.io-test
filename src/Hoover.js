import React from "react";
import axios from "axios";

export default class Hoover extends React.Component {
  constructor() {
    super();
    const nullCoordinates = { x: null, y: null };

    this.state = {
      dimensions: nullCoordinates,
      initialPositionOfHover: nullCoordinates,
      locationOfDirts: [],
      drivingInstructions: []
    };
  }

  formatCoordinates(stringCoordinates) {
    const element = stringCoordinates.split(" ");
    return { x: Number(element[0]), y: Number(element[1]) };
  }

  componentDidMount() {
    axios
      .get(`/input.txt`)
      .then(result => {
        const splittedData = result.data.split("\n");
        const dimensions = this.formatCoordinates(splittedData[0]);
        const initialPositionOfHover = this.formatCoordinates(splittedData[1]);
        const locationOfDirts = [
          this.formatCoordinates(splittedData[2]),
          this.formatCoordinates(splittedData[3]),
          this.formatCoordinates(splittedData[4])
        ];
        const drivingInstructions = splittedData[5].split("");

        this.setState({
          dimensions,
          initialPositionOfHover,
          locationOfDirts,
          drivingInstructions
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    return <div>Hoover test</div>;
  }
}
