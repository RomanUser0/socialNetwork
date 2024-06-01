import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";


const Profile = lazy(() => import("../pages/profile/profile"))
const Friends = lazy(() => import("../pages/friends/friends"))
const MyPhotos = lazy(() => import('../pages/myPhotos/myPhotos'))
const Menu = lazy(() => import('../pages/menu/menu'))
const Chats = lazy(() => import('../pages/chats/chats'))
const NewMessage = lazy(() => import('../pages/newMessage/newMessage'))
const Messages = lazy(() => import('../pages/messages/messages'))
const SearchFriends = lazy(() => import('../pages/searchFriends/searchFriends'))
const HeaderContent = lazy(() => import('../components/headerContent/headerContent'))
const Video = lazy(() => import('../pages/video/video'))
const Music = lazy(() => import('../pages/music/music'))

const routes = createBrowserRouter([
    {
        path: '/', element: <HeaderContent />,
        children: [
            { path: '/', element: <Profile /> },
            { path: '/friends', element: <Friends /> },
            { path: '/myPhotos', element: <MyPhotos /> },
            { path: '/menu', element: <Menu /> },
            { path: '/chats', element: <Chats /> },
            { path: '/chats/newMessage', element: <NewMessage /> },
            { path: '/chats/Messages/:id', element: <Messages /> },
            { path: '/searchFriends', element: <SearchFriends /> },
            { path: '/video', element: <Video /> },
            { path: '/music', element: <Music /> },
        ]
    }

])





export default routes