import './App.css'
import { Routes, Route } from "react-router-dom";
import { Layout } from './layout/Layout';

// -- CONVERSATIONS --
import { ConversationsIndex } from './features/conversations/pages/ConversationsIndex';
import { ConversationShow } from './features/conversations/pages/ConversationShow';

// -- PROFILE --
import { Login } from './features/profile/pages/Login';
import { Logout } from './features/profile/pages/Logout';
import { Me } from './features/profile/pages/Me';

export default function App() {
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Layout />}>
        <Route path="/" element={<ConversationsIndex />} />

        {/* -- CONVERSATIONS -- */}
        <Route path="/chats">
          <Route index element={<ConversationsIndex />} />
          <Route path=":id" element={<ConversationShow />} />            
        </Route>
        
        <Route path="Me" element={<Me />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
      </Route>
    </Routes>
  )
}