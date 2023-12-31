// URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Initialize data as an empty object
let data = {}; 
let chartExists = false;

// Fetch data from the provided URL
d3.json(url).then(function (jsonData) {
    data = jsonData; 
    // Populate dropdown with sample names
    let dropdown = d3.select("#selDataset");
    jsonData.names.forEach(function (name) {
        dropdown.append("option").text(name).property("value", name);
    });

    // Initial render with the first sample
    updateBarChart(jsonData.names[0], jsonData);
    updateBubbleChart(jsonData.names[0], jsonData);
    updateMetadata(jsonData.names[0], jsonData);
});

// Function to update the bar chart based on the selected sample
function updateBarChart(selectedSample, jsonData) {
    let selectedData = jsonData.samples.find((sample) => sample.id === selectedSample);

    // Extract top 10 values, labels, and hovertext
    let sampleValues = selectedData.sample_values.slice(0, 10);
    let otuIds = selectedData.otu_ids.slice(0, 10).map((id) => `OTU ${id}`);
    let otuLabels = selectedData.otu_labels.slice(0, 10);

    // Create the horizontal bar chart using Plotly
    let trace1 = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h",
    };

    let plotData = [trace1];

    let layout = {
        title: `Top 10 OTUs for ${selectedSample}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" },
    };

    if (chartExists) {
        // If a plot exists, update it
        Plotly.react("barChart", plotData, layout);
    } else {
        // If no plot exists, create a new one
        Plotly.newPlot("barChart", plotData, layout).then(() => {
            chartExists = true; // Set the variable to true after creating the plot
        });
    }
}

// Function to update the bubble chart based on the selected sample
function updateBubbleChart(selectedSample, jsonData) {
    let selectedData = jsonData.samples.find((sample) => sample.id === selectedSample);

    // Create the bubble chart using Plotly
    let trace2 = {
        x: selectedData.otu_ids,
        y: selectedData.sample_values,
        text: selectedData.otu_labels,
        mode: 'markers',
        marker: {
            size: selectedData.sample_values,
            color: selectedData.otu_ids,
            colorscale: 'Earth',
            opacity: 0.7,
        },
    };

    let bubbleData = [trace2];

    let layout = {
        title: `Bubble Chart for ${selectedSample}`,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" },
    };

    Plotly.newPlot("bubbleChart", bubbleData, layout);
}


function updateMetadata(selectedSample, jsonData) {
    let selectedMetadata = jsonData.metadata.find((meta) => meta.id.toString() === selectedSample);

    
    let metadataDisplay = d3.select("#sample-metadata");
    metadataDisplay.html("");


    Object.entries(selectedMetadata).forEach(([key, value]) => {
        metadataDisplay.append("p").text(`${key}: ${value}`);
    });
}

d3.select("#selDataset").on("change", function () {
    let selectedSample = d3.select(this).property("value");
    updateBarChart(selectedSample, data);
    updateBubbleChart(selectedSample, data);
    updateMetadata(selectedSample, data);
});

function optionChanged(selectedSample) {
    console.log("Selected sample:", selectedSample);
};