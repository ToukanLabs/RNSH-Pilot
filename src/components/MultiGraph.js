import React, { Component } from 'react';
import { browserHistory } from 'react-router';
var d3 = require('d3');

let multiGraphId = 0;

class Graph {
  constructor () {
    this.parseDate = d3.time.format('%d-%b-%y').parse;
  }

  getHeight () {
    return this.height;
  }

  getAxisPosition () {
    return this.axisPosition;
  }

  getName () {
    return this.name;
  }
}

class LineGraph extends Graph {
  constructor (name, displayName, data, yAxisLabel, offsetTop, x, axisPosition) {
    super();
    this.height = 80;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.yAxisLabel = yAxisLabel;
    this.offsetTop = offsetTop;
    this.x = x;
    this.axisPosition = axisPosition;
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
        .orient(this.axisPosition)
        .ticks(4);

    this.line = d3.svg.line()
        .x(function (d) { return this.x(d.date); }.bind(this))
        .y(function (d) { return this.y(d.data); }.bind(this));

    let gGraphInfo;
    if (this.getAxisPosition() === 'left') {
      gGraphInfo = this.graphSvg.append('g')
          .attr('class', this.name + ' y axis')
          .attr('transform', 'translate(60, ' + this.offsetTop + ')')
          .call(this.yaxis);

      // y-axis label (e.g. nmol / L).
      gGraphInfo.append('text')
          .attr('class', this.name + ' y axis label')
          .attr('transform', 'rotate(-90)')
          .attr('y', -30)
          .attr('x', -2)
          .style('text-anchor', 'end')
          .text('(' + this.yAxisLabel + ')');

      // Graph displayname (e.g. Testosterone).
      gGraphInfo.append('text')
          .attr('class', this.name + ' graphtitle')
          .attr('transform', 'rotate(-90)')
          .attr('y', -45)
          .attr('x', -2)
          .style('text-anchor', 'end')
          .text(this.displayName);
    } else {
      gGraphInfo = this.graphSvg.append('g')
          .attr('class', this.name + ' y axis')
          .attr('transform', 'translate(' + (this.graphSvg.width - 60) + ', ' + this.offsetTop + ')')
          .call(this.yaxis);

      // y-axis label (e.g. nmol / L).
      gGraphInfo.append('text')
          .attr('class', this.name + ' y axis label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 35)
          .attr('x', -2)
          .style('text-anchor', 'end')
          .text('(' + this.yAxisLabel + ')');

      // Graph displayname (e.g. Testosterone).
      gGraphInfo.append('text')
          .attr('class', this.name + ' graphtitle')
          .attr('transform', 'rotate(-90)')
          .attr('y', 50)
          .attr('x', -2)
          .style('text-anchor', 'end')
          .text(this.displayName);
    }

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
          var offsetTop = document.getElementById(thisLineGraph.graphSvg.id).parentElement.offsetTop;
          var offsetLeft = document.getElementById(thisLineGraph.graphSvg.id).parentElement.offsetLeft;
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
  constructor (name, displayName, data, offsetTop, x, axisPosition, patientId, handleDetailViewClick) {
    super();
    this.height = 20;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.offsetTop = offsetTop;
    this.x = x;
    this.axisPosition = axisPosition;
    this.patientId = patientId;
    this.handleDetailViewClick = handleDetailViewClick;
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
        .attr('y', 8)
        .attr('x', -55) // 60 is the width of the left margin.
        .text(this.displayName);

    var thisTimeGraph = this;

    this.graphSvg.append('path')
        .attr('class', this.name + ' bar')
        .attr('clip-path', 'url(#clip)')
        .attr('transform', 'translate(0,' + this.offsetTop + ')')
        .datum(this.data)
        .on('mouseenter', function (e) {
          d3.select(this).select('.' + thisTimeGraph.name + '.point.data');

          var offsetTop = document.getElementById(thisTimeGraph.graphSvg.id).parentElement.offsetTop;
          var offsetLeft = document.getElementById(thisTimeGraph.graphSvg.id).parentElement.offsetLeft;
          var left = this.getPointAtLength(0).x + parseInt(offsetLeft, 10);
          var top = parseInt(this.getPointAtLength(0).y, 10) + parseInt(offsetTop, 10) + thisTimeGraph.offsetTop;

          var content = '<h3>' + thisTimeGraph.displayName + '</h3> ' +
                        '<b>Start: </b><span class="value">' + thisTimeGraph.data[0].date.getDate() + '/' + thisTimeGraph.data[0].date.getMonth() + '/' + thisTimeGraph.data[0].date.getFullYear() + '</span><br/>' +
                        '<b>End: </b><span class="value">' + thisTimeGraph.data[1].date.getDate() + '/' + thisTimeGraph.data[1].date.getMonth() + '/' + thisTimeGraph.data[1].date.getFullYear() + '</span>';

          thisTimeGraph.tooltip = new Tooltip();
          thisTimeGraph.tooltip.show([left, top], content);
        })
        .on('click', function (e) {
          if (thisTimeGraph.name === 'radiotherapy') {
            thisTimeGraph.handleDetailViewClick(thisTimeGraph.rawData.id);
            thisTimeGraph.tooltip.cleanup();
            thisTimeGraph.tooltip = undefined;
            browserHistory.push(`/patient/${thisTimeGraph.patientId}/radiotherapy`);
          };
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
  constructor (name, displayName, data, offsetTop, x, axisPosition) {
    super();
    this.height = 20;

    this.name = name;
    this.displayName = displayName;
    this.rawData = data;
    this.data = [];
    this.offsetTop = offsetTop;
    this.x = x;
    this.axisPosition = axisPosition;
  }

  processData () {
    for (var i in this.rawData) {
      this.data[i] = {
        date: this.parseDate(this.rawData[i].date),
        data: 1,
        hoverTitle: this.rawData[i].hoverTitle
      };
    }
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
        .attr('y', 8)
        .attr('x', -55) // 60 is the width of the left margin.
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

          var offsetTop = document.getElementById(thisPointGraph.graphSvg.id).parentElement.offsetTop;
          var offsetLeft = document.getElementById(thisPointGraph.graphSvg.id).parentElement.offsetLeft;
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

    let height = parseInt(this.getHeight(container), 10) +
        parseInt(this.getPaddingTop(container), 10) +
        parseInt(this.getPaddingBottom(container), 10);
    let width = parseInt(this.getWidth(container), 10) +
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
  };

  componentDidMount () {
    this.init();
    this.draw();
  };

  getComponentId () {
    return 'multigraph' + multiGraphId++;
  };

  registerGraphs () {
    var cumulativeHeight = (this.padding / 2);
    var counter = 0;
    var thisMultiGraph = this;
    var graphs = this.props.graphs;

    graphs.forEach(function (d) {
      let graph = this.createGraph(d, thisMultiGraph, cumulativeHeight, counter++, 'left');
      cumulativeHeight += graph.getHeight();
    }.bind(this));

    this.height = cumulativeHeight;
    this.graphCount = counter;
  };

  createGraph (d, parentGraph, cumulativeHeight, idx, axisPosition) {
    let graph;

    let graphsWithSameName = parentGraph.graphs.filter((g) => {
      if (g.getName() === d.name) {
        return g;
      }
    });

    if (graphsWithSameName.length > 1) {
      console.error(`Graph name '${d.name}' is not unique and will not be rendered correctly.`);
    }

    switch (d.type) {
      case 'dual-plot':
        let left = this.createGraph(
          d.left,
          parentGraph,
          cumulativeHeight,
          idx,
          'left'
        );
        this.createGraph(
          d.right,
          parentGraph,
          cumulativeHeight,
          idx,
          'right'
        );
        return left;
      case 'line':
        graph = new LineGraph(
          d.name,
          d.displayName,
          d.data,
          d.yAxisLabel,
          (cumulativeHeight + (parentGraph.padding * idx)),
          parentGraph.x,
          axisPosition
        );
        break;
      case 'timeline':
        graph = new TimelineGraph(
          d.name,
          d.displayName,
          d.data[0],
          (cumulativeHeight + (parentGraph.padding * idx)),
          parentGraph.x,
          axisPosition,
          this.props.patientId,
          this.props.handleDetailViewClick
        );
        break;
      case 'point':
        graph = new PointGraph(
          d.name,
          d.displayName,
          d.data,
          (cumulativeHeight + (parentGraph.padding * idx)),
          parentGraph.x,
          axisPosition
        );
        break;
      default:
        throw new Error('Unknown graph type');
    }

    parentGraph.graphs.push(graph);
    return graph;
  }

  initGraphs () {
    var cumulativeHeight = (this.padding / 2);
    var counter = 0;
    this.graphs.forEach(function (d) {
      d.init(this.graphSvg);
      if (d.getAxisPosition() === 'left') {
        cumulativeHeight += d.getHeight();
        counter++;
      }
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
    const containerWidth = document.getElementById(this.id).offsetWidth;

    this.graphSvg = d3.select('#' + this.id).append('svg')
        .attr('id', this.id + 'svg')
        .attr('width', containerWidth)
        .attr('height', 100)
        .attr('class', 'multigraph')
      .append('g');

    this.width = containerWidth;
    this.graphSvg['width'] = containerWidth;

    this.graphSvg.id = this.id + 'svg';
  };

  setSvgHeight () {
    d3.select('#' + this.id + 'svg')
        .attr('height', this.height + (this.padding * this.graphCount) + 25);
  }

  createClipPath () {
    this.graphSvg.append('clipPath')
        .attr('id', 'clip')
      .append('rect')
        .attr('x', 60)
        .attr('y', 0)
        .attr('width', this.width - 60 - 60) // 60 is left margin with titles, etc. 60 is right.
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
    this.removeSvg();
    this.createSvg(this.graphSvg);

    this.x = d3.time.scale()
        .range([0, this.width]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient('bottom');

    this.registerGraphs();

    this.setSvgHeight();

    this.graphSvg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (this.height + (this.padding * this.graphCount) - (this.padding / 2)) + ')');

    this.x.domain([new Date(2005, 1, 1), new Date(2017, 1, 1)]);

    // Vertical line on left separating axis labels from graph content
    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', 60) // 60 is the width of the left margin
        .attr('y1', 0)
        .attr('x2', 60) // 60 is the width of the left margin
        .attr('y2', this.height + (this.padding * this.graphCount) - (this.padding / 2));

    // Vertical line on right separating axis labels from graph content
    this.graphSvg.append('line')
        .attr('class', 'graphseparator')
        .attr('x1', this.width - 60) // 60 is the width of the right margin
        .attr('y1', 0)
        .attr('x2', this.width - 60) // 60 is the width of the right margin
        .attr('y2', this.height + (this.padding * this.graphCount) - (this.padding / 2));

    this.createClipPath();
    this.enableZoom();

    this.initGraphs();
  };

  draw () {
    if (this.graphSvg) {
      this.graphSvg.select('g.x.axis').call(this.xAxis);
      this.graphs.forEach(function (d) {
        d.draw();
      });
    }
  };

  render () {
    this.draw();
    return (
      <div id={this.id}>
      </div>
    );
  }
}

MultiGraph.propTypes = {
  graphs: React.PropTypes.array,
  patientId: React.PropTypes.number,
  handleDetailViewClick: React.PropTypes.func
};
