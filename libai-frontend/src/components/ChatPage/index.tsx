import React, { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import apios from "../../apios";
import { BaseChat, BaseCompletion } from "../../api";
import { useAuthContext } from "../../AuthContext";
import { Link } from "react-router-dom";
import { useChatContext } from "./ChatContext";
import { useNavigate } from "react-router-dom";


export const CompListElem = ({completion}) => {
  const comp: BaseCompletion = completion;

  const compMsgs = comp.messages ? comp.messages : [];

  var compTitle: string = "System Message Not Found"
  if (compMsgs.length > 0) {
    compTitle = compMsgs[0].content;
  }


  return (
    <div className='comp-list-elem-wrap'>
      <div className="comp-list-elem-title">
      <Link to={`/completion/${completion.id}`}>
        {compTitle} ({compMsgs.length})
      </Link>
      </div>

          </div>


  )
}

const ChatPage = () => {
  const { user, setUser } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();

  const {
    chat,
    setChat,
    completions,
    setCompletions,
    completion,
    setCompletion,
  } = useChatContext();

  const [showForm, setShowForm] = useState(false);

  const [sysprompt, setSysPrompt] = useState("");

  useEffect(() => {
    console.log("Getting chat information");
    setShowForm(true);
    apios
      .get(`/chat/${chatId}`)
      .then((response) => {
        console.log("Received chat information:", response.data);
        setChat(response.data);
        setCompletions(response.data.completions);
      })
      .catch((error) => {
        console.error("Error getting chat information:", error);
      });
  }, [user]);

  useEffect(() => {
    if (chat && chat.id && user && user.id) {
      setShowForm(true);
    }
  }, [chat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Changing form input:", e.target.name, e.target.value);
    if (e.target.name === "sysprompt") {
      setSysPrompt(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Submitting form with values:");
    e.preventDefault();
    console.log(completions);
    apios
      .post(`/completion/create`, {
        chat_id: chat?.id,
        sysprompt: sysprompt,
        user_id: user?.id,
        temperature: 1,
      })
      .then((response) => {
        console.log(
          "Received response after creating completion:",
          response.data
        );
        // update chat state with new conversation
        if (response.data && "id" in response.data) {
          let comps = [...completions, response.data];
          setCompletions(comps); // Update completions list here
        } else {
          console.error("Received invalid completion data:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error creating completion:", error);
      });
  };

  if (!chat) {
    return <div>Loading...</div>;
  }
  return (
    <div id="chat-page-wrap">

      <div className="chat-list-wrap">
        <div className="chat-list-text chat-list-left">Chat:</div>
        <div className="chat-list-text chat-list-right chat-name-text">
          {chat.name}
        </div>
      </div>
      <div className="completions-list">
        <div className='comp-list-title'>
          Completions:
        </div>
        {completions.map((completion) => (
          <CompListElem completion={completion} />
        ))}
      </div>
      {showForm && (
        <div id="create-comp-wrap">
          <form onSubmit={handleSubmit}>
            <div className="form-field-wrap">
              <label htmlFor="sysprompt">System Prompt:</label>
              <input
                type="text"
                name="sysprompt"
                value={sysprompt}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field-wrap">
              <label htmlFor="temperature">Temperature:</label>
              <input
                type="text"
                name="temperature"
                value={1}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Create Completion</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
