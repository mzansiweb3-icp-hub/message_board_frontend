import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MessageInput = ({ backendActor }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [sending, setSending] = useState(false);

  const navigate = useNavigate();

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const message = {
        title: title,
        body: body,
        attachmentURL: attachmentUrl,
      };
      await backendActor.addMessage(message);
      setTitle("");
      setBody("");
      setAttachmentUrl("");
      setSending(false);
      navigate('/');
    } catch (error) {
      console.log("Error on send title ", error);
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto mt-10 shadow-md">
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Type your title here"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700">
            Body
          </label>
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Type the message body here"
            rows="4"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="attachmentUrl" className="block text-gray-700">
            Attachment URL
          </label>
          <input
            type="text"
            name="attachmentUrl"
            value={attachmentUrl}
            onChange={(e) => setAttachmentUrl(e.target.value)}
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Type the attachment URL"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            onClick={sendMessage}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
