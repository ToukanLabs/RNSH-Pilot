import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
var d3 = require('d3');

let multiGraphId = 0;

class Graph {
  constructor() {
    this.parseDate = d3.time.format('%d-%b-%y').parse;
  }

  getHeight() {
    return this.height;
  }
}

class LineGraph extends Graph {
  constructor(name, displayName, data, yAxisLabel, offsetTop, x) {
    super();
    this.height = 120;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.yAxisLabel = yAxisLabel;
    this.offsetTop = offsetTop;
    this.x = x;
  };

  init(graphSvg) {
    this.graphSvg = graphSvg;

    var newData = []

    this.rawData.forEach(function(d) {
      newData.push({
        date: this.parseDate(d.date),
        data: +d.data
      });
    }.bind(this));

    this.data = newData;

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.y.domain(d3.extent(this.data, function(d) {
      return d.data + ((d.data / 100) * 10);
    }));

    this.yaxis = d3.svg.axis()
        .scale(this.y)
        .orient('left')
        .ticks(4);

    this.line = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.y(d.data); }.bind(this));

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name  + ' y axis')
        .attr('transform', 'translate(60, ' + this.offsetTop + ')')
        .call(this.yaxis);

    gGraphInfo.append('text')
        .attr('class', this.name + ' y axis label')
        .attr('transform', 'rotate(-90)')
        .attr('y', -30)
        .attr('x', -10)
        .style('text-anchor', 'end')
        .text('(' + this.yAxisLabel + ')');

    gGraphInfo.append('text')
        .attr('class', this.name + ' graphtitle')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -10)
        .style('text-anchor', 'end')
        .text(this.displayName);

    this.graphSvg.append('path')
        .attr('class', this.name + ' line')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .attr('clip-path', 'url(#clip)')
        .datum(this.data);

    var thisLineGraph = this;

    var gPoint = this.graphSvg.selectAll('.' + this.name + '.hoverable')
        .data(this.data)
        .enter().append('g')
        .attr('class', this.name + ' hoverable')
        .on('mouseenter', function(e) {

          var point = d3.select(this).select('.' + thisLineGraph.name + '.point.data');

          var offset = document.getElementById(thisLineGraph.graphSvg.id).offsetTop,
              left = parseInt(point.attr('cx')),
              top = parseInt(point.attr('cy')) + parseInt(offset) + thisLineGraph.offsetTop;


          var content = '<b>' + thisLineGraph.displayName + ': </b><span class="value">' + e.data + '</span><br/>' +
                        '<b>Date: </b><span class="value">' + e.date.getDate() + '/' + e.date.getMonth() + '/' + e.date.getFullYear() + '</span>';

          nvtooltip.show([left, top], content);
        })
        .on('mouseleave', function(e) {
          nvtooltip.cleanup();
        });

    gPoint.append('circle')
        .attr('class', this.name + ' point data')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .attr('clip-path', 'url(#clip)')
        .attr('r', 2);

    gPoint.append('circle')
        .attr('class', this.name + ' point hovertarget')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .attr('clip-path', 'url(#clip)')
        .attr('r', 10);

    this.graphSvg.selectAll('.' + this.name + '.point.hovertarget')
        .data(this.data)
      .enter().append('circle')
        .attr('class', this.name + ' point hovertarget')
        .attr('clip-path', 'url(#clip)')
        .attr('r', 10);
  };

  draw() {
    this.graphSvg.select('path.' + this.name + '.line').attr('d', this.line);
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cx', function(d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cy', function(d) { return this.y(d.data); }.bind(this));
  };
};








class TimelineGraph extends Graph {
  constructor(name, displayName, data, offsetTop, x) {
    super();
    this.height = 90;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.offsetTop = offsetTop;
    this.x = x;
  }

  processData() {
    var start = {
      date: this.parseDate(this.rawData.start),
      data: 1
    };

    var end = {
      date: this.parseDate(this.rawData.end),
      data: 1
    };

    this.data = [start, end];
  }

