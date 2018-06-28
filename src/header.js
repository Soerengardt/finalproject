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
            <img src={props.imageUrl} onClick={props.toggleToUploader} />
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
