import React from 'react';


export function Logo() {
    return (
        <img src="/assets/Logo.png" />
    );
}


export function MatchesNav() {
    return (
        <a className="button" href="/matches">
            Matches
        </a>
    );
}

export function ChatNav() {
    return (
        <a className="button" href="/chat">
            Chat
        </a>
    );
}

// export function FriendNav() {
//     return (
//         <a className="button" href="/friends">
//             Enemies
//         </a>
//     );
// }

// export function Home() {
//     return (
//         <a className="button" href="/">
//             My profile
//         </a>
//     );
// }

export function Logout() {
    return (
        <a className="button" href="/logout">
            Logout
        </a>
    );
}

// export function OnlineNav() {
//     return (
//         <a className="button" href="/online">
//             Online
//         </a>
//     );
// }