  init(graphSvg) {
    this.graphSvg = graphSvg;

    this.processData();

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.y.domain([0, 2]);

    this.line = d3.svg.line()
        .x(function(d) { return this.x(d.date); }.bind(this))
        .y(function(d) { return this.y(d.data); }.bind(this));

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name  + ' y axis')
        .attr('transform', 'translate(60, ' + this.offsetTop + ')');

    gGraphInfo.append('text')
        .attr('class', this.name + ' graphtitle')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -0)
        .style('text-anchor', 'end')
        .text(this.displayName);

    var thisTimeGraph = this;

    var myPath = this.graphSvg.append('path')
        .attr('class', this.name + ' bar')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .datum(this.data)
        .on('mouseenter', function(e) {
          var point = d3.select(this).select('.' + thisTimeGraph.name + '.point.data');

          var offset = document.getElementById(thisTimeGraph.graphSvg.id).offsetTop,
              left = this.getPointAtLength(0).x,
              top = parseInt(this.getPointAtLength(0).y) + parseInt(offset) + thisTimeGraph.offsetTop;

          var content = '<h3>' + thisTimeGraph.displayName + ': </h3> ' +
                        '<b>Start: </b><span class="value">' + thisTimeGraph.data[0].date.getDate() + '/' + thisTimeGraph.data[0].date.getMonth() + '/' + thisTimeGraph.data[0].date.getFullYear() + '</span><br/>' +
                        '<b>End: </b><span class="value">' + thisTimeGraph.data[1].date.getDate() + '/' + thisTimeGraph.data[1].date.getMonth() + '/' + thisTimeGraph.data[1].date.getFullYear() + '</span>';

          nvtooltip.show([left, top], content);
        })
        .on('mouseleave', function(e) {
          nvtooltip.cleanup();
        });
  }

  draw() {
    this.graphSvg.select('path.' + this.name + '.bar').attr('d', this.line);
  }
};







class PointGraph extends Graph {
  constructor(name, displayName, data, offsetTop, x) {
    super();
    this.height = 80;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.offsetTop = offsetTop;
    this.x = x;
  }

  processData() {
    this.data = [{
      date: this.parseDate(this.rawData.date),
      data: 1,
      hoverTitle: this.rawData.hoverTitle,
    }];
  }

  init(graphSvg) {

    this.graphSvg = graphSvg;

    this.processData();

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.y.domain([0, 2]);

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name  + ' y axis')
        .attr('transform', 'translate(60, ' + this.offsetTop + ')');

    gGraphInfo.append('text')
        .attr('class', this.name + ' graphtitle')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -10)
        .style('text-anchor', 'end')
        .text(this.displayName);

    var thisPointGraph = this;

    this.graphSvg.selectAll('.' + this.name + '.point')
        .data(this.data)
      .enter().append('circle')
        .attr('class', this.name + ' point')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .attr('r', 4)
        .on('mouseenter', function(e) {

          var point = d3.select(this);

          var offset = document.getElementById(thisPointGraph.graphSvg.id).offsetTop,
              left = parseInt(point.attr('cx')),
              top = parseInt(point.attr('cy')) + parseInt(offset) + thisPointGraph.offsetTop;


          var content = '<h3>' + thisPointGraph.data[0].hoverTitle + '</h3>' +
                        '<b>Date: </b><span class="value">' + thisPointGraph.data[0].date.getDate() + '/' + thisPointGraph.data[0].date.getMonth() + '/' + thisPointGraph.data[0].date.getFullYear() + '</span>';

          nvtooltip.show([left, top], content);
        })
        .on('mouseleave', function(e) {
          nvtooltip.cleanup();
        });
  }

  draw() {
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cx', function(d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cy', function(d) { return this.y(d.data); }.bind(this));
  }
}








export default class MultiGraph2 extends Component {
  constructor() {
    super();
    this.render = this.render.bind(this);
    this.id = this.getComponentId();
    this.graphs = [];

    this.padding = 10;
    this.height = 0;
    this.width = 800;
  };

