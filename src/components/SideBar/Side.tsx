import { useEffect, useState } from "react";
import { SiRubygems } from "react-icons/si";
import { MdPermIdentity } from "react-icons/md";
import circulobranco from './images/circulobranco.png';
import './side.css';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

const Sidebar = () => {
  const [gemstone, setGemstone] = useState<string | null>(null); 
  const [userId, setUserId] = useState<string | null>(null); 
  const [user, setUser] = useState<User | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    const clientId = '1164230990399549440'; 
    const redirectUri = 'https://frabjous-clafoutis-044b65.netlify.app/callback';
    const scope = 'identify';

    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  const fetchUserData = async (code: string) => {
    try {
      const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
        client_id: '1164230990399549440',
        client_secret: 'WTkpKCalnUXQdpyYRaawW37j3hkNoaUs', 
        grant_type: 'authorization_code',
        redirect_uri: 'https://frabjous-clafoutis-044b65.netlify.app/callback',
        code,
      }));

      const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access_token}`,
        },
      });

      localStorage.setItem('user', JSON.stringify(userResponse.data));
      localStorage.setItem('access_token', tokenResponse.data.access_token);
      localStorage.setItem('discord_id', userResponse.data.id);

      setUser(userResponse.data);
      window.location.href = 'https://frabjous-clafoutis-044b65.netlify.app/'; 
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const fetchAdditionalData = async (discordId: string) => {
    try {
      const response = await axios.get(`https://frabjous-clafoutis-044b65.netlify.app/api/user/${discordId}`);
      setGemstone(response.data.gemstone);
      setUserId(response.data.id);
    } catch (error) {
      console.error('Error fetching additional data', error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const discordId = localStorage.getItem('discord_id');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
      if (discordId) {
        fetchAdditionalData(discordId);
      }
    } else {
      const query = new URLSearchParams(window.location.search);
      const code = query.get('code');

      if (code) {
        fetchUserData(code);
      } else {
        setShowAlert(true);
      }
    }
  }, []);

  const getAvatarUrl = (user: User | null) => {
    if (user && user.avatar) {
      return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}${user.avatar.startsWith("a_") ? ".gif" : ".png"}`;
    }
    const defaultAvatarUrl = 'URL_TO_DEFAULT_AVATAR'; // Set your default avatar URL here
    return defaultAvatarUrl;
  };

  return (
    <div className="sidebar">
      <h1>
        <img src={user ? getAvatarUrl(user) : circulobranco} alt="avatar" />
      </h1>
      <div className="nomeside">
        {user ? (
          <h3>{user.username}</h3>
        ) : (
          <button onClick={handleLogin}>Conectar</button>
        )}
      </div>

      <div className="gemsside">
        <SiRubygems className="circle-icon" size={24} />
        <h3>{gemstone !== null ? gemstone : '?'}</h3>
      </div>
      
      <div className="listside">
        <MdPermIdentity className="circle-icon" size={24} />
        <h3>{userId !== null ? userId : '?'}</h3>
      </div>
      
      {showAlert && (
        <>
          <div className="overlay"></div>
          <div className="alert">
            <p>Primeiro faça login com Discord</p>
            <button onClick={handleLogin}>Fazer Login</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
