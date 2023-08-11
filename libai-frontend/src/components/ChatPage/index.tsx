import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import apios from "../../utils/apios";
import {
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
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
  AddCircleOutline, Chat, CommentOutlined, Comment, ExpandMore,
  ThreeP, AddBox, QuestionAnswer, QuestionAnswerOutlined, QuestionAnswerRounded, QuestionAnswerTwoTone
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "../Sidebar/CompListElem";
import NewCompModal from "../Sidebar/NewCompModal";
import ChatSidebar, { drawerWidth } from "../Sidebar";
import CompMsgElem from "./CompMsgElem";
import AddEditMsgModal from './AddEditMsgModal';

interface ChatPageProps {
  activeCompId: number | null;
  setActiveCompId: (id: number | null) => void;
  getCompFromId: (id: number | null) => DBComp | null;
  chat: (DBChat | null);
  setChat: (chat: DBChat | null) => void;
}

const ChatPage = ({chat, setChat, activeCompId, setActiveCompId, getCompFromId}: ChatPageProps) => {
  console.log('ChatPage')
  const { user } = useAuthContext();


  const { useChatId } = useParams<{ useChatId: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

  // Message Modal
  const [showMsgModal, setShowMsgModal] = useState(false);
  const handleMsgModalOpen = () => {
    setShowMsgModal(true);
  };
  const handleMsgModalClose = () => {
    setShowMsgModal(false);
  };

  const addCompletion = (completion: DBComp) => {
    if (chat && completion) {
      setChat({ ...chat, completions: [...chat.completions, completion] });
    }
  }

  const addMsg = (msg: DBMsg) => {
    if (msg && msg.completion_id && chat) {
      // Find the index of the completion to which the message belongs
      const compIndex = chat.completions.findIndex(comp => comp.id === msg.completion_id);
      if (compIndex !== -1) {
        // Clone the completions list and add the message to the specified completion
        const newCompletions = [...chat.completions];
        newCompletions[compIndex].messages = [...newCompletions[compIndex].messages, msg];

        // Update the chat's completions list
        setChat({ ...chat, completions: newCompletions });
      }
    }
  }

  useEffect(() => {
    if (!isLoading && user && !chat) {
      setIsLoading(true);
      apios.get(`/chat/${useChatId}`).then((response) => {
        setChat(response.data);
      }).catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [user]);



  if (!chat) {
    return <div>Loading...</div>;
  }

  if (!user || !user?.id) {
    return <></>
  }

  const activeComp = getCompFromId(activeCompId);

  return (

    <>
      <Box>
        {activeCompId ? (
          <Box display='flex' alignItems='center' m={0.5} gap={1}>
            <QuestionAnswerTwoTone />
            <Typography variant="h6">Messages</Typography>
            <Button
              variant="contained"
              startIcon={<AddBox />}
              sx={{ ml: 2 }}
              size="small"
              onClick={handleMsgModalOpen}
            >
              Add
            </Button>
          </Box>
        ) : (
          <Typography variant="body1">
            Select a completion to view messages
          </Typography>
        )}
        <Divider />

        {showMsgModal && activeCompId && chat && chat.id && (
          <AddEditMsgModal
            isOpen={showMsgModal}
            handleClose={handleMsgModalClose}
            chat_id={chat.id}
            completion_id={activeCompId}
            msg={null}
            addMsg={addMsg}
          />
        )
        }


        {
          activeComp && activeComp.messages && activeComp.messages.map((msg) => (
            <CompMsgElem key={msg.id} message={msg} />
          ))
        }

      </Box>
    </>

  );
};

export default ChatPage;
