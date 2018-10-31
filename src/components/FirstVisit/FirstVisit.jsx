import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { getFirstVisitData, commonGateway, commonGatewayRequestDone } from '../../redux/actions';
import * as URL from "../../utilities/commonUrl";
import * as commonConstants from '../../utilities/commonConstants';

import '../../common.css';

var RESOURCE = "atom";
var reducerKeyGet = "FirstVisitGetSuccess";
var reducerKeyPost = "FirstVisitPostSuccess";
var ERROR = commonConstants.ERROR_TEXT;

class FirstVisit extends Component {
    componentDidMount() {
        /** Action call to fetch FirstVisit data. */
        this.props.getFirstVisitData();

        /** API call GET. */
        this.props.commonGateway({
            url: URL.TEST_GET_URL, method: 'GET',
            resource: RESOURCE, reducerKey: reducerKeyGet
        });

        let reqData = JSON.stringify({ title: 'foo', body: 'bar', userId: 1 });
        let headerData = { "Content-type": "application/json; charset=UTF-8" };
        /** API call POST. */
        this.props.commonGateway({
            url: URL.TEST_POST_URL, method: 'POST', reqData: reqData,
            header: headerData, resource: RESOURCE, reducerKey: reducerKeyPost
        });
    }

    componentDidUpdate(nextProps) {
        /** Success Handler GET call */
        if (this.props[reducerKeyGet]) {
            console.log("CommonGateway is working fine, GET call response is here : ", this.props[reducerKeyGet]);
            this.props.commonGatewayRequestDone({ reducerKey: reducerKeyGet });
        }

        /** Success Handler POST call */
        if (this.props[reducerKeyPost]) {
            console.log("CommonGateway is working fine, POST call response is here : ", this.props[reducerKeyPost]);
            this.props.commonGatewayRequestDone({ reducerKey: reducerKeyPost });
        }

        /** Error Handler, when any api results failure */
        if (this.props[ERROR]) {
            console.log("CommonGateway is working fine, API results Error : ", this.props[ERROR]);
            this.props.commonGatewayRequestDone({ reducerKey: ERROR });
        }
    }

    render() {
        let new_arrivals;
        /** Assigning data from props (Used ES6) */
        const { firstVisitData } = this.props;
        if (firstVisitData)
            new_arrivals = firstVisitData.new_arrivals;
        return (
            <div>
                <h3 style={{ "paddingLeft": "85px" }}><strong>FirstVisit : </strong></h3>
                <section className=" first-visit">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5 ">
                                <div className="nav-visit">
                                    <h1 className="text-center visit-text">
                                        {new_arrivals && new_arrivals.left_top_heading}</h1>
                                    <hr className="text-style text-center" style={{ "borderTop": "1px solid #7C878E" }} />
                                    {new_arrivals && new_arrivals.cta.map((item, index) => {
                                        return <a key={"sub-nav" + index} href="#" className="sub-nav">
                                            <p className="text-center">{item.text}</p>
                                        </a>
                                    })}
                                </div>
                                <div className="row" style={{ "paddingLeft": "127px" }}>
                                    <p className="sub-title">
                                        {new_arrivals && new_arrivals.right_section.title}</p>
                                    <h1 className=" visit-head">{new_arrivals && new_arrivals.right_section.description}
                                        <br />{new_arrivals && new_arrivals.right_section.heading}</h1>
                                    <a className="cta-section" href="#">
                                        <p>{new_arrivals && new_arrivals.right_section.cta.text}</p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-7 ">
                                <a href="#">
                                    <img className="nav-visit-banner" alt="item-img"
                                        src={new_arrivals && new_arrivals.right_section.section_type} />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let mapState = {
        firstVisitData: state.testReducer.firstVisitData
    };
    mapState[reducerKeyGet] = state.commonReducer[reducerKeyGet];
    mapState[reducerKeyPost] = state.commonReducer[reducerKeyPost];
    mapState[ERROR] = state.commonReducer[ERROR];
    return mapState;
}
const mapDispatchToProps = (dispatch) => bindActionCreators({
    getFirstVisitData, commonGateway, commonGatewayRequestDone
}, dispatch);

FirstVisit = connect(mapStateToProps, mapDispatchToProps)(FirstVisit)
export default FirstVisit;