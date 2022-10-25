import { Layout, Navbar, Button, Text } from "@nextui-org/react";
export default function Header() {
  return (
    <Layout>
      <Navbar variant="sticky">
        <Navbar.Brand>
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content variant="underline">
          <Navbar.Item>
            <Button>Sign Up</Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </Layout>
  );
}