  getComponentId() {
    return 'multigraph' + multiGraphId++;
  };

  createGraphSVG() {
    this.svg = d3.select('#' + this.id).append('svg');
  };


  registerGraphs() {
    var cumulativeHeight = 0;
    var counter = 0

    var thisMultiGraph = this;

    this.props.graphs.forEach(function(d) {
      let graph;

      switch (d.type) {
        case 'line':
          graph = new LineGraph(
            d.name,
            d.displayName,
            d.data,
            d.yAxisLabel,
            (cumulativeHeight + (thisMultiGraph.padding*counter++)),
            thisMultiGraph.x
          );
          break;
        case 'timeline':
          graph = new TimelineGraph(
            d.name,
            d.displayName,
            d.data[0],
            (cumulativeHeight + (thisMultiGraph.padding*counter++)),
            thisMultiGraph.x
          );
          break;
        case 'point':
          graph = new PointGraph(
            d.name,
            d.displayName,
            d.data[0],
            (cumulativeHeight + (thisMultiGraph.padding*counter++)),
            thisMultiGraph.x
          );
          break;
        default:
          throw 'Unknown graph type';
      }

      thisMultiGraph.graphs.push(graph);
      cumulativeHeight += graph.getHeight();
    });

    this.height = cumulativeHeight;
    this.graphCount = counter;
  };

  initGraphs() {
    var cumulativeHeight = 0;
    var counter = 0
    this.graphs.forEach(function(d) {
      d.init(this.graphSvg);
      cumulativeHeight += d.getHeight();

      counter++;
      this.graphSvg.append('line')
          .attr('class', 'graphseparator')
          .attr('x1', 0)
          .attr('y1', cumulativeHeight + (this.padding * counter) - (this.padding / 2))
          .attr('x2', this.width)
          .attr('y2', cumulativeHeight + (this.padding * counter) - (this.padding / 2));

    }.bind(this));
  };

  removeSvg() {
    d3.select('#' + this.id + ' svg').remove();
    this.graphSvg = undefined;
  };

  createSvg() {
    this.graphSvg = d3.select('#' + this.id).append('svg')
        .attr('id', this.id + 'svg')
        .attr('width', this.width)
        .attr('height', this.height + (this.padding * this.graphCount) + 25)
        .attr('class', 'multigraph')
      .append('g');

    this.graphSvg.id = this.id + 'svg';
  };

  createClipPath() {
    this.graphSvg.append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('x', 60)
        .attr('y', 0)
        .attr('width', this.width - 60)
        .attr('height', this.height + (this.padding * this.graphCount));
  };

  enableZoom() {
    this.zoom = d3.behavior.zoom()
      .on('zoom', function()  {
        this.draw();
      }.bind(this));

    this.zoom.x(this.x);

    this.graphSvg.append('rect')
        .attr('class', 'scrollpane')
        .attr('width', this.width)
        .attr('height', this.height + (this.padding * this.graphCount))
        .call(this.zoom);
  };

  init() {
    var height = 120,
        padding = 10,
        graphCount = 5;

    this.x = d3.time.scale()
        .range([0, this.width]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient('bottom');

    this.removeSvg();
    this.registerGraphs();
    this.createSvg(this.graphSvg);

    this.graphSvg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (this.height + (this.padding * this.graphCount) - (this.padding / 2)) + ')');

    this.x.domain([new Date(2005, 1, 1), new Date(2016, 1, 1)]);

    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 60)
        .attr('y1', 0)
        .attr('x2', 60)
        .attr('y2', this.height + (this.padding * this.graphCount) - (this.padding / 2));

    this.createClipPath();
    this.enableZoom();

    this.initGraphs();
  };

  draw() {
    this.graphSvg.select('g.x.axis').call(this.xAxis);
    this.graphs.forEach(function(d) {
      d.draw();
    }.bind(this));
  };

  render() {
    this.init();
    this.draw();
    return (
      <div id={this.id}>
      </div>
    );
  }
}
