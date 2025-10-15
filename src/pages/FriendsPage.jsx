import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import NavBar from "../components/NavBar";
import {
  addFriendByEmail,
  listFriends,
  getConversation,
  removeFriend,
} from "../data/shopingPage/ProductApi";
import { useSocket } from "../context/SocketContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const FriendsPage = () => {
  const [email, setEmail] = useState("");
  const [friends, setFriends] = useState([]);
  const [selected, setSelected] = useState(null);
  const [selectedMany, setSelectedMany] = useState([]);
  const [message, setMessage] = useState("");
  const { socket, connected } = useSocket();
  const location = useLocation();
  const navigate = useNavigate();
  const productToShare = location.state?.shareProduct || null;
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [chatLog, setChatLog] = useState([]);
  const [loadingChat, setLoadingChat] = useState(false);
  const [shareDraft, setShareDraft] = useState(productToShare);

  const selectedId = selected?._id;
  const conversation = useMemo(
    () => chatLog.filter((m) => m.peerId === selectedId),
    [chatLog, selectedId]
  );

  const loadFriends = async () => {
    const list = await listFriends();
    setFriends(list);
  };

  useEffect(() => {
    loadFriends();
  }, []);

  useEffect(() => {
    if (socket) {
      const handler = (payload) => {
        setChatLog((prev) => [
          ...prev,
          {
            id: `${Date.now()}_${Math.random()}`,
            direction: "in",
            text: payload.message,
            product: payload.product,
            timestamp: payload.timestamp || Date.now(),
            peerId: payload.fromUserId,
          },
        ]);
        toast.info("New message received");
      };
      socket.on("receive_message", handler);
      const savedHandler = (payload) => {
        // echo back confirmation already handled in optimistic append; ensure timestamp sync
      };
      socket.on("message_saved", savedHandler);
      return () => {
        socket.off("receive_message", handler);
        socket.off("message_saved", savedHandler);
      };
    }
  }, [socket]);

  const onAddFriend = async () => {
    if (!email) return;
    await addFriendByEmail(email);
    setEmail("");
    toast.success("Friend added");
    await loadFriends();
  };

  const onSend = () => {
    if (!socket || !selected || !user) return;
    const safeProduct = shareDraft
      ? {
          _id: shareDraft._id,
          name: shareDraft.name,
          image: shareDraft.image,
          price: shareDraft.price,
        }
      : null;
    const toMany = selectedMany.length ? selectedMany : [selected._id];
    if (toMany.length > 1) {
      socket.emit("send_message_multi", {
        toUserIds: toMany,
        message,
        product: safeProduct,
        fromUserId: user.id || user._id,
      });
    } else {
      const payload = {
        toUserId: selected._id,
        message,
        product: safeProduct,
        fromUserId: user.id || user._id,
      };
      socket.emit("send_message", payload);
    }
    setChatLog((prev) => [
      ...prev,
      {
        id: `${Date.now()}_${Math.random()}`,
        direction: "out",
        text: message,
        product: safeProduct,
        timestamp: Date.now(),
        peerId: selected._id,
      },
    ]);
    setMessage("");
    if (shareDraft) setShareDraft(null);
    toast.success("Sent");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <NavBar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                Add Friend
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  label="Friend's email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="contained"
                  onClick={onAddFriend}
                  sx={{ px: 3, borderRadius: 2 }}
                >
                  Add
                </Button>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                height: 520,
                overflow: "auto",
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                Friends
              </Typography>
              <List>
                {friends.map((f) => {
                  const checked = selectedMany.includes(f._id);
                  return (
                    <ListItem
                      key={f._id}
                      disablePadding
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={async (e) => {
                            e.stopPropagation();
                            await removeFriend(f._id);
                            await loadFriends();
                            if (selected?._id === f._id) setSelected(null);
                            setSelectedMany((prev) => prev.filter((id) => id !== f._id));
                          }}
                          sx={{
                            color: "#9e9e9e",
                            transition: "color 0.2s ease",
                            "&:hover": { color: "#d32f2f" },
                          }}
                        >
                          <ClearIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemButton
                        selected={selected?._id === f._id}
                        onClick={() => setSelected(f)}
                        onDoubleClick={() =>
                          setSelectedMany((prev) =>
                            checked
                              ? prev.filter((id) => id !== f._id)
                              : [...prev, f._id]
                          )
                        }
                        sx={{ borderRadius: 2, mb: 0.5 }}
                      >
                        <ListItemText
                          primaryTypographyProps={{ fontWeight: 600 }}
                          primary={f.name}
                          secondary={f.email + (checked ? "  • Selected" : "")}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 2,
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
                Chat {connected ? "(online)" : "(offline)"}
              </Typography>
              {shareDraft && (
                <Card sx={{ display: "flex", mb: 1 }}>
                  <CardMedia
                    component="img"
                    image={shareDraft.image}
                    alt={shareDraft.name}
                    sx={{ width: 90, height: 60, objectFit: "cover" }}
                  />
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="body2" noWrap>
                      {shareDraft.name}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              <Box
                sx={{
                  height: { xs: 300, sm: 340, md: 360 },
                  overflow: "auto",
                  mb: 1,
                  p: { xs: 1, md: 2 },
                  bgcolor: "#f8fafc",
                  borderRadius: 2,
                }}
              >
                {loadingChat && (
                  <Typography
                    variant="body2"
                    sx={{ color: "#888", textAlign: "center", my: 1 }}
                  >
                    Loading conversation…
                  </Typography>
                )}
                {conversation.map((m) => (
                  <Box
                    key={m.id}
                    sx={{
                      textAlign: m.direction === "out" ? "right" : "left",
                      mb: 1,
                    }}
                  >
                    {m.product && (
                      <Card sx={{ display: "inline-flex", mb: 0.5, alignItems: "center", maxWidth: { xs: 240, sm: 320 } }}>
                        <CardMedia
                          component="img"
                          image={m.product.image}
                          alt={m.product.name}
                          sx={{ width: { xs: 56, md: 70 }, height: { xs: 40, md: 50 }, objectFit: "cover" }}
                        />
                        <CardContent sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="caption" noWrap sx={{ maxWidth: { xs: 90, md: 120 } }}>
                            {m.product.name}
                          </Typography>
                          <Button size="small" variant="outlined" onClick={() => addToCart(m.product, 1)} sx={{ minWidth: 0, px: 1 }}>Add</Button>
                          <Button size="small" variant="text" onClick={() => navigate(`/product/${encodeURIComponent(m.product._id)}`)} sx={{ minWidth: 0, px: 1 }}>Open</Button>
                        </CardContent>
                      </Card>
                    )}
                    {m.text && (
                      <Typography
                        variant="body2"
                        sx={{
                          display: "inline-block",
                          px: { xs: 0.75, md: 1 },
                          py: { xs: 0.25, md: 0.5 },
                          fontSize: { xs: "0.8rem", md: "0.9rem" },
                          bgcolor: m.direction === "out" ? "#e3f2fd" : "#eee",
                          borderRadius: 1,
                        }}
                      >
                        {m.text}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  placeholder="Write a message"
                  size="small"
                />
                <Button
                  variant="contained"
                  onClick={onSend}
                  disabled={!selected}
                  sx={{ px: 3, borderRadius: 2 }}
                >
                  Send
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FriendsPage;
