var Util  = require('./Util');
var Input = require('./Input');
/*var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCabYpGuBnpP6QTGStfMWsBMrwg_vGKJzE'
});
*/
var GoogleMapsLoader = require('google-maps'); // only for common js environments

/*GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
});
*/

var DataMapping = function () {
    this.sections = {};
};

// Geocode an address.

DataMapping.prototype = {

   /* trying: function(){

    },

    initGoogleMaps: function() {
        var dataURL = 'data/GoogleMapsData.json';
        console.log(dataURL);
        var self = this;

        return googleMapsClient.geocode({
                Util: get(dataURL).then(JSON.parse).then(
                    function(data){

                    self.address = data.address;


                    //address: '1600 Amphitheatre Parkway, Mountain View, CA'
                        console.log(self.address)
                },
                function (err, response) {
                    if (!err) {
                        console.log(response.json.results);
                    }
                }

            )

    });
    },
*/

    initLine: function() {
        var dataURL = 'data/InputData.json';
        var self = this;

        return Util.get(dataURL).then(JSON.parse).then(
            function (data) {

                self.xData = data.xData;
                self.yData = data.yData;

                self.colors = data.colors;

                self.lineSize = data.lineSize;

                self.labels = data.labels;

                self.drawInput();
            },
            function (error) {
                console.log("Couldn't load " + dataURL + " because " + error);
            }
        );
    },


    initScatter: function() {
        var dataURL = 'data/InputScatter.json';
        var self = this;

        return Util.get(dataURL).then(JSON.parse).then(
            function (data) {

                self.country = data.country;

                self.votingPop = data.votingPop;

                self.regVoters = data.regVoters;

                self.drawScatter();
            },
            function (error) {
                console.log("Couldn't load " + dataURL + " because " + error);
            }
        );
    },


    initMap: function() {
        var dataURL = "data/InputMap.json";
        var self = this;

        return Util.get(dataURL).then(JSON.parse).then(
            function (data) {

                self.country = data.country;

                self.usage = data.usage;

                self.code = data.code;

                self.drawMap();
            },
            function (error) {
                console.log("Couldn't load " + dataURL + " because " + error);
            }
        );
    },

    /*xinit: function() {
        this.loadInput();

       this.xData = [
            [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
            [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
            [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013],
            [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013]
        ];

        this.yData = [
            [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
            [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
            [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
            [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]
        ];

        this.colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(49,130,189, 1)',
            'rgba(189,189,189,1)'
        ];

        this.lineSize = [2, 2, 4, 2];

        this.labels = ['Television', 'Newspaper', 'Internet', 'Radio'];

        this.data = [];

        for (var i = 0 ; i < this.xData.length ; i++ ) {
            var result = {
                x: this.xData[i],
                y: this.yData[i],
                type: 'scatter',
                mode: 'lines',
                line: {
                    color: this.colors[i],
                    width: this.lineSize[i]
                }
            };
            var result2 = {
                x: [this.xData[i][0], this.xData[i][11]],
                y: [this.yData[i][0], this.yData[i][11]],
                type: 'scatter',
                mode: 'markers',
                marker: {
                    color: this.colors[i],
                    size: 12
                }
            };
            this.data.push(result, result2);
        }

        this.layout = {
            showlegend: false,
            height: 600,
            width: 600,
            xaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: false,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                showticklabels: false
            },
            autosize: false,
            margin: {
                autoexpand: false,
                l: 100,
                r: 20,
                t: 100
            },
            annotations: [
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.0,
                    y: 1.05,
                    xanchor: 'left',
                    yanchor: 'bottom',
                    text: 'Main Source for News',
                    font:{
                        family: 'Arial',
                        size: 30,
                        color: 'rgb(37,37,37)'
                    },
                    showarrow: false
                },
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.5,
                    y: -0.1,
                    xanchor: 'center',
                    yanchor: 'top',
                    text: 'Source: Pew Research Center & Storytelling with data',
                    showarrow: false,
                    font: {
                        family: 'Arial',
                        size: 12,
                        color: 'rgb(150,150,150)'
                    }
                }
            ]
        };


        for (var i = 0 ; i < this.xData.length ; i++ ) {
            var result = {
                xref: 'paper',
                x: 0.05,
                y: this.yData[i][0],
                xanchor: 'right',
                yanchor: 'middle',
                text: this.labels[i] + ' ' + this.yData[i][0] +'%',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 16,
                    color: 'black'
                }
            };
            var result2 = {
                xref: 'paper',
                x: 0.95,
                y: this.yData[i][11],
                xanchor: 'left',
                yanchor: 'middle',
                text: this.yData[i][11] +'%',
                font: {
                    family: 'Arial',
                    size: 16,
                    color: 'black'
                },
                showarrow: false
            };
            this.layout.annotations.push(result, result2);
        }
        Plotly.newPlot('myDiv',this.data, this.layout);
    },
*/

    drawInput: function(){
        this.data = [];
        for (var i = 0 ; i < this.xData.length ; i++ ) {
            var result = {
                x: this.xData[i],
                y: this.yData[i],
                type: 'scatter',
                mode: 'lines',
                line: {
                    color: this.colors[i],
                    width: this.lineSize[i]
                }
            };
            var result2 = {
                x: [this.xData[i][0], this.xData[i][11]],
                y: [this.yData[i][0], this.yData[i][11]],
                type: 'scatter',
                mode: 'markers',
                marker: {
                    color: this.colors[i],
                    size: 12
                }
            };
            this.data.push(result, result2);
        }

        this.layout = {
            showlegend: false,
            height: 600,
            width: 600,
            xaxis: {
                showline: true,
                showgrid: false,
                showticklabels: true,
                linecolor: 'rgb(204,204,204)',
                linewidth: 2,
                autotick: false,
                ticks: 'outside',
                tickcolor: 'rgb(204,204,204)',
                tickwidth: 2,
                ticklen: 5,
                tickfont: {
                    family: 'Arial',
                    size: 12,
                    color: 'rgb(82, 82, 82)'
                }
            },
            yaxis: {
                showgrid: false,
                zeroline: false,
                showline: false,
                showticklabels: false
            },
            autosize: false,
            margin: {
                autoexpand: false,
                l: 100,
                r: 20,
                t: 100
            },
            annotations: [
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.0,
                    y: 1.05,
                    xanchor: 'left',
                    yanchor: 'bottom',
                    text: 'Kits Usage (by hour, military time)',
                    font:{
                        family: 'Arial',
                        size: 30,
                        color: 'rgb(37,37,37)'
                    },
                    showarrow: false
                },
                {
                    xref: 'paper',
                    yref: 'paper',
                    x: 0.5,
                    y: -0.1,
                    xanchor: 'center',
                    yanchor: 'top',
                    showarrow: false,
                    font: {
                        family: 'Arial',
                        size: 12,
                        color: 'rgb(150,150,150)'
                    }
                }
            ]
        };


        for (var i = 0 ; i < this.xData.length ; i++ ) {
            var result = {
                xref: 'paper',
                x: 0.05,
                y: this.yData[i][0],
                xanchor: 'right',
                yanchor: 'middle',
                text: this.labels[i] + ' ' + this.yData[i][0] +'%',
                showarrow: false,
                font: {
                    family: 'Arial',
                    size: 16,
                    color: 'black'
                }
            };
            var result2 = {
                xref: 'paper',
                x: 0.95,
                y: this.yData[i][11],
                xanchor: 'left',
                yanchor: 'middle',
                text: this.yData[i][11] +'%',
                font: {
                    family: 'Arial',
                    size: 16,
                    color: 'black'
                },
                showarrow: false
            };
            this.layout.annotations.push(result, result2);
        }
        Plotly.newPlot('myDiv',this.data, this.layout);
    },


    drawScatter: function(){
        this.data = [];

        var trace1 = {
            type: 'scatter',
            x: this.votingPop,
            y: this.country,
            mode: 'markers',
            name: 'Percent of estimated voting age population',
            marker: {
                color: 'rgba(156, 165, 196, 0.95)',
                line: {
                    color: 'rgba(156, 165, 196, 1.0)',
                    width: 1
                },
                symbol: 'circle',
                size: 16
            }
        };

        var trace2 = {
            x: this.regVoters,
            y: this.country,
            mode: 'markers',
            name: 'Percent of estimated registered voters',
            marker: {
                color: 'rgba(204, 204, 204, 0.95)',
                line: {
                    color: 'rgba(217, 217, 217, 1.0)',
                    width: 1
                },
                symbol: 'circle',
                size: 16
            }
        };

        this.data = [trace1, trace2];

        this.layout = {
            title: 'Votes cast for ten lowest voting age population in OECD countries',
            xaxis: {
                showgrid: false,
                showline: true,
                linecolor: 'rgb(102, 102, 102)',
                titlefont: {
                    font: {
                        color: 'rgb(204, 204, 204)'
                    }
                },
                tickfont: {
                    font: {
                        color: 'rgb(102, 102, 102)'
                    }
                },
                autotick: false,
                dtick: 10,
                ticks: 'outside',
                tickcolor: 'rgb(102, 102, 102)'
            },
            margin: {
                l: 140,
                r: 40,
                b: 50,
                t: 80
            },
            legend: {
                font: {
                    size: 10
                },
                yanchor: 'middle',
                xanchor: 'right'
            },
            width: 600,
            height: 600,
            paper_bgcolor: 'rgb(254, 247, 234)',
            plot_bgcolor: 'rgb(254, 247, 234)',
            hovermode: 'closest'
        };
        Plotly.newPlot('myDiv2', this.data, this.layout);
    },

    drawMap: function() {

        this.data = [{
            type: 'choropleth',
            z: this.usage,
            text: this.country,
            locations: this.code,
            colorscale: [
                [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
            autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: false,
                //tickprefix: '',
                title: 'Groove Pizza Usage (in 1000)'
            }
        }];

        this.layout = {
            title: '2016 Groove Pizza Usage (by country)',
            geo:{
            showframe: false,
                showcoastlines: false,
                projection:{
                type: 'mercator'
                }
            }
        };

        Plotly.plot('myDiv3', this.data, this.layout);
    },

    initInput: function() {
        for(var inputName in this.input) {
            var input = new Input(this.input[inputName]);
        }
    }
};

module.exports = DataMapping;