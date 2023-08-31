import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Content from "../../components/Content";
import { useState } from "react";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("dashboard");

  return (
    <>
      <Grid
        templateAreas={`"navbar navbar" "sidebar content"`}
        templateColumns={"300px 1fr"}
        templateRows={"60px 1fr"}
      >
        <GridItem area={"navbar"}>
          <Navbar />
        </GridItem>
        <GridItem area={"sidebar"}>
          <Sidebar
            onChangePage={(page) => setSelectedPage(page)}
            selectedPage={selectedPage}
          />
        </GridItem>
        <GridItem area={"content"}>
          <Content selectedPage={selectedPage} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Dashboard;
