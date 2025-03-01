import {useState} from "react"

const App = () => {
  const [username, seUsername] = userState("")
  const [password, setPassword] = userState("")


  const handleButton = async (e) => {
    e.preventDefault()
    const loginForm = new FormData(
      loginForm.append("username", username)
      LoginForm.append("password", password),
    )
    try {

      const response = await fetch(`localhost:8000/data`){
        method: "POST"
        headers: {"Content-Type": "application/json.js"}
        body: JSON.stringify(loginForm)
      }
      const data = await response.json()
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  }
}

return (
<div>
  <button onClick={handleButton}>CLICK HERE</button>
  <p>---------------------------------------------------------</p>
  <form>
    <input
    type="text"
    placeholder="username"
    value = {username}
    onChange={(e)=>{}}
    >
      <input
    type="password"
    placeholder="password"
    value = {username}
    onChange={(e)=>{}setPassword(e.target.value)}
    >
    <button type="submit">Login</button>
    </input>
  </form>
  </div>
)

export default App