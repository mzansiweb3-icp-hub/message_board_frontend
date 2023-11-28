import React, { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { canisterId, idlFactory } from "../declarations/message_board";
import { AuthClient } from "@dfinity/auth-client";

const authClient = await AuthClient.create();
const identity = authClient.getIdentity();

const localhost = "http://localhost:4943";
const livehost = "https://icp0.io";

const env = process.env.DFX_NETWORK || "local";

const Messaging = ({ isAuthenticated }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [messages, setMessages] = useState([] as any);
  const [sending, setSending] = useState(false);

  let agent = new HttpAgent({
    host: env === "local" ? localhost : livehost,
    identity: identity,
  });

  //Only use agent.fetchRootKey() in development mode, in production remove this line
  agent.fetchRootKey();

  const backendActor = Actor.createActor(idlFactory, {
    agent,
    canisterId: canisterId,
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const message = {
        title,
        body,
        attachmentURL: attachmentUrl,
      };
      await backendActor.addMessage(message);
      setTitle("");
      setBody("");
      setAttachmentUrl("");
      getMessages();
      setSending(false);
    } catch (error) {
      console.log("Error on send title ", error);
      setSending(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const messages = await backendActor.getMessages();
      setMessages(messages);
    } catch (error) {
      console.log("Error on get messages ", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="max-w-[1000px] w-full  bg-slate-300">
        {isAuthenticated ? (
          <div className="flex flex-col items-center p-5 gap-5">
            <div className="bg-white  rounded-lg p-4 w-full">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="title" className="mb-5">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="relative  w-full appearance-none p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                    placeholder="Type your title here"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="body" className="mb-5">
                    Body
                  </label>
                  <textarea
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="relative  w-full appearance-none p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                    placeholder="Type the message body here"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="attachmentUrl" className="mb-5">
                    Attachment URL
                  </label>
                  <input
                    type="text"
                    name="attachmentUrl"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    className="relative  w-full appearance-none p-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm "
                    placeholder="Type the attachment URL"
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    onClick={sendMessage}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {sending ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white  rounded-lg p-4 w-full">
              <h2 className="font-bold text-2xl text-gray-800">Messages</h2>
              {messages.length > 0 ? (
                <>
                  {messages.map((message: any) => (
                    <div
                      key={message.id}
                      className="border border-gray-300 rounded-lg p-4 my-5"
                    >
                      <h2 className="text-gray-800">
                        <span className="font-bold">Title:</span>{" "}
                        {message.title}
                      </h2>
                      <div className="mb-3">
                        <h3 className="text-gray-800 font-bold">Body: </h3>
                        <p className="text-gray-600">{message.body}</p>
                      </div>
                      <h3 className="text-gray-800 font-bold">
                        Attachment URL:
                      </h3>
                      <p className="text-gray-600">{message.attachmentURL}</p>
                    </div>
                  ))}
                </>
              ) : (
                <p>No messages yet</p>
              )}
            </div>
          </div>
        ) : (
          <div>Login to send messages</div>
        )}
      </div>
    </div>
  );
};

export default Messaging;
