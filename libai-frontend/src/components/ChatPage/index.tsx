import React, {
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useParams, useLocation } from "react-router-dom";
import apios from "../../utils/apios";
import {
  DataCreateChat,
  DataCreateComp,
  DataMsgAdd,
  DBComp,
  DBMsg,
  DBUserWithToken,
  DBChat,
  DBUser,
} from "../../api";
import { useAuthContext } from "../../App/AuthContext";
import {
  Button,
  Container,
  Typography,
  List,
  Divider,
  Box,
  Grid,
} from "@mui/material";
import {
  AddCircleOutline,
  Chat,
  CommentOutlined,
  Comment,
  ExpandMore,
  AddComment,
  ThreeP,
  AddBox,
  QuestionAnswer,
  QuestionAnswerOutlined,
  QuestionAnswerRounded,
  QuestionAnswerTwoTone,
  Send,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import ChatSidebar, { drawerWidth } from "../Sidebar";
import AddEditMsgModal from "./AddEditMsgModal";
import CompMsgList from "./CompMsgList";

interface ChatPageProps {
  toggleSidebar: () => void;
  user: DBUser | null;
  smallScreen: boolean;
  isSidebarOpen: boolean;
}

export const ChatPage = ({
  toggleSidebar,
  isSidebarOpen,
  smallScreen,
  user,
}: ChatPageProps) => {
  console.log("ChatPage");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState<DBChat | null>(null);
  const [chats, setChats] = useState<DBChat[]>([]);

  const savedChatId = localStorage.getItem("lastChatId");
  const savedCompId = localStorage.getItem("lastCompId");

  const refreshChats = () => {
    if (user && !loading) {
      setLoading(true);
      const uid = user.id;
      apios
        .get(`/user/${uid}/chats`)
        .then((response) => {
          setChats(response.data);

          // Check and set the saved chat here
          if (savedChatId) {
            const fChat = response.data.find(
              (chat) => chat.id === parseInt(savedChatId)
            );
            if (fChat) {
              setChat(fChat);
            }
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    refreshChats();
  }, [user]);

  useEffect(() => {
    if (savedChatId) {
      const fChat = chats.find((chat) => chat.id === parseInt(savedChatId));
      if (fChat) {
        setChat(fChat);
      }
    }
  }, [chats, savedChatId]);

  const [activeCompId, setActiveCompId] = useState<number | string | null>(
    savedCompId
  );

  useEffect(() => {
    if (savedCompId) {
      setActiveCompId(savedCompId);
    }
  }, [chat]);

  const setChatPlusId = (newChat: DBChat | null) => {
    if (newChat && newChat.id !== null) {
      localStorage.setItem("lastChatId", newChat.id.toString());
    } else {
      localStorage.removeItem("lastChatId");
    }
    setChat(newChat);
  };

  const addChat = (chat: DBChat) => {
    localStorage.setItem("lastChatId", chat.id.toString());
    localStorage.removeItem("lastCompId");
    setChats([...chats, chat]);
  };


  // Completion Modal
  const [showCompModal, setShowCompModal] = useState(false);
  const handleCompModalOpen = () => {
    setShowCompModal(true);
  };
  const handleCompModalClose = () => {
    setShowCompModal(false);
  };

  // Message Modal
  const [showMsgModal, setShowMsgModal] = useState(false);
  const handleMsgModalOpen = () => {
    setShowMsgModal(true);
  };
  const handleMsgModalClose = () => {
    setShowMsgModal(false);
  };

  const setCompPlusId = (newCompId: number | string | null) => {
    if (newCompId) {
      localStorage.setItem("lastCompId", newCompId.toString());
    }
    setActiveCompId(newCompId);
  };

  const addCompletion = (completion: DBComp) => {
    if (chat && chat.completions) {
      const updatedCompletions = [...chat.completions, completion];

      setChatPlusId({
        ...chat,
        completions: updatedCompletions,
      });

      setActiveCompId(completion.id);

      // Also update the corresponding chat object in the `chats` array
      const updatedChats = chats.map((c) => {
        if (c.id === chat.id) {
          return { ...c, completions: updatedCompletions };
        } else {
          return c;
        }
      });

      setChats(updatedChats);
    }
  };

  const removeComp = (cid: number | string) => {
    if (chat && chat.completions) {
      const newComps = chat.completions.filter((comp) => comp.id !== cid);

      setChatPlusId({
        ...chat,
        completions: newComps,
      });

      // Also update the corresponding chat object in the `chats` array
      const updatedChats = chats.map((c) => {
        if (c.id === chat.id) {
          return { ...c, completions: newComps };
        } else {
          return c;
        }
      });

      setChats(updatedChats);
    }
  };

  const removeChat = (cid: number | string) => {
    const newChats = chats.filter((chat) => chat.id !== cid);
    setChats(newChats);
    if (chat && chat.id === cid) {
      setChatPlusId(null);
    }
  };

  const getCompFromId = (cid: number | string | null) => {
    if (chat && chat.completions) {
      const fComp: DBComp | undefined = chat.completions.find(
        (comp) => comp.id === cid
      );
      if (fComp) {
        return fComp;
      }
    }
    return null;
  };




  const addMsg = (msg: DBMsg) => {
    if (chat && chat.completions) {
      // Find the index of the completion to which the message belongs
      const compIndex = chat.completions.findIndex(
        (comp) => comp.id === msg.completion_id
      );
      if (compIndex !== -1) {
        // Clone the completions list and add the message to the specified completion
        const newCompletions = [...chat.completions];
        newCompletions[compIndex].messages = [
          ...newCompletions[compIndex].messages,
          msg,
        ];

        // Update the chat's completions list
        setChatPlusId({ ...chat, completions: newCompletions });
      }
    }
  };

  const activeComp = getCompFromId(activeCompId);

  const submitActiveComp = () => {
    if (
      activeComp &&
      activeComp.messages &&
      activeComp.messages.length > 0 &&
      !loading
    ) {
      setLoading(true);
      apios
        .post(`/completion/${activeComp.id}/submit`, activeComp)
        .then((response) => {
          // Handle the response data here
          const updatedActiveComp = response.data;

          // If you need to update the chat's completions list
          if (chat && chat.completions) {
            const newCompletions = [...chat.completions];
            const compIndex = newCompletions.findIndex(
              (comp) => comp.id === updatedActiveComp.id
            );
            if (compIndex !== -1) {
              newCompletions[compIndex] = updatedActiveComp;
              setChatPlusId({ ...chat, completions: newCompletions });
            }
          }
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  console.log(activeComp, activeCompId, chat)

  return (
    <Box>
      {user && !loading && (
        <ChatSidebar
          chat={chat}
          user={user}
          addCompletion={addCompletion}
          getCompFromId={getCompFromId}
          activeCompId={activeCompId}
          setCompPlusId={setCompPlusId}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          handleCompModalClose={handleCompModalClose}
          handleCompModalOpen={handleCompModalOpen}
          showCompModal={showCompModal}
          setChatPlusId={setChatPlusId}
          chats={chats}
          setChats={setChats}
          addChat={addChat}
          removeComp={removeComp}
          removeChat={removeChat}
        />
      )}
      <Box
        sx={{
          display: "block",
          ml: isSidebarOpen && !smallScreen ? `240px` : "0px",
        }}
      >
        {activeComp ? (
          <Box
            display="flex"
            sx={{
              flexGrow: 1,
              alignContent: "center",
              gap: 1,
              p: "4px",
            }}
            alignItems="center"
          >
            <Typography variant="h6" display="flex">
              Messages
            </Typography>
            <Button
              variant="contained"
              endIcon={<AddBox />}
              sx={{
                display: "flex",
              }}
              size="small"
              color="primary"
              onClick={handleMsgModalOpen}
            >
              Add
            </Button>
            <Button
              variant="contained"
              /*startIcon={<AddComment />}*/
              endIcon={<Send />}
              size="small"
              onClick={submitActiveComp}
              color="success"
              sx={{
                display: "flex",
                justifySelf: "right",
                alignSel: "right",
                ml: "auto",
              }}
            >
              Submit
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">
            Select a completion to view messages
          </Typography>
        )}
        <Divider />

        {showMsgModal && activeComp && chat && chat.id && (
          <AddEditMsgModal
            isOpen={showMsgModal}
            handleClose={handleMsgModalClose}
            chat_id={chat.id}
            completion_id={activeComp.id}
            msg={null}
            addMsg={addMsg}
          />
        )}

        {activeComp && activeComp.messages.length > 0 && (
          <CompMsgList messages={activeComp.messages} />
        )}
      </Box>
    </Box>
  );
};

export default ChatPage;
