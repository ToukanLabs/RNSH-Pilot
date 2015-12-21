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
    this.d3test2();
    this.draw();
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

    this.x = d3.time.scale()
        .range([0, width]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient('bottom');

    d3.select('#' + this.id + ' svg').remove();
    this.graphSvg = undefined;

    this.graphSvg = d3.select('#' + this.id).append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', (height*graphCount) + (padding * graphCount) + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.x.domain([new Date(2005, 1, 1), new Date(2016, 1, 1)]);

    d3.tsv('static/data/psa.tsv', function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      this.graphSvg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + ((height*graphCount) + (padding * graphCount)) + ')')
          .call(this.xAxis);

      this.yPsa = d3.scale.linear()
        .range([height, 0]);

      this.yPsa.domain(d3.extent(data, function(d) { return d.close; }));

      var yAxisPsa = d3.svg.axis()
          .scale(this.yPsa)
          .orient('left');

      this.linePsa = d3.svg.line()
          .x(function(d) { return this.x(d.date); }.bind(this))
          .y(function(d) { return this.yPsa(d.close); }.bind(this));

      this.graphSvg.append('g')
          .attr('class', 'psa y axis')
          .call(yAxisPsa)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('ng / mL');

      this.graphSvg.append('path')
          .attr('class', 'psa line')
          .attr('transform', 'translate(0,' + ((height*0) + (padding*0)) + ')')
          .datum(data);

      this.graphSvg.selectAll('.point')
            .data(data)
          .enter().append('circle')
            .attr('class', 'psa point')
            .attr('r', 4)
            .attr('cx', function(d) { return this.x(d.date); }.bind(this))
            .attr('cy', function(d) { return this.yPsa(d.close); }.bind(this));

    }.bind(this));

    d3.tsv('static/data/testosterone.tsv', function(error, data) {

      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      this.yTestosterone = d3.scale.linear()
        .range([height, 0]);

      this.yTestosterone.domain(d3.extent(data, function(d) { return d.close; }));

      var yAxisTestosterone = d3.svg.axis()
          .scale(this.yTestosterone)
          .orient('left');

      this.lineTestosterone = d3.svg.line()
          .x(function(d) { return this.x(d.date); }.bind(this))
          .y(function(d) { return this.yTestosterone(d.close); }.bind(this));

      this.graphSvg.append('g')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          .attr('class', 'testosterone y axis')
          .call(yAxisTestosterone)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('nmol / L');

      this.graphSvg.append('path')
          .attr('class', 'testosterone line')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          .datum(data);

      this.draw();

    }.bind(this));






    var androgenData = [
      { date: parseDate('24-Jul-12'), close: 1 },
      { date: parseDate('24-Jan-13'), close: 1 }
    ];

    this.yAndrogen = d3.scale.linear()
      .range([height, 0]);

    this.yAndrogen.domain(d3.extent(androgenData, function(d) { return d.close; }));

    this.lineAndrogen = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.yAndrogen(d.close); }.bind(this));

    this.graphSvg.append('path')
        .attr('class', 'androgen bar')
        .attr('transform', 'translate(0,' + ((height*2) + padding) + ')')
        .datum(androgenData);






    var radiotherapyData = [
      { date: parseDate('04-Sep-12'), close: 1 },
      { date: parseDate('23-Nov-12'), close: 1 }
    ];

    this.yRadiotherapy = d3.scale.linear()
      .range([height, 0]);

    this.yRadiotherapy.domain(d3.extent(radiotherapyData, function(d) { return d.close; }));

    this.lineRadiotherapy = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.yRadiotherapy(d.close); }.bind(this));

    this.graphSvg.append('path')
        .attr('class', 'radiotherapy bar')
        .attr('transform', 'translate(0,' + ((height*3) + padding) + ')')
        .datum(radiotherapyData);






    var surgeryData = [
      { date: parseDate('14-May-12'), close: 1}
    ]

    this.ySurgery = d3.scale.linear()
      .range([height, 0]);

    this.ySurgery.domain(d3.extent(surgeryData, function(d) { return d.close; }));

    this.lineSurgery = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.ySurgery(d.close); }.bind(this));

    this.graphSvg.selectAll('.point')
        .data(surgeryData)
      .enter().append('circle')
        .attr('transform', 'translate(0,' + ((height*4) + padding) + ')')
        .attr('class', 'surgery point')
        .attr('r', 4)
        .attr('cx', function(d) { return this.x(d.date); }.bind(this))
        .attr('cy', function(d) { return this.ySurgery(d.close); }.bind(this));

    var multiGraph = this;

    this.zoom = d3.behavior.zoom()
      .on('zoom', function()  {
        multiGraph.draw.call(this);
      });



    // this.graphSvg.append('rect')
    //     .attr('class', 'pane')
    //     .attr('width', width)
    //     .attr('height', height * graphCount)
    //     .call(this.zoom);

    this.draw();
  };

  draw() {
    console.log(this);
    this.graphSvg.select('g.x.axis').call(this.xAxis);
    this.graphSvg.select('path.psa.line').attr('d', this.linePsa);
    this.graphSvg.select('path.psa.point').attr('d', this.linePsa);
    this.graphSvg.select('path.testosterone.line').attr('d', this.lineTestosterone);
    this.graphSvg.select('path.androgen.bar').attr('d', this.lineAndrogen);
    this.graphSvg.select('path.radiotherapy.bar').attr('d', this.lineRadiotherapy);
    this.graphSvg.select('path.surgery.point').attr('d', this.lineSurgery);
  };

  render() {
    var divStyle = {
      height: '500px',
      width: '500px'
    };
    this.d3test2();
    this.draw();
    return (
      <div id={this.id} style={divStyle}>
      </div>
    );
  }
}
