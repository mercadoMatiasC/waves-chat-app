import './App.css'
import { Routes, Route } from "react-router-dom";
import { Layout } from './layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';

// -- CONVERSATIONS --
import { ConversationsIndex } from './features/conversations/pages/ConversationsIndex';
import { ConversationShow } from './features/conversations/pages/ConversationShow';

// -- PROFILE --
import { Login } from './features/profile/pages/Login';
import { Logout } from './features/profile/pages/Logout';
import { Me } from './features/profile/pages/Me';
import { Register } from './features/profile/pages/Register';
import { UsersFriends } from './features/profile/pages/UsersFriends';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        
        {/* -- PUBLIC ROUTES -- */}
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />

        {/* -- PROTECTED ROUTES -- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ConversationsIndex />} />
          
          <Route path="/chats">
            <Route index element={<ConversationsIndex />} />
            <Route path=":id" element={<ConversationShow />} />            
          </Route>
          
          <Route path="/Users" element={<UsersFriends />} />
          <Route path="/Me" element={<Me />} />
          <Route path="/Logout" element={<Logout />} />
        </Route>

      </Route>
    </Routes>
  );
}