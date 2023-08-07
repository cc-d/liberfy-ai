import React, { useCallback, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import apios from "../../apios";
import {
  BaseMsg,
  DataCreateChat, DataCreateComp, DataMsgAdd,
  DBComp, DBMsg, DBUserWithToken, DBChat
} from "../../api";
import { useAuthContext } from "../../AuthContext";
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
import {useSidebarContext} from "../../App/SidebarContext";



const ChatPage = () => {
  const { user } = useAuthContext();
  const { chatId } = useParams<{ chatId: string }>();
  const [chat, setChat] = useState<DBChat | null>(null);
  const [completions, setCompletions] = useState<DBComp[]>([]);

  const [activeComp, setActiveComp] = useState<DBComp | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const handleModalOpen = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const addCompletion = (completion: DBComp) => {
    setCompletions([...completions, completion]);
  }

  const { marginLeft, setMarginLeft} = useSidebarContext();

  const location = useLocation();

  useEffect(() => {
    console.log('usereffectchatpage')
    if (location.pathname.startsWith('/chat/')) {
      setMarginLeft('240px')
    } else {
      setMarginLeft('0px')
    }
    console.log('chatpage location')
    console.log(location)
  }, []);

  useEffect(() => {
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
          handleModalOpen={handleModalOpen}
          handleModalClose={handleModalClose}
        />
      </Box>
      <Box>
        <NewCompModal
          open={showModal} // Control the modal open state
          handleClose={handleModalClose}
          addCompletion={addCompletion}
          chat_id={chat.id}
          user_id={user.id}
          temperature={1} // Or whatever temperature value you need
        />

        <Box display='flex' alignItems='center' mb={0.5}>
          <CommentOutlined sx={{ mr: 0.5 }} />
          <Typography variant="body1">Messages</Typography>
          <Button
            variant="contained"
            startIcon={<AddBox />}
            sx={{ ml: 2 }}
            size="small"
          >
            Add
          </Button>
        </Box>
        <Divider />
        {
          activeComp && activeComp.messages &&
          activeComp.messages.map((msg) => (
            <CompMsgElem message={msg} />
          ))
        }
      </Box>
    </>

  );
};

export default ChatPage;
