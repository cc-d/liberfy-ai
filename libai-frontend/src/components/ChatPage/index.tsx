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
  AddCircleOutline, Chat, CommentOutlined, Comment, ExpandMore, AddComment,
  ThreeP, AddBox, QuestionAnswer, QuestionAnswerOutlined, QuestionAnswerRounded,
  QuestionAnswerTwoTone, Send
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "../Sidebar/CompListElem";
import NewCompModal from "../Sidebar/NewCompModal";
import ChatSidebar, { drawerWidth } from "../Sidebar";
import CompMsgElem from "./CompMsgElem";
import AddEditMsgModal from './AddEditMsgModal';

interface ChatPageProps {
  activeCompId: number | null;
  setCompPlusId: (id: number | null) => void;
  getCompFromId: (id: number | null) => DBComp | null;
  chat: (DBChat | null);
  setChatPlusId: (chat: DBChat | null) => void;
  addCompletion: (completion: DBComp) => any;
}

export const ChatPage = ({
  chat, setChatPlusId, addCompletion,
  activeCompId, setCompPlusId, getCompFromId
}: ChatPageProps) => {
  console.log('ChatPage')
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(false);


  // Message Modal
  const [showMsgModal, setShowMsgModal] = useState(false);
  const handleMsgModalOpen = () => {
    setShowMsgModal(true);
  };
  const handleMsgModalClose = () => {
    setShowMsgModal(false);
  };

  const [activeComp, setActiveComp] = useState<DBComp | null>(null);
  console.log(activeComp, activeCompId);
  const addMsg = (msg: DBMsg) => {
    if (chat && chat.completions) {
      // Find the index of the completion to which the message belongs
      const compIndex = chat.completions.findIndex(comp => comp.id === msg.completion_id);
      if (compIndex !== -1) {
        // Clone the completions list and add the message to the specified completion
        const newCompletions = [...chat.completions];
        newCompletions[compIndex].messages = [...newCompletions[compIndex].messages, msg];

        // Update the chat's completions list
        setChatPlusId({ ...chat, completions: newCompletions });
      }
    }
  }

  const submitActiveComp = () => {
    if (activeComp && activeComp.messages && activeComp.messages.length > 0 && !loading) {
      setLoading(true);
      apios.post(`/completion/${activeComp.id}/submit`, activeComp)
        .then((response) => {
          // Handle the response data here
          const updatedActiveComp = response.data;

          // Set the updatedActiveComp to the activeComp state
          setActiveComp(updatedActiveComp);

          // If you need to update the chat's completions list
          if (chat && chat.completions) {
            const newCompletions = [...chat.completions];
            const compIndex = newCompletions.findIndex(comp => comp.id === updatedActiveComp.id);
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
  }

  useEffect(() => {
    if (chat) {
      const comp: DBComp | null = getCompFromId(activeCompId);
      setActiveComp(comp);
    }
  }, [chat, activeCompId]);


  return (

    <>
      <Box>
        {activeComp ? (
          <Box
            display='flex'
            sx={{ flexGrow: 1, alignContent: 'center', gap: 1, p: '4px' }}
            alignItems='center'
          >
            <Typography variant="h6" display='flex'>Messages</Typography>
            <Button
              variant="contained"
              endIcon={<AddBox />}
              sx={{
                display: 'flex',
              }}
              size="small"
              color='primary'
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
              color='success'
              sx={{
                display: 'flex',
                justifySelf: 'right',
                alignSel: 'right',
                ml: 'auto',
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
        )
        }


        {activeComp && activeComp.messages.map((msg) => (
          <CompMsgElem key={msg.id} message={msg} />
        ))
        }

      </Box>
    </>

  );
};

export default ChatPage;
