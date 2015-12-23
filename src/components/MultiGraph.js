import React, { Component } from 'react';
var d3 = require('d3');

let multiGraphId = 0;

class Graph {
  constructor () {
    this.parseDate = d3.time.format('%d-%b-%y').parse;
  }

  getHeight () {
    return this.height;
  }
}

class LineGraph extends Graph {
  constructor (name, displayName, data, yAxisLabel, offsetTop, x) {
    super();
    this.height = 120;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.yAxisLabel = yAxisLabel;
    this.offsetTop = offsetTop;
    this.x = x;
  };

  init (graphSvg) {
    this.graphSvg = graphSvg;

    var newData = [];

    this.rawData.forEach(function (d) {
      newData.push({
        date: this.parseDate(d.date),
        data: +d.data
      });
    }.bind(this));

    this.data = newData;

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.y.domain(d3.extent(this.data, function (d) {
      return d.data + ((d.data / 100) * 10);
    }));

    this.yaxis = d3.svg.axis()
        .scale(this.y)
        .orient('left')
        .ticks(4);

    this.line = d3.svg.line()
        .x(function (d) { return this.x(d.date); }.bind(this))
        .y(function (d) { return this.y(d.data); }.bind(this));

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name + ' y axis')
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
        .on('mouseenter', function (e) {
          var point = d3.select(this).select('.' + thisLineGraph.name + '.point.data');
          var offsetTop = document.getElementById(thisLineGraph.graphSvg.id).offsetTop;
          var offsetLeft = document.getElementById(thisLineGraph.graphSvg.id).offsetLeft;
          var left = parseInt(point.attr('cx'), 10) + parseInt(offsetLeft, 10);
          var top = parseInt(point.attr('cy'), 10) + parseInt(offsetTop, 10) + thisLineGraph.offsetTop;

          var content = '<b>' + thisLineGraph.displayName + ': </b><span class="value">' + e.data + '</span><br/>' +
                        '<b>Date: </b><span class="value">' + e.date.getDate() + '/' + e.date.getMonth() + '/' + e.date.getFullYear() + '</span>';

          thisLineGraph.tooltip = new Tooltip();
          thisLineGraph.tooltip.show([left, top], content);
        })
        .on('mouseleave', function (e) {
          thisLineGraph.tooltip.cleanup();
          thisLineGraph.tooltip = undefined;
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

  draw () {
    this.graphSvg.select('path.' + this.name + '.line').attr('d', this.line);
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cx', function (d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cy', function (d) { return this.y(d.data); }.bind(this));
  };
};

class TimelineGraph extends Graph {
  constructor (name, displayName, data, offsetTop, x) {
    super();
    this.height = 90;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.offsetTop = offsetTop;
    this.x = x;
  }

  processData () {
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

  init (graphSvg) {
    this.graphSvg = graphSvg;

    this.processData();

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.y.domain([0, 2]);

    this.line = d3.svg.line()
        .x(function (d) { return this.x(d.date); }.bind(this))
        .y(function (d) { return this.y(d.data); }.bind(this));

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name + ' y axis')
        .attr('transform', 'translate(60, ' + this.offsetTop + ')');

    gGraphInfo.append('text')
        .attr('class', this.name + ' graphtitle')
        .attr('transform', 'rotate(-90)')
        .attr('y', -45)
        .attr('x', -0)
        .style('text-anchor', 'end')
        .text(this.displayName);

    var thisTimeGraph = this;

    this.graphSvg.append('path')
        .attr('class', this.name + ' bar')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .datum(this.data)
        .on('mouseenter', function (e) {
          d3.select(this).select('.' + thisTimeGraph.name + '.point.data');

          var offsetTop = document.getElementById(thisTimeGraph.graphSvg.id).offsetTop;
          var offsetLeft = document.getElementById(thisTimeGraph.graphSvg.id).offsetLeft;
          var left = this.getPointAtLength(0).x + parseInt(offsetLeft, 10);
          var top = parseInt(this.getPointAtLength(0).y, 10) + parseInt(offsetTop, 10) + thisTimeGraph.offsetTop;

          var content = '<h3>' + thisTimeGraph.displayName + ': </h3> ' +
                        '<b>Start: </b><span class="value">' + thisTimeGraph.data[0].date.getDate() + '/' + thisTimeGraph.data[0].date.getMonth() + '/' + thisTimeGraph.data[0].date.getFullYear() + '</span><br/>' +
                        '<b>End: </b><span class="value">' + thisTimeGraph.data[1].date.getDate() + '/' + thisTimeGraph.data[1].date.getMonth() + '/' + thisTimeGraph.data[1].date.getFullYear() + '</span>';

          thisTimeGraph.tooltip = new Tooltip();
          thisTimeGraph.tooltip.show([left, top], content);
        })
        .on('mouseleave', function (e) {
          thisTimeGraph.tooltip.cleanup();
          thisTimeGraph.tooltip = undefined;
        });
  }

