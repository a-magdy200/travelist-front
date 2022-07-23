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
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import DisplayErrorsList from "../../components/DisplayErrors/DisplayErrorsList";

const CreatePost = () => {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  type LocationState = { id: number }
  const { id } = location.state as LocationState;
  const sendData = async function createPost(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    toast.info("Creating post....");
    setErrors([]);
    setIsLoading(true);
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
      toast.success("Created.");
    } catch (error: any) {
      setErrors(error?.response?.data?.errors || []);
      toast.error("An error has occurred");
    }
    setIsLoading(false);
  };
  if (isLoading) {
    return <Loader/>
  }
  return (
    <Card variant={"outlined"}>
      <CardContent>
        <form onSubmit={sendData}>
          <Box p={4} display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <h2>Create a new post</h2>
            <DisplayErrorsList errors={errors} />
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
