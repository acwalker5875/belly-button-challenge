// Fetch the JSON data and console log it
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
//     Use sample_values as the x values for the bar chart.
//     Use otu_ids as the y labels for the bar chart.
//     Use otu_labels as the hovertext for the chart.


var dropdown = d3.select("#selDataset");
    data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value", name);
    });

let slicedData = sortedResults.slice(0, 10);

let trace1 = {
    x: slicedData.map(object => object.sampleValues),
    y: slicedData.map(object => object.otu_ids),
    text: slicedData.map(object => object.otu_labels),
    name: "OTU's",
    type: "bar",
    orientation: "h"
};

  // Data array
let data = [trace1];

  // Apply a title to the layout
let layout = {
    title: "Top 10 OTUs for ${selectedSample}",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" },
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
    }
};

  // Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);

// Create a bubble chart that displays each sample.
//     Use otu_ids for the x values.
//     Use sample_values for the y values.   
//     Use sample_values for the marker size. 
//     Use otu_ids for the marker colors.
//     Use otu_labels for the text values.

// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// Update all the plots when a new sample is selected. 
// Additionally, you are welcome to create any layout that you would like for your dashboard.


// Deploy your app to a free static page hosting service, such as GitHub Pages. 
// Submit the links to your deployment AND your GitHub repo. 

// OPTIONAL:
// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site
// to plot the weekly washing frequency of the individual.
// You will need to modify the example gauge code to account for values ranging from 0 through 9.
// Update the chart whenever a new sample is selected.