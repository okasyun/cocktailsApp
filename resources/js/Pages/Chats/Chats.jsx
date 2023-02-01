import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import ChatMessages from "@/Components/ChatMessages";
import ChatForm from "@/Components/ChatForm";
import { Head } from "@inertiajs/inertia-react";

const Chats = ({ auth, errors }) => {
    const user = auth.user;
    const [messages, setMessages] = useState([]);

    const sendMessage = useCallback(async (message) => {
        response = await axios.post(route("cocktails.chat.store"), {
            title: "テスト",
            content_text: message,
            content_image_path: "sample_bar.png",
        });
        console.log(response);
        // 送信したメッセージを追加して表示
        setMessages((prevState) => [
            ...prevState,
            { message: message, user: user },
        ]);
    });

    // TODO:inertiaではなくaxiosで受け取る
    const getChatMessages = async () => {
        const res = await axios.get(route("cocktails.chat.fetch"));
        setMessages(res.data);
    };

    // 初回レンダリングで実行
    useEffect(() => {
        getChatMessages();
    }, []);

    return (
        <Authenticated
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    チャット
                </h2>
            }
        >
            <Head title="チャット" />
            <div className="py-12 h-[600px]">
                <div className="mx-[8%] bg-white h-full overflow-y-scroll p-3">
                    <ChatMessages messages={messages} />
                </div>
                <div className="mx-[8%] bg-white border-t-2">
                    <ChatForm user={user} sendMessage={sendMessage} />
                </div>
            </div>
        </Authenticated>
    );
};

export default Chats;