  draw () {
    this.graphSvg.select('path.' + this.name + '.bar').attr('d', this.line);
  }
};

class PointGraph extends Graph {
  constructor (name, displayName, data, offsetTop, x) {
    super();
    this.height = 80;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.offsetTop = offsetTop;
    this.x = x;
  }

  processData () {
    this.data = [{
      date: this.parseDate(this.rawData.date),
      data: 1,
      hoverTitle: this.rawData.hoverTitle
    }];
  }

  init (graphSvg) {
    this.graphSvg = graphSvg;

    this.processData();

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.y.domain([0, 2]);

    var gGraphInfo = this.graphSvg.append('g')
        .attr('class', this.name + ' y axis')
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
        .on('mouseenter', function (e) {
          var point = d3.select(this);

          var offsetTop = document.getElementById(thisPointGraph.graphSvg.id).offsetTop;
          var offsetLeft = document.getElementById(thisPointGraph.graphSvg.id).offsetLeft;
          var left = parseInt(point.attr('cx'), 10) + parseInt(offsetLeft, 10);
          var top = parseInt(point.attr('cy'), 10) + parseInt(offsetTop, 10) + thisPointGraph.offsetTop;

          var content = '<h3>' + thisPointGraph.data[0].hoverTitle + '</h3>' +
                        '<b>Date: </b><span class="value">' + thisPointGraph.data[0].date.getDate() + '/' + thisPointGraph.data[0].date.getMonth() + '/' + thisPointGraph.data[0].date.getFullYear() + '</span>';

          thisPointGraph.tooltip = new Tooltip();
          thisPointGraph.tooltip.show([left, top], content);
        })
        .on('mouseleave', function (e) {
          thisPointGraph.tooltip.cleanup();
          thisPointGraph.tooltip = undefined;
        });
  };

  draw () {
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cx', function (d) { return this.x(d.date); }.bind(this));
    this.graphSvg.selectAll('circle.' + this.name + '.point').attr('cy', function (d) { return this.y(d.data); }.bind(this));
  }
}

class Tooltip {

  getWidth (elem) {
    return window.getComputedStyle(elem).width.replace('px', '');
  };

  getHeight (elem) {
    return window.getComputedStyle(elem).height.replace('px', '');
  };

  getPaddingTop (elem) {
    return window.getComputedStyle(elem).paddingTop.replace('px', '');
  };

  getPaddingRight (elem) {
    return window.getComputedStyle(elem).paddingRight.replace('px', '');
  };

  getPaddingBottom (elem) {
    return window.getComputedStyle(elem).paddingBottom.replace('px', '');
  };

  getPaddingLeft (elem) {
    return window.getComputedStyle(elem).paddingLeft.replace('px', '');
  };

  show (pos, content, gravity, dist) {
    var container = document.createElement('div');
    container.classList.add('nvtooltip');

    gravity = gravity || 's';
    dist = dist || 20;

    container.innerHTML = content;
    container.style.left = '-1000px';
    container.style.top = '-1000px';
    container.style.opacity = 0;
    document.body.appendChild(container);

    var height = this.getHeight(container) +
        parseInt(this.getPaddingTop(container), 10) +
        parseInt(this.getPaddingBottom(container), 10);
    var width = this.getWidth(container) +
        parseInt(this.getPaddingLeft(container), 10) +
        parseInt(this.getPaddingRight(container), 10);
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var scrollTop = document.body.scrollTop; // TODO: also adjust horizontal scroll
    let left, top;

    // TODO: implement other gravities
    switch (gravity) {
      case 'e':
      case 'w':
      case 'n':
        left = pos[0] - (width / 2);
        top = pos[1] + dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop + windowHeight < top + height) top = pos[1] - height - dist;
        break;
      case 's':
        left = pos[0] - (width / 2);
        top = pos[1] - height - dist;
        if (left < 0) left = 5;
        if (left + width > windowWidth) left = windowWidth - width - 5;
        if (scrollTop > top) top = pos[1] + dist;
        break;
    }

