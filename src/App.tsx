/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";
import { Header } from "./components/elements/layouts/header";
import { Projects } from "./components/elements/layouts/projects";
import { useState } from "react";
import { InputProject } from "./components/elements/Input/InputProject"
import { ConfigProvider,theme } from 'antd'

const init = css`
  body{
    margin: 0;
    min-height: 100vh;
    margin:0;
    padding:0;
    border:0;
    outline:0;
    font-size:100%;
    vertical-align:baseline;
    background:transparent;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;

    color: #0f0f0f;
    background-color: #f6f6f6;
    
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    .ant-picker-footer {
      display: none;
    }

    }
    ::-webkit-scrollbar{
      display: none;
    }
  @media(prefers-color-scheme: dark) {
    body {
      color: #f6f6f6;
      background-color: #2f2f2f;
    }
  }
  
`


function App() {
  const [fetch, setFetch] = useState<number>(0);
  
    return (
    <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
  }}
  >
    <Global styles={init}/>
      <Header>
          <InputProject
            fetch={fetch}
            setFetch={setFetch}
          />
      </Header>
    <ul>
      <Projects
        fetch={fetch}
        setFetch={setFetch}
       />
    </ul>
  </ConfigProvider>
  )

}
export default App;
