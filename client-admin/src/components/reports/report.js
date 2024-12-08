import React, { useEffect, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Line, Bar } from "react-chartjs-2";
import {
  lineChart,
  chartOptions,
  areaChart,
  areaOptions,
  barOptions,
  barChart,
  sellOption,
  sellData,
  salesOption,
  salesData,
} from "../../constants/chartData";
import ReportTable from "./report-table";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import {
  getSalesVsPurchaseData,
  getWeeklySalesAndPurchases,
} from "../api/repor.api";

const Reports = () => {
  const chartData = {
    labels: [],
    datasets: [
      {
        data: [], // Data for the first dataset
        borderColor: "#ff8084", // Border color for the bars
        backgroundColor: "#ff8084", // Fill color for the bars
        borderWidth: 2, // Border thickness
        barPercentage: 0.7, // Bar width as a percentage of the category width
        categoryPercentage: 0.4, // Spacing between bars in a category
      },
      {
        data: [], // Data for the second dataset
        borderColor: "#a5a5a5", // Border color for the bars
        backgroundColor: "#a5a5a5", // Fill color for the bars
        borderWidth: 2, // Border thickness
        barPercentage: 0.7, // Bar width as a percentage of the category width
        categoryPercentage: 0.4, // Spacing between bars in a category
      },
    ],
  };
  const expensesChartData = {
    labels: ["1st Week", "2nd Week", "3rd Week", "4th Week"],
    datasets: [
      {
        label: "Expenses",
        data: [100, 0, 0, 0],
        borderColor: "#7d9299",
        backgroundColor: "rgba(211,216,219,0.5)",
        fill: "origin",
        lineTension: 0,
      },
      {
        label: "Sales",
        data: [0, 0, 0, 0],
        borderColor: "#ff8084",
        backgroundColor: "rgba(255, 128, 132, 0.1)",
        fill: "origin",
        lineTension: 0,
      },
    ],
  };
  const [salesPurchaseData, setSalesPurchaseData] = useState(chartData);
  const [expensesData, setExpensesData] = useState(expensesChartData);

  useEffect(() => {
    getReportSalesVsPurchaseData();
    getReportWeeklySalesAndPurchases();
  }, []);

  const getReportSalesVsPurchaseData = () => {
    getSalesVsPurchaseData()
      .then((data) => {
        console.log("getSalesVsPurchaseData: ", data.data);
        console.log("ghghg", barChart);
        const input = data.data;
        const chartData = {
          labels: input.lables, // Assign labels directly
          datasets: [
            {
              data: input.purchaseQtys, // Assign purchase quantities to the first dataset
              borderColor: "#ff8084",
              backgroundColor: "#ff8084",
              borderWidth: 2,
              barPercentage: 0.7,
              categoryPercentage: 0.4,
            },
            {
              data: input.salesQtys, // Assign sales quantities to the second dataset
              borderColor: "#a5a5a5",
              backgroundColor: "#a5a5a5",
              borderWidth: 2,
              barPercentage: 0.7,
              categoryPercentage: 0.4,
            },
          ],
        };
        setSalesPurchaseData(chartData);
      })
      .finally(() => {
        // setLoading(false)
      });
  };

  const getReportWeeklySalesAndPurchases = () => {
    getWeeklySalesAndPurchases()
      .then((data) => {
        const input = data.data;
        console.log("getWeeklySalesAndPurchases: ", data.data);
        console.log("areaChart", areaChart);
        console.log("input", input);
        console.log("input.purchase: ", input.purchase);
        const chartData = {
          labels: input.lables,
          datasets: [
            {
              label: "Expenses",
              data: input.purchase,
              borderColor: "#7d9299",
              backgroundColor: "rgba(211,216,219,0.5)",
              fill: "origin",
              lineTension: 0,
            },
            {
              label: "Sales",
              data: input.sales,
              borderColor: "#ff8084",
              backgroundColor: "rgba(255, 128, 132, 0.1)",
              fill: "origin",
              lineTension: 0,
            },
          ],
        };
        setExpensesData(chartData);
      })
      .finally(() => {
        // setLoading(false)
      });
  };

  const generatePDF = () => {
    const reportData = [
      { name: "John Doe", age: 28, occupation: "Engineer" },
      { name: "Jane Smith", age: 34, occupation: "Designer" },
      { name: "Sam Johnson", age: 45, occupation: "Manager" },
    ];
    const doc = new jsPDF();

    // Title
    doc.text("User Report", 20, 10);

    // Generate table data
    const tableColumn = ["Name", "Age", "Occupation"];
    const tableRows = reportData.map((row) => [
      row.name,
      row.age,
      row.occupation,
    ]);

    // Add table to the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Position of the table
    });

    // Save the PDF
    doc.save("report.pdf");
  };

  const downloadPDF = () => {
    const reportPage = document.getElementById("report-page");

    html2canvas(reportPage, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("report.pdf");
    });
  };

  return (
    <div id="report-page">
      <Breadcrumb title="Reports" parent="Reports" />
      <Container fluid={true}>
        <button onClick={downloadPDF}>Download PDF Report</button>
        <Row>
          
        <Col lg="6">
            <Card>
              <CardHeader>
                <h5>Expenses</h5>
              </CardHeader>
              <CardBody className="expense-chart">
                <div className="chart-overflow" id="area-chart1">
                  <Line
                    data={expensesData}
                    options={areaOptions}
                    width={778}
                    height={308}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                <h5> Sales / Purchase</h5>
              </CardHeader>
              <CardBody>
                <div className="sales-chart">
                  <Bar
                    data={salesPurchaseData}
                    // data={barChart}
                    options={barOptions}
                    width={778}
                    height={308}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Transfer Report</h5>
              </CardHeader>
              <CardBody>
                <div id="basicScenario" className="report-table">
                  <ReportTable />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Reports;
