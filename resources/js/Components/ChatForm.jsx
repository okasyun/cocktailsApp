import { useState } from "react";

const ChatForm = ({ user, sendMessage }) => {
    const [newMessage, setNewMessage] = useState("");

    const handleChange = (event) => setNewMessage(event.target.value);

    const handleSubmit = (event) => {
        // if (event.key !== "Enter") return false;
        event.preventDefault();
        sendMessage(newMessage);
        setNewMessage("");
    };
    return (
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <textarea
                    className="border-0 border-white w-full"
                    placeholder="メッセージを入力"
                    value={newMessage}
                    onChange={handleChange}
                    type="text"
                />
                <button clasName="bg-green-200" type="submit">
                    送信
                </button>
            </form>
        </div>
    );
};

export default ChatForm;
