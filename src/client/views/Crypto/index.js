import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import { getCrypto } from '../../actions';
import { withRouter } from "react-router-dom";
import { Statistic, Row, Col, Card, Typography  } from 'antd';
import { 
    VictoryChart, 
    VictoryLine, 
    VictoryTheme, 
    VictoryLegend,
    VictoryVoronoiContainer,
    VictoryTooltip  
} from 'victory';
const { Title } = Typography;

class Crypto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crypto_data: [],
            crypto_news: []
        }
    }
    
    async componentDidMount() {
        const oauth_token = this.props.user.oauth_data.oauth_key || null;
        const crypto_data = await this.props.getCrypto();
        const crypto = await crypto_data.crypto;

        this.setState({
            crypto_data: crypto.BTC.data,
            crypto_news: crypto.BTC.news
        });
    }

    componentWillMount() {
        // redirects the user if there is no oauth key
        const location = {
            pathname: '/',
            state: {fromCrypto: true}
        }
        
        if(!(this.props.user.user_data.hasOwnProperty('oauth_key'))) {
            this.props.history.push(location);
        }
    }

    parseCryptoData(type) {
        let line = [];
        line = this.state.crypto_data.map((entry, i)=>{
            return {
                y: entry[type],
                x: new Date(entry.date)
            }
        });
       
        return line;
    }

    renderChart() {
        return (
            <VictoryChart
                domainPadding={{y: 10}}
                theme={VictoryTheme.material}
                animate={{ duration: 2000 }}
                containerComponent={<VictoryVoronoiContainer />}
                scale={{
                    x: "time",
                    y: "linear"
                }}
            >
                <VictoryLegend x={0} y={0}
                    orientation="horizontal"
                    gutter={20}
                    colorScale={[ "navy", "blue", "cyan" ]}
                    data={[
                        { name: "Closing Price" }, 
                        { name: "High Price" }, 
                        { name: "Opening Price" }
                    ]}
                />
                <VictoryLine 
                    name="Closing Price"
                    interpolation="natural"
                    style={{
                        data: { stroke: "navy" },
                    }}
                    labels={d => `Close: ${d.y}`}
                    labelComponent={<VictoryTooltip/>}
                    data={this.parseCryptoData("price_close")}
                />
                <VictoryLine 
                    name="High Price"
                    interpolation="natural"
                    style={{
                        data: { stroke: "blue" },
                    }}
                    labels={d => `High: ${d.y}`}
                    labelComponent={<VictoryTooltip/>}
                    data={this.parseCryptoData("price_high")}
                />
                <VictoryLine 
                    name="Opening Price"
                    interpolation="natural"
                    style={{
                        data: { stroke: "cyan" },
                    }}
                    labels={d => `Open: ${d.y}`}
                    labelComponent={<VictoryTooltip/>}
                    data={this.parseCryptoData("price_open")}
                />
            </VictoryChart>
        )
    }

    renderNews() {
        return this.state.crypto_news.map((entry, i)=>{
            return (
                <Col type="flex" lg={6} md={12} key={i} gutter={15} justify="center">
                    <Card
                        key={entry.title}
                        title={entry.title}
                        cover={<img alt="article" src={entry.urlToImage} />}
                        >
                        <p><span>Written by: </span>{entry.author}</p>
                        <p>{entry.description}</p>
                        <p><a href={entry.url}>{entry.source.name}</a></p>
                    </Card>
                </Col>
            )
        })
    }

    render() {
        return (
            <div className="crypto-container">  
                <Row>
                    <Title level={2}>Weekly BTC</Title>
                </Row>
                {this.state.crypto_data.length < 1 && <Spin size="large" />}
                <Row type="flex" className="crypto-section">
                    {this.state.crypto_data.length >  0 &&
                        <Col span={12}>
                            <Statistic title="Recent Closing Price" value={this.state.crypto_data[0].price_close} />
                            {this.renderChart()}
                        </Col>
                    }
                </Row>
                <Row>
                    <Title level={2}>Related BTC Articles</Title>
                </Row>
                {this.state.crypto_data.length < 1 && <Spin size="large" />}
                <Row type="flex" justify="center" gutter={30} className="crypto-section">
                    {this.state.crypto_data.length > 0 && this.renderNews()}
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    crypto: state.crypto,
    user: state.user
});

export default withRouter(connect(mapStateToProps, {getCrypto})(Crypto));