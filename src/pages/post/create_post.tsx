import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { IPostInterface } from "../../config/interfaces/IPost.interface";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";

const CreatePost = () => {
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  type LocationState = { id: number }
  const { id } = location.state as LocationState;
  const sendData = async function createPost(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    const requestBody = {
      content,
      groupId: id
    };
    try {
      const response: IResponseInterface<IPostInterface> =
        await api<IPostInterface>({
          url: `/api/posts/`,
          method: "POST",
          body: JSON.stringify(requestBody)
        });

      if (response.success) {
        if (response.data) {
          navigate(`/group/show/${id}`);
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <Card variant={"outlined"}>
      <CardContent>
        <form onSubmit={sendData}>
          <Box p={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h2>Create a new post</h2>
            <Box mb={2} width={"100%"}>
              <TextField
                multiline={true}
                fullWidth={true}
                rows={8}
                value={content}
                label={"Content"}
                variant={"outlined"}
                aria-label="maximum height"
                placeholder="what is in your mind?"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Box>
            <Button variant="contained" type="submit">
              Post
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
export default CreatePost;
