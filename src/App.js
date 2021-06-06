import './main.css';
import './normalize.css';
import React from 'react';
import Chart from "react-apexcharts";
import ReactFlow from 'react-flow-renderer';
import axios from "axios";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.pol, this.props.chl, this.props.upr);
        this.state = {
            series: [{
                name: 'Series 1',
                data: [this.props.pol, this.props.chl, this.props.upr],
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'radar',
                    dropShadow: {
                        enabled: true,
                        blur: 1,
                        left: 1,
                        top: 1
                    },
                    toolbar: {
                        show: false
                    }
                },
                title: {
                    text: this.props.name,
                    align: 'center',
                    style: {
                        color: 'black'
                    }
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: [],
                    dashArray: 0
                },
                fill: {
                    opacity: 0.5
                },
                markers: {
                    size: 5,
                    hover: {
                        size: 10
                    }
                },
                xaxis: {
                    categories: ['POL', 'CHL', 'UPR'],
                    labels: {
                        style: {
                            colors: ['red', 'green', 'blue']
                        }
                    }
                },
                yaxis: {
                    tickAmount: 5,
                    min: 0,
                    max: 100,
                    labels: {
                        style: {
                            colors: 'black'
                        }
                    }
                }
            },
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="radar"
                            width="500"
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class RGraph extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
        };
    }

    getElements() {
        const elements = [];

        let index = 0;

        let coursesArray = [];
        let chaptersArray = [];
        let testsArray = [];

        elements[index] = {
            id: "1",
            style: {background: "rgba(0,0,0,0)", width: 480, height: 250, border: 'none'},
            data: {
                label: <ApexChart name={this.state.user.fullname}
                                  upr={this.state.user.upr}
                                  chl={this.state.user.chl}
                                  pol={this.state.user.pol}/>
            },
            position: { x: window.outerWidth/2, y: 100 }
        };

        index++;

        for (let i = 0; i < this.state.user.courses.length; i++) {
            elements[index] = {
                id: "c" + i.toString(10),
                style: {background: "rgba(0,0,0,0)", width: 480, height: 250, border: 'none'},
                data: {
                    label: <ApexChart name={this.state.user.courses[i].name}
                                      upr={this.state.user.courses[i].upr}
                                      chl={this.state.user.courses[i].chl}
                                      pol={this.state.user.courses[i].pol}/>
                },
                position: { x: (500 * i), y: 350 }
            };
            index++;
            coursesArray[i] = "c" + (i).toString(10);
        }

        for (let i = 0; i < this.state.user.courses.length; i++) {
            chaptersArray[i] = [];
            for (let j = 0; j < this.state.user.courses[i].chapters.length; j++) {
                elements[index] = {
                    id: "ch" + j.toString(10),
                    style: {background: "rgba(0,0,0,0)", width: 480, height: 250, border: 'none'},
                    data: {
                        label: <ApexChart name={this.state.user.courses[i].chapters[j].name}
                                          upr={this.state.user.courses[i].chapters[j].upr}
                                          chl={this.state.user.courses[i].chapters[j].chl}
                                          pol={this.state.user.courses[i].chapters[j].pol}/>
                    },
                    position: {x: (500 * i), y: 600}
                };
                index++;
                chaptersArray[i][j] = "ch" + (j).toString(10);
            }
        }

        for (let i = 0; i < this.state.user.courses.length; i++) {
            testsArray[i] = [];
            for (let j = 0; j < this.state.user.courses[i].chapters.length; j++) {
                testsArray[i][j] = [];
                for (let r = 0; r < this.state.user.courses[i].chapters[j].tests.length; r++) {
                    elements[index] = {
                        id:  "t" + r.toString(10),
                        style: {background: "rgba(0,0,0,0)", width: 480, height: 250, border: 'none'},
                        data: {
                            label: <ApexChart name={this.state.user.courses[i].chapters[j].tests[r].name}
                                              upr={this.state.user.courses[i].chapters[j].tests[r].upr}
                                              chl={this.state.user.courses[i].chapters[j].tests[r].chl}
                                              pol={this.state.user.courses[i].chapters[j].tests[r].pol}/>
                        },
                        position: {x: (500 * i), y: 1000}
                    };
                    index++;
                    testsArray[i][j][r] = "t" + r.toString(10);
                }
            }
        }

        console.log(coursesArray);
        console.log(chaptersArray);
        console.log(testsArray);

        for (let i = 0; i < this.state.user.courses.length; i++) {
            elements[index] = {
                id: (index + 1).toString(10),
                source: "1",
                target: coursesArray[i],
                animated: true
            };
            index++;
        }

        for (let i = 0; i < this.state.user.courses.length; i++) {
            for (let j = 0; j < this.state.user.courses[i].chapters.length; j++) {
                elements[index] = {
                    id: (index + 1).toString(10),
                    source: coursesArray[i],
                    target: chaptersArray[i][j],
                    animated: true
                };
                index++;
            }
        }

        for (let i = 0; i < this.state.user.courses.length; i++) {
            for (let j = 0; j < this.state.user.courses[i].chapters.length; j++) {
                for (let r = 0; r < this.state.user.courses[i].chapters[j].tests.length; r++) {
                    elements[index] = {
                        id: (index + 1).toString(10),
                        source: chaptersArray[i][j],
                        target: testsArray[i][j][r],
                        animated: true
                    };
                    index++;
                }
            }
        }

        return elements;
    }

    render() {
        const elements = this.getElements();

        const graphStyles = { width: "100%", height: "1080px", backgroundColor: "#ffffff"};

        const BasicGraph = () => <ReactFlow elements={elements} style={graphStyles} nodesConnectable={false}/>;

        return <BasicGraph />;
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            user: null,
            help: -1,
        };
    }

    getUser = () => {
        console.log('Если здесь не работает');
        console.log(`http://kstu-aec.herokuapp.com/statistics/user/${this.state.id}`);
        console.log('то и тут!');
        axios
            .get(`http://kstu-aec.herokuapp.com/statistics/user/${this.state.id}`)
            .then(data => this.setState({user: data.data}))
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    help = () => {
        axios
            .get("http://kstu-aec.herokuapp.com/statistics/help")
            .then(data => this.setState({ help: data.data }))
            .catch(err => {
                console.log(err);
                return null;
            });
    };

    componentDidMount() {
        this.getUser();
        this.help();
    }

    render() {
        console.log(this.state.id)
        return (
            <div className="wrapper">
                <header className="header">
                    <div className="header__body responsive-wrapper">
                        <div className="header__name"><a href="http://kstu-aec.herokuapp.com/">Автоматизированный учебный курс</a></div>
                        <nav className="header__nav">
                            <a href="http://kstu-aec.herokuapp.com/profile">Личный кабинет</a>
                        </nav>
                    </div>
                </header>
                <main className="main">
                    <div className="main__body responsive-wrapper">
                        <div className="graphic">
                            {this.state.user === null && this.state.help === -1 ? (<div>Загрузка графики...</div>) : (<RGraph user={this.state.user}/>)}
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;