import React from "react";
import { PageContainer, ProForm, ProFormText } from "@ant-design/pro-components";

const Home = () => {
  return <PageContainer title="朴实无华的设置页面">
    <ProForm>
      <ProFormText width={'md'} label="测试文本" name="test">
      </ProFormText>
    </ProForm>
  </PageContainer>
}

export default Home;