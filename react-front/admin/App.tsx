import React, { Suspense } from "react";
import { Layout, Menu, Spin, theme } from "antd";

const Home = React.lazy(() => import("./pages/Home"));

const { Header, Content, Footer } = Layout;

const items = [
  { key: "home", label: "首页", render: () => <Home /> },
];

const App: React.FC = () => {
  const {
    token: { borderRadiusLG },
  } = theme.useToken();
  const [current, setCurrent] = React.useState("home");

  const SelectedComponent = items.find((item) => item.key === current)?.render;

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[current]}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
          onSelect={(e) => {
            setCurrent(e.key);
          }}
        />
      </Header>
      <Content>
        <div
          style={{
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
          <Suspense
            fallback={
              <Spin>
                <div style={{ height: "700px" }}></div>
              </Spin>
            }
          >
            {SelectedComponent && <SelectedComponent />}
          </Suspense>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Plugin Temlate ©{new Date().getFullYear()} by <a href="https://github.com/MaZhaolin/discuz-cli" target="_blank" >dz cli</a>
      </Footer>
    </Layout>
  );
};

export default App;
