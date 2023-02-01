import React from "react";

const ChatMessages = ({ messages }) => {
    return (
        <ul className="chat">
            {messages.map((message) => {
                const username = message.user.name;
                const { title, content_text, content_image_path } = message;
                console.log(title);

                return (
                    <li key={message.id}>
                        <strong>{username}</strong>
                        <div className="mb-2 text-white">
                            <p className="bg-[#6CC655] inline p-1 mb-2 rounded">
                                {content_text}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default ChatMessages;
