<script>
    import { Link } from "svelte-navigator";
  </script>
  
  <style>
    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #333;
      padding: 10px 20px;
      width: 100%;
      height: 80px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      box-sizing: border-box;
    }
  
    .logo {
      color: white;
      font-weight: bold;
      font-size: 1.5em;
      padding-left: 40px;
    }
  
    .nav-links {
      display: flex;
      gap: 30px;
      margin-left: 50px;
    }
  
    .auth-buttons {
      display: flex;
      gap: 10px;
    }
  
  
    button {
      background-color: #555;
      color: white;
      border: none;
      padding: 5px 10px;
      cursor: pointer;
      font-weight: bold;
    }
  
    button:hover {
      background-color: #777;
    }
  </style>
  
  <nav>
    <div class="logo">Logo</div>
    <div class="nav-links">
      <Link to="/" activeClassName="active">Home</Link>
      <Link to="/drinks" activeClassName="active">Drinks</Link>
      <Link to="/chat" activeClassName="active">Chat</Link>
    </div>
    <div class="auth-buttons">
      <button>Login</button>
      <button>Signup</button>
    </div>
  </nav>