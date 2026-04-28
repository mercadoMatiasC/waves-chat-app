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
import { UsersIndex } from './features/profile/pages/UsersIndex';
import { UsersShow } from './features/profile/pages/UserShow';
import { WavesShow } from './features/waves/pages/WavesShow';

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
          
          {/* -- CONVERSATIONS -- */}
          <Route path="/Chats">
            <Route index element={<ConversationsIndex />} />
            <Route path=":id" element={<ConversationShow />} />            
          </Route>
          
          {/* -- PROFILE -- */}
          <Route path="/Users">
            <Route index element={<UsersIndex />} />
            <Route path=":id" element={<UsersShow />} />
          </Route>
          <Route path="/Me" element={<Me />} />
          <Route path="/Logout" element={<Logout />} />

          {/* -- WAVES -- */}
          <Route path="/Users/:id/Wave" element={<WavesShow />} />
        </Route>
      </Route>
    </Routes>
  );
}