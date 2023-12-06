const MessageDisplay = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md mx-auto mt-10 shadow-md">
      <h2 className="font-bold text-2xl text-gray-800 mb-4">Messages</h2>
      {messages.length > 0 ? (
        messages.map((message) => (
          <div
            key={message.id}
            className="border border-gray-300 rounded-lg p-4 my-4"
          >
            <h2 className="text-gray-800 font-bold text-lg mb-2">
              Title:
            </h2>
            <p className="text-gray-600 mb-4">{message.title}</p>
            <div className="mb-3">
              <h3 className="text-gray-800 font-bold text-lg mb-2">
                Body:
              </h3>
              <p className="text-gray-600">{message.body}</p>
            </div>
            <div className="mb-3">
              <h3 className="text-gray-800 font-bold text-lg mb-2">
                Attachment URL:
              </h3>
              <p className="text-gray-600">{message.attachmentURL}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-800 text-lg">No messages yet</p>
      )}
    </div>
  );
};

export default MessageDisplay;
