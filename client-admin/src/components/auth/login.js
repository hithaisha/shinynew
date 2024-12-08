import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import { ArrowLeft } from "react-feather";
import Slider from "react-slick";
import stats from "../../assets/images/dashboard/stats.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
	};
	return (
		<Fragment>
			<div className="page-wrapper">
				<div className="authentication-box">
					<Container>
						<Row>
							<Col className="col-md-5 p-0 card-left">
								<Card className="bg-primary" style={{height: "350px"}}>
									{/* <div className="svg-icon">
										<img alt="" src={stats} className="Img-fluid" />
									</div> */}
									<Slider className="single-item" {...settings}>
										<div>
											<div>
												<h3>Welcome to Heritage Heaven Admin Portal</h3>
												<p>
													Control everything and grab access to everything from Heritage Heaven admin panel.
												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to Heritage Heaven Admin Portal</h3>
												<p>
													Control everything and grab access to everything from Heritage Heaven admin panel.
												</p>
											</div>
										</div>
										<div>
											<div>
												<h3>Welcome to Heritage Heaven Admin Portal</h3>
												<p>
													Control everything and grab access to everything from Heritage Heaven admin panel.
												</p>
											</div>
										</div>
									</Slider>
								</Card>
							</Col>
							<Col className="col-md-7 p-0 card-right">
								<Card className="tab2-card" style={{height: "350px"}}>
									<CardBody>
										<LoginTabset />
									</CardBody>
								</Card>
							</Col>
						</Row>
						{/* <a
							href=""
							target="_blank"
							rel="noreferrer"
							className="btn btn-primary back-btn"
						>
							<ArrowLeft />
							back
						</a> */}
					</Container>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
