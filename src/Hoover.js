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
      drivingInstructions: [],
      lastPosionOfHover: nullCoordinates,
      dirtsCleaned: 0
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
          drivingInstructions,
          lastPosionOfHover: initialPositionOfHover
        });
      })
      .then(() => {
        this.move();
      })
      .catch(error => console.log(error));
  }

  move() {
    this.state.drivingInstructions.forEach(instruction => {
      let { x, y } = this.state.lastPosionOfHover;

      switch (instruction) {
        case "N":
          y++;
          break;
        case "E":
          x++;
          break;
        case "S":
          y--;
          break;
        case "W":
          x--;
          break;
        default:
          console.error("unknown move");
      }

      const newLastPosionOfHover = { x, y };
      let newState = {
        lastPosionOfHover: newLastPosionOfHover
      };
      const dirtFound = this.state.locationOfDirts.find(
        dirt =>
          dirt.x === newLastPosionOfHover.x && dirt.y === newLastPosionOfHover.y
      );

      if (dirtFound) {
        const filteredLocationOfDirts = this.state.locationOfDirts.filter(
          dirt => dirt !== dirtFound
        );
        newState.dirtsCleaned = this.state.dirtsCleaned + 1;
        newState.locationOfDirts = filteredLocationOfDirts;
      }
      this.setState(newState);
    });
  }

  render() {
    return <div>Hoover test</div>;
  }
}
