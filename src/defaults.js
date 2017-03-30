module.exports = function( Chart ) {
  // In the future, we could use an .extend() function to write this config in JSON.
  var opts = Chart.defaults.global;
  opts.responsive = true;
  opts.defaultFontFamily = 'Circular, sans-serif';
  opts.defaultFontColor = '#999';
  opts.tooltips.xPadding = 10;
  opts.tooltips.yPadding = 10;
  opts.tooltips.cornerRadius = 0;
  opts.tooltips.titleFontColor = '#d5d5d5';
  opts.tooltips.bodyFontSize = 14;
  opts.tooltips.displayColors = false;
  opts.tooltips.backgroundColor = '#333';
  opts.hover.animationDuration = 0;
  opts.elements.line.borderWidth = 2;
  opts.elements.point.radius = 3;
  opts.elements.point.backgroundColor = '#fff';
  opts.elements.point.hoverBackgroundColor = '#fff';
  opts.elements.point.borderWidth = 0;
  opts.elements.point.hoverRadius = 4;
  opts.elements.point.hitRadius = 4;
  // We'll render the legend to HTML and style it ourselves.
  opts.legend.display = false;
};
