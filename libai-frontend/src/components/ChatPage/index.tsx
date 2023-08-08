import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import apios from "../../apios";
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
  ThreeP, AddBox
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import CompListElem from "./Sidebar/CompListElem";
import NewCompModal from "./Sidebar/NewCompModal";
import ChatSidebar, { drawerWidth } from "./Sidebar";
import CompMsgElem from "./CompMsgElem";
import { useSidebarContext } from "../../App/SidebarContext";
import AddEditMsgModal from './AddEditMsgModal';


const ChatPage = () => {
  console.log('ChatPage')
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [completions, setCompletions] = useState<DBComp[]>([]);

  const [activeComp, setActiveComp] = useState<DBComp | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();

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

  const addCompletion = (completion: DBComp) => {
    setCompletions([...completions, completion]);
  }

  const { marginLeft, setMarginLeft } = useSidebarContext();

  const location = useLocation();

  useEffect(() => {
    console.log('useEffect()[] ChatPage')
    //if (location.pathname.startsWith('/chat/')) {
    setMarginLeft('240px')
    //} else {
    //  setMarginLeft('0px')
    //}
    //console.log('chatpage location')
    //console.log(location)
  }, []);

  useEffect(() => {
    !isLoading && user &&
      setIsLoading(true);
    apios.get(`/chat/${chatId}`).then((response) => {
      setChat(response.data);
      setCompletions(response.data.completions);
    });
  }, [user]);

  if (!chat) {
    return <div>Loading...</div>;
  }

  if (!user || !user?.id) {
    return <></>
  }

  return (

    <>
      <Box >
        <ChatSidebar
          chat={chat}
          user={user}
          addCompletion={addCompletion}
          completions={completions}
          activeComp={activeComp}
          setActiveComp={setActiveComp}
          handleCompModalOpen={handleCompModalOpen}
          handleCompModalClose={handleCompModalClose}
        />
      </Box>
      <Box>
        <NewCompModal
          open={showCompModal} // Control the modal open state
          handleClose={handleCompModalClose}
          addCompletion={addCompletion}
          chat_id={chat.id}
          user_id={user.id}
          temperature={1} // Or whatever temperature value you need
        />

        {activeComp ? (
          <Box display='flex' alignItems='center' m='1'>
            <CommentOutlined
              sx={{
                mr: 0.5,
              }}
            />
            <Typography variant="body1">Messages</Typography>
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

        {showMsgModal && activeComp && (
          <AddEditMsgModal
            isOpen={showMsgModal}
            handleClose={handleMsgModalClose}
            chat_id={chat.id}
            completion_id={activeComp.id}
            msg={null}
          />
        )
        }


        {
          activeComp && activeComp.messages.map((msg) => (
            <CompMsgElem key={msg.id} message={msg} />
          ))
        }

      </Box>
    </>

  );
};

export default ChatPage;
