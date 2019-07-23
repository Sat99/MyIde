import React, { Fragment, useState, useContext } from "react";
import ideContext from "../context/ideContext";
import { UnControlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/yonce.css";
import "codemirror/addon/edit/closebrackets.js";
require("codemirror/mode/clojure/clojure.js");

//ceaf93f10f7330318aecc742f76bda4fae74b12e
const CodeBox = () => {
  const IdeContext = useContext(ideContext);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [token, setToken] = useState(null);
  const [lang, setLang] = useState("C++");
  const [lang_id, setLang_id] = useState(14);
  const submitCode = async text => {
    console.log(lang);
    if (lang === "C++") {
      setLang_id(14);
    }
    if (lang === "Python") {
      setLang_id(34);
    }
    if (lang === "Java") {
      setLang_id(27);
    }

    console.log(lang_id);
    console.log(lang);
    const body = {
      source_code: text,
      language_id: lang_id,
      stdin: input
    };
    axios
      .post("https://api.judge0.com/submissions", body)
      .then(async res => {
        console.log(res.data.token);
        setToken(res.data.token);
        axios
          .get(`https://api.judge0.com/submissions/${token}`)
          .then(res => {
            console.log(res.data);
            setOutput(res.data.stdout);
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
    console.log(token);
    //  axios
    //    .get(`https://api.judge0.com/submissions/${token}`)
    //    .then(res => {
    //      console.log(res.data);
    //      console.log("2");
    //   })
    //   .catch(error => {
    //     console.log(error.message);
    //   });

    /*const res2 = await axios.get(
        `https://api.judge0.com/submissions/${res1.data.token}`
      );*/
    /*async function output() {
        try {
          const res2 = await axios.get(
            `https://api.judge0.com/submissions/${res1.data.token}`
          );
          console.log(res2.data);
        } catch (err) {
          console.log(err.message);
        }
      }
      setTimeout(output(), 5000);
    } catch (err) {
      console.log(err.message);
    }*/
  };

  const onSubmit1 = e => {
    e.preventDefault();
    submitCode(code);
    //setText("");
  };
  const handleChange = async e => {
    console.log(lang);

    setLang(e.target.value);
    console.log(e.target.value);
    console.log(lang);
  };
  const onClick1 = () => {
    setCode("");
  };
  const onClick2 = () => {
    setInput("");
  };
  const onClick3 = () => {
    setOutput("");
  };
  const onChange2 = e => setInput(e.target.value);
  return (
    <Fragment>
      <nav className="navbar bg-info text-white " style={{ height: "100%" }}>
        <ul>
          <li>
            <button
              className="btn btn-warning my-4"
              data-toggle="popover"
              title="CLEAR CODE"
              style={{ height: "webkit - fill - available" }}
              onClick={onClick1}
              data-content="Don't forget to enter the input in the input box before pressing the run button"
            >
              Clear Code
            </button>
          </li>
          <li>
            <button
              className="btn btn-warning my-4"
              data-toggle="popover"
              title="CLEAR INPUT"
              onClick={onClick2}
              data-content="Don't forget to enter the input in the input box before pressing the run button"
            >
              Clear Input
            </button>
          </li>
          <li>
            <button
              className="btn btn-warning my-4"
              data-toggle="popover"
              title="CLEAR CODE"
              onClick={onClick3}
              data-content="Don't forget to enter the input in the input box before pressing the run button"
            >
              Clear Output
            </button>
          </li>
          <li>
            <div class="input-group my-4">
              <div class="input-group-prepend">
                <label
                  className="input-group-text bg-secondary text-white"
                  for="inputGroupSelect01"
                >
                  Language
                </label>
              </div>
              <select
                class="custom-select"
                id="inputGroupSelect01"
                value={lang}
                onChange={handleChange}
              >
                <option value="C++">C++</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
              </select>
            </div>
          </li>
        </ul>
      </nav>
      <form className="form" onSubmit={onSubmit1}>
        <CodeMirror
          value={code}
          options={{
            mode: "clojure",
            theme: "yonce",
            lineNumbers: true,
            autoCloseBrackets: true
          }}
          style={{ width: "900px" }}
          onChange={(editor, metadata, value) => {
            setCode(value);
          }}
        />
        <div className="container-fluid px-1">
          <div className="row">
            <div className="col-lg-12">
              <textarea
                className="text1 m-4 text-warning"
                onChange={onChange2}
                placeholder="Write the input here"
                value={input}
              />
            </div>
            <div className="col-lg-12">
              <input
                type="submit"
                value="Submit"
                className="btn btn-info btn-lg btn-block m-4"
                style={{ width: "800px" }}
              />
            </div>
            <div className="col-lg-12">
              <textarea
                className="text1 m-4 text-warning"
                placeholder="Output"
                value={output}
                readOnly
              />
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
export default CodeBox;
