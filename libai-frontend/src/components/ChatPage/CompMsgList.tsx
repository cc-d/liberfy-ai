import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Collapse,
} from "@mui/material";
import { Computer, Person, Assistant, ExpandMore } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import { Prism } from "react-syntax-highlighter";
import { vscDarkPlus as mdark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { DBMsg } from "../../api";
import "./styles.css";

export const RoleIcon: React.FC<{ role: string }> = ({ role }) => {
  role = role.toLowerCase();
  if (role == "user") {
    return <Person />;
  } else if (role == "assistant") {
    return <Assistant />;
  } else {
    return <Computer />;
  }
};

export const MsgRoleElem: React.FC<{ role: string }> = ({ role }) => (
  <Box sx={{ display: "flex", alignContent: "center", alignItems: "center" }}>
    <RoleIcon role={role} />
    <Typography>{role}</Typography>
  </Box>
);

export const MsgSummaryText: React.FC<{ message: DBMsg }> = ({ message }) => (
  <Box
    sx={{
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
      maxWidth: "150px",
      ml: 1,
      opacity: 0.8,
    }}
  >
    <Typography noWrap fontSize="14px">
      {message.content}
    </Typography>
  </Box>
);

export const CompMsgElem: React.FC<{ message: DBMsg }> = ({ message }) => {
  const [expanded, setExpanded] = useState(true);
  const handleExpandClick = () => setExpanded(!expanded);

  return (
    <Box sx={{ m: "4px" }}>
      <Card
        sx={{
          m: 0,
          p: 0,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            m: 0,
            p: "0px 8px",
          }}
        >
          <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
            <MsgRoleElem role={message.role} />
            <MsgSummaryText message={message} />
          </Box>
          <CardActions disableSpacing sx={{ m: "0px", p: "0px" }}>
            <IconButton
              onClick={handleExpandClick}
              sx={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <ExpandMore />
            </IconButton>
          </CardActions>
        </CardContent>
        <Divider />
        <Collapse
          in={expanded}
          timeout="auto"
          unmountOnExit
          sx={{ m: "0px", p: "0px" }}
        >
          <CardContent
            sx={{
              m: 0,
              p: "0px 8px",
              "&:last-child": {
                paddingBottom: "0px",
              },
            }}
          >
          <ReactMarkdown
            className="markdown-body"
            remarkPlugins={[gfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = !inline && className ? /language-(\w+)/.exec(className) : null;
                return match ? (
                  <Prism
                    {...props}
                    children={String(children).replace(/^```(\w+)/, "").replace('^```$', '').trim()}
                    style={mdark}
                    language={match[1]}
                    PreTag='div'
                    className="syntax-highlighter mono-font"
                  />
                ) : (
                  <code {...props} className='markdown-inline mono-font'>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
          </CardContent>
        </Collapse>
      </Card>
    </Box>
  );
};

export const CompMsgList: React.FC<{ messages: DBMsg[] }> = ({ messages }) => (
  <Box>
    {messages.map((message, index) => (
      <CompMsgElem key={index} message={message} />
    ))}
  </Box>
);

export default CompMsgList;
