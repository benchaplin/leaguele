// Forked from: https://github.com/MateusZitelli/react-bar-chart
import React from "react";
import d3 from "d3";

const merge = function (one, two) {
  return Object.assign({}, one, two);
};

export default class BarChart extends React.Component {
  static defaultProps = { margin: { top: 0, right: 0, bottom: 0, left: 0 } };

  _handleBarClick(element, id) {
    if (this.props.onBarClick) {
      this.props.onBarClick(element, id);
    }
  }

  _renderGraph(props) {
    this._reusableGraph(props);
  }

  _reusableGraph(props) {
    const margin = props.margin;
    const width = props.width;
    const maxWidth = props.maxWidth;
    const height = props.height;

    let svg = d3
      .select(this.svg)
      .attr("width", width + margin.left + margin.right + 90)
      .attr("height", height + margin.top + margin.bottom + 20)
      .append("g");

    const rect = svg.selectAll("rect").data(props.data).enter();

    rect
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => this.x(d.text))
      .attr("height", () => {
        let width = this.x.rangeBand();
        width = maxWidth && width > maxWidth ? maxWidth : width;
        return width;
      })
      .attr("x", 20)
      .attr("width", d => width - this.y(d.value) + 10)
      .attr("fill", "#373961");

    rect
      .append("text")
      .style("fill", "black")
      .style("font-size", "16px")
      .attr("y", d => {
        let width = this.x.rangeBand();
        let padding = width > maxWidth ? width - maxWidth : 0;
        let yPos = this.x(d.text) + 28;
        return maxWidth ? yPos + padding / 2 : yPos;
      })
      .attr("x", d => width - this.y(d.value) + 35)
      .style("style", "label")
      .text(d => d.value);

    rect
      .append("text")
      .style("fill", "black")
      .style("font-size", "16px")
      .attr("y", d => {
        let width = this.x.rangeBand();
        let padding = width > maxWidth ? width - maxWidth : 0;
        let xPos = this.x(d.text) + 28;
        return maxWidth ? xPos + padding / 2 : xPos;
      })
      .attr("text-anchor", "middle")
      .attr("x", 8)
      .style("style", "label")
      .text(d => d.text);
  }

  _defineAxis(props) {
    props.width = props.width - props.margin.left - props.margin.right;
    props.height = props.height - props.margin.top - props.margin.bottom;

    this.x = d3.scale.ordinal().rangeRoundBands([0, props.width], 0.1);
    this.y = d3.scale.linear().range([props.height, 0]);

    this.x.domain(props.data.map(d => d.text));
    this.y.domain([0, d3.max(props.data, d => d.value)]);

    this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    this.yAxis = d3.svg.axis().scale(this.y).orient("left");
  }

  componentDidMount() {
    const props = merge(this.props);
    this._defineAxis(props);
    this._renderGraph(props);
  }

  shouldComponentUpdate(nextProps) {
    const props = merge(nextProps);
    this._defineAxis(props);
    this._reusableGraph(props);
    return false;
  }

  render() {
    return (
      <svg ref={ref => (this.svg = ref)}>
        <g className="graph"></g>
      </svg>
    );
  }
}
