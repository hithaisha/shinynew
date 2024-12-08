import React, { Fragment } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetItem from "./tabset-item";
import { useParams } from "react-router-dom";

const Create_item = () => {
	const { id } = useParams();

	return (
		<Fragment>
			<Breadcrumb title={id === "new" ? "Create Item" : "Edit Item"} parent="Items" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>{id === "new" ? "Add" : "Update"} Item</h5>
							</CardHeader>
							<CardBody>
								<TabsetItem />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Create_item;
