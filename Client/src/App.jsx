import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { Container } from "@chakra-ui/react";
function App() {
  return (
    <Container maxW="xl" mx="auto" p={0} minH="100vh" bg="white">
      <RouterProvider router={router} />
    </Container>
  );
}
export default App;
