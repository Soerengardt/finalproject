import React from 'react';


export function Logo() {
    return (
        <img src="/assets/Logo.png" />
    );
}

export function ProfilePic(props) {
    return (
        <div>
            <h3>Here you can upload an image of yourself!</h3>
            <button onClick={props.toggleToUploader}>Upload</button>
        </div>
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

export function HomeNav() {
    return (
        <a className="button" href="/home">
            Home
        </a>
    );
}

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
