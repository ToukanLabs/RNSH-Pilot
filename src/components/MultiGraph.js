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
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 800 - margin.left - margin.right,
        height = 120 - margin.top - margin.bottom,
        padding = 0,
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
        .attr('height', (height*graphCount) + (padding * graphCount) + margin.top + margin.bottom + 25)
        .attr('class', 'multigraph')
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    this.x.domain([new Date(2005, 1, 1), new Date(2016, 1, 1)]);

    this.graphSvg.append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('x', 30)
        .attr('y', 0)
        .attr('width', width - 30)
        .attr('height', (height * graphCount) + (padding * graphCount));

    d3.tsv('static/data/psa.tsv', function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.close = +d.close;
      });

      this.graphSvg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + ((height*graphCount) + (padding * graphCount)) + ')');

      this.yPsa = d3.scale.linear()
        .range([height, 0]);

      this.yPsa.domain(d3.extent(data, function(d) { return d.close; }));

      var yAxisPsa = d3.svg.axis()
          .scale(this.yPsa)
          .orient('left')
          .ticks(2);

      this.linePsa = d3.svg.line()
          .x(function(d) { return this.x(d.date); }.bind(this))
          .y(function(d) { return this.yPsa(d.close); }.bind(this));

      this.graphSvg.append('g')
          .attr('class', 'psa y axis')
          .attr('transform', 'translate(30, 0)')
          .call(yAxisPsa)
        .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('x', -10)
          .attr('dy', '.71em')
          .style('text-anchor', 'end')
          .text('ng / mL');

      this.graphSvg.append('path')
          .attr('class', 'psa line')
          .attr('transform', 'translate(0,' + ((height*0) + (padding*0)) + ')')
          .attr('clip-path', 'url(#clip)')
          .datum(data);

      this.graphSvg.selectAll('.psa.point')
          .data(data)
        .enter().append('circle')
          .attr('class', 'psa point')
          .attr('clip-path', 'url(#clip)')
          .attr('r', 4)
          .on('mouseenter', function(e) {
                var offset = $('#root').offset(), // { left: 0, top: 0 }
                      left = d3.select(this).attr('cx') + margin.left,
                      top = d3.select(this).attr('cy') + (height * 0),
                      formatter = d3.format('.04f');

                  var content = '<h3>PSA: </h3>' +
                                '<p>' +
                                '<span class="value">' + e.close + '</span>' +
                                '</p>';

                  nvtooltip.show([left, top], content);
                  d3.select(this).classed('hover',true);
                })
             .on('mouseleave', function(e) {
                    nvtooltip.cleanup();
                    d3.select(this).classed('hover',false);
              });;

      this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 0)
        .attr('y1', height)
        .attr('x2', width)
        .attr('y2', height);

      this.draw();

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
          .orient('left')
          .ticks(2);

      this.lineTestosterone = d3.svg.line()
          .x(function(d) { return this.x(d.date); }.bind(this))
          .y(function(d) { return this.yTestosterone(d.close); }.bind(this));

      this.graphSvg.append('g')
          .attr('transform', 'translate(30,' + (height + padding) + ')')
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
          .attr('clip-path', 'url(#clip)')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          .datum(data);

      this.graphSvg.selectAll('.testosterone.point')
          .data(data)
        .enter().append('circle')
          .attr('class', 'testosterone point')
          .attr('clip-path', 'url(#clip)')
          .attr('transform', 'translate(0,' + (height + padding) + ')')
          .attr('r', 4);

      this.graphSvg.append('line')
          .attr('class', 'graphseparator')
          .attr('x1', 0)
          .attr('y1', (height * 2) + (padding * 1))
          .attr('x2', width)
          .attr('y2', (height * 2) + (padding * 1));

      this.draw();

    }.bind(this));






    var androgenData = [
      { date: parseDate('24-Jul-12'), close: 1 },
      { date: parseDate('24-Jan-13'), close: 1 }
    ];

    this.yAndrogen = d3.scale.linear()
      .range([height, 0]);

    this.yAndrogen.domain([0, 2]);

    this.lineAndrogen = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.yAndrogen(d.close); }.bind(this));

    this.graphSvg.append('path')
        .attr('class', 'androgen bar')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + ((height*2) + (padding*1)) + ')')
        .datum(androgenData);

    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 0)
        .attr('y1', (height * 3) + (padding * 2))
        .attr('x2', width)
        .attr('y2', (height * 3) + (padding * 2));






    var radiotherapyData = [
      { date: parseDate('04-Sep-12'), close: 1 },
      { date: parseDate('23-Nov-12'), close: 1 }
    ];

    this.yRadiotherapy = d3.scale.linear()
      .range([height, 0]);

    this.yRadiotherapy.domain([0, 2]);

    this.lineRadiotherapy = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.yRadiotherapy(d.close); }.bind(this));

    this.graphSvg.append('path')
        .attr('class', 'radiotherapy bar')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + ((height*3) + (padding*2)) + ')')
        .datum(radiotherapyData);

    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 0)
        .attr('y1', (height * 4) + (padding * 3))
        .attr('x2', width)
        .attr('y2', (height * 4) + (padding * 3));






    var surgeryData = [
      { date: parseDate('14-May-12'), close: 1}
    ]

    this.ySurgery = d3.scale.linear()
      .range([height, 0]);

    this.ySurgery.domain([0, 2]);

    this.graphSvg.selectAll('.point')
        .data(surgeryData)
      .enter().append('circle')
        .attr('class', 'surgery point')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + ((height*4) + (padding*3)) + ')')
        .attr('r', 4);

    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 0)
        .attr('y1', (height * 5) + (padding * 4))
        .attr('x2', width)
        .attr('y2', (height * 5) + (padding * 4));

    var multiGraph = this;

    this.zoom = d3.behavior.zoom()
      .on('zoom', function()  {
        multiGraph.draw.call(multiGraph);
      });

    this.zoom.x(this.x);

    this.graphSvg.append('rect')
        .attr('class', 'scrollpane')
        .attr('width', width)
        .attr('height', (height * graphCount) + (padding * graphCount))
        .call(this.zoom);

    this.draw();
  };

  draw() {
    // console.log('zooming');
    this.graphSvg.select('g.x.axis').call(this.xAxis);
    this.graphSvg.select('path.psa.line').attr('d', this.linePsa);

    this.graphSvg.selectAll('circle.psa.point').attr('cx', function(d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.psa.point').attr('cy', function(d) { return this.yPsa(d.close); }.bind(this));

    this.graphSvg.selectAll('circle.testosterone.point').attr('cx', function(d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.testosterone.point').attr('cy', function(d) { return this.yTestosterone(d.close); }.bind(this));

    this.graphSvg.select('path.testosterone.line').attr('d', this.lineTestosterone);
    this.graphSvg.select('path.androgen.bar').attr('d', this.lineAndrogen);
    this.graphSvg.select('path.radiotherapy.bar').attr('d', this.lineRadiotherapy);

    this.graphSvg.selectAll('circle.surgery.point').attr('cx', function(d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.surgery.point').attr('cy', function(d) { return this.ySurgery(d.close); }.bind(this));
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
