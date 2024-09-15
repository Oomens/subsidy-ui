import './App.css'
import 'gnoe-workflow-ui/dist/style.css';
import {Breadcrumb, WorkflowOutlet} from "gnoe-workflow-ui";
import {useReactiveVar} from "@apollo/client";
import {clearToken, setToken, userVar} from "auth/user.ts";
import {useEffect} from "react";

function App() {
  const user = useReactiveVar(userVar);

  useEffect(() => {
    if (!user) {
      const pathname = window.location.pathname;
      if (window.location.hostname === "localhost" && window.location.hash.length > 10) {
        setToken(window.location.hash.slice(1));
      } else {
        window.location.href = `/login?to=${pathname.slice(1)}`;
      }
    } else {
      window.location.hash = '';
    }
  });

  return (
    <>
      <header className="App-header">
        <img src={`https://compositio.nl/CMlogo.png`} className="App-logo" alt="logo"/>
        <div className="App-header-text">
          <div className="App-header-user">
            {user && <>
                Logged in as {user.displayName}
                <div><a type='link' onClick={clearToken}>Logout</a></div>
            </>}
          </div>
          <h1>Request for support</h1>
          <h2>Foundation Compositio Mathematica</h2>

          <Breadcrumb/>
        </div>
      </header>
      <main>
        <WorkflowOutlet/>
      </main>
    </>
  )
}

export default App
