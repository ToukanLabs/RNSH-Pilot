import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
var d3 = require('d3');

let multiGraphId = 0;

export default class MultiGraph extends Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.state = { graphs: [] };
    this.id = this.getComponentId();
  }

  componentDidMount() {
    var thisComponent = this;
    fetch('/static/data/graphdata.json')
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        thisComponent.setState({
          graphs: json.graphData.graphs
        });
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });

    // this.createGraphSVG();
  };

  getComponentId() {
    return 'multigraph' + multiGraphId++;
  }

  createGraphSVG() {
    this.svg = d3.select('#' + this.id).append('svg');
  }

  d3test2() {
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 500 - margin.left - margin.right,
        height = 100 - margin.top - margin.bottom,
        padding = 10,
        graphCount = 5;

    var parseDate = d3.time.format('%d-%b-%y').parse;

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var line = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.close); });

    var graphSvg = d3.select('#' + this.id).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', (height*graphCount) + (padding * graphCount) + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.tsv('static/data/psa.tsv', function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        console.log(parseDate(d.date));
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      y.domain(d3.extent(data, function(d) { return d.close; }));

      graphSvg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + ((height*graphCount) + (padding * graphCount)) + ')')
          .call(xAxis);

      graphSvg.append('g')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Price ($)');

      graphSvg.append('g')
          .attr('y', 1000)
          .attr('dy', '.71em')
        .append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line);
    });

    x.domain([new Date(2005, 1, 1), new Date(2016, 1, 1)]);

    d3.tsv('static/data/testorone.tsv', function(error, data) {

      console.log(data);

      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      y.domain(d3.extent(data, function(d) { return d.close; }));

      graphSvg.append('g')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          .attr('class', 'y axis')
          .call(yAxis)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('Price ($)');

      graphSvg.append('path')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          // .attr('dy', height)
          .datum(data)
          .attr('class', 'line')
          .attr('d', line);
    });

    var androgenData = [
      { date: parseDate('24-Jul-12'), close: 1 },
      { date: parseDate('24-Jan-13'), close: 1 }
    ];

    y.domain(d3.extent(androgenData, function(d) { return d.close; }));

    graphSvg.append('path')
        .attr('stroke-width', 10)
        .attr('transform', 'translate(0,' + ((height*2) + padding) + ')')
        .datum(androgenData)
        .attr('class', 'line')
        .attr('d', line);


    var radiotherapyData = [
      { date: parseDate('04-Sep-12'), close: 1 },
      { date: parseDate('23-Nov-12'), close: 1 }
    ];

    y.domain(d3.extent(radiotherapyData, function(d) { return d.close; }));

    graphSvg.append('path')
        .attr('stroke-width', 10)
        .attr('transform', 'translate(0,' + ((height*3) + padding) + ')')
        .datum(radiotherapyData)
        .attr('class', 'line')

        .attr('d', line);


    var surgeryData = [
      { date: parseDate('14-May-12'), close: 1}
    ]

    y.domain(d3.extent(surgeryData, function(d) { return d.close; }));

    graphSvg.selectAll('.dot')
          .data(surgeryData)
        .enter().append('circle')
          .attr('transform', 'translate(0,' + ((height*4) + padding) + ')')
          .attr('class', 'dot')
          .attr('r', 4)
          .attr('cx', function(d) { return x(d.date); })
          .attr('cy', function(d) { return y(d.close); });
  }

  render() {
    var divStyle = {
      height: '500px',
      width: '500px'
    };
    this.d3test2();
    return (
      <div id={this.id} style={divStyle}>
      </div>
    );
  }
}