    container.style.left = '' + parseInt(left, 10) + 'px';
    container.style.top = '' + parseInt(top, 10) + 'px';
    container.style.opacity = 1;

    this.container = container;
  };

  cleanup () {
    var tooltip = this.container;
    tooltip.style.opacity = 0;

    setTimeout(function () {
      tooltip.remove();
    }, 200);
  };
};

export default class MultiGraph extends Component {
  constructor () {
    super();
    this.render = this.render.bind(this);
    this.id = this.getComponentId();
    this.graphs = [];

    this.padding = 10;
    this.height = 0;
    this.width = 800;
  };

  componentDidMount () {
    this.init();
    this.draw();
  };

  getComponentId () {
    return 'multigraph' + multiGraphId++;
  };

  createGraphSVG () {
    this.svg = d3.select('#' + this.id).append('svg');
  };

  registerGraphs () {
    var cumulativeHeight = 0;
    var counter = 0;
    var thisMultiGraph = this;
    var graphs = this.props.graphs;

    graphs.forEach(function (d) {
      let graph;

      switch (d.type) {
        case 'line':
          graph = new LineGraph(
            d.name,
            d.displayName,
            d.data,
            d.yAxisLabel,
            (cumulativeHeight + (thisMultiGraph.padding * counter++)),
            thisMultiGraph.x
          );
          break;
        case 'timeline':
          graph = new TimelineGraph(
            d.name,
            d.displayName,
            d.data[0],
            (cumulativeHeight + (thisMultiGraph.padding * counter++)),
            thisMultiGraph.x
          );
          break;
        case 'point':
          graph = new PointGraph(
            d.name,
            d.displayName,
            d.data[0],
            (cumulativeHeight + (thisMultiGraph.padding * counter++)),
            thisMultiGraph.x
          );
          break;
        default:
          throw new Error('Unknown graph type');
      }

      thisMultiGraph.graphs.push(graph);
      cumulativeHeight += graph.getHeight();
    });

    this.height = cumulativeHeight;
    this.graphCount = counter;
  };

  initGraphs () {
    var cumulativeHeight = 0;
    var counter = 0;
    this.graphs.forEach(function (d) {
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

  removeSvg () {
    d3.select('#' + this.id + ' svg').remove();
    this.graphSvg = undefined;
  };

  createSvg () {
    this.graphSvg = d3.select('#' + this.id).append('svg')
        .attr('id', this.id + 'svg')
        .attr('width', this.width)
        .attr('height', this.height + (this.padding * this.graphCount) + 25)
        .attr('class', 'multigraph')
      .append('g');

    this.graphSvg.id = this.id + 'svg';
  };

  createClipPath () {
    this.graphSvg.append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('x', 60)
        .attr('y', 0)
        .attr('width', this.width - 60)
        .attr('height', this.height + (this.padding * this.graphCount));
  };

  enableZoom () {
    this.zoom = d3.behavior.zoom()
      .on('zoom', function () {
        this.draw();
      }.bind(this));

    this.zoom.x(this.x);

    this.graphSvg.append('rect')
        .attr('class', 'scrollpane')
        .attr('width', this.width)
        .attr('height', this.height + (this.padding * this.graphCount))
        .call(this.zoom);
  };

  init () {
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

  draw () {
    this.graphSvg.select('g.x.axis').call(this.xAxis);
    this.graphs.forEach(function (d) {
      d.draw();
    });
  };

  render () {
    this.init();
    this.draw();
    return (
      <div id={this.id}>
      </div>
    );
  }
}

MultiGraph.propTypes = {
  graphs: React.PropTypes.array
};
