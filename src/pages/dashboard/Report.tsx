import { Box, Card, CardBody, Divider } from "@chakra-ui/react";

const Report = () => {
  return (
    <Card>
      <CardBody>
        <Box marginBottom={3} fontWeight={"semibold"} fontSize={"1.1rem"}>
          Laporan Keuangan
        </Box>
        <Divider />
      </CardBody>
    </Card>
  );
};

export default Report;
