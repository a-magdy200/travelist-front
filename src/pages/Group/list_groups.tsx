import { useEffect, useState } from "react";
import SingleGroupComponent from "../../components/groups/SingleGroupComponent";
import api from "../../config/api";
import { IGroupInterface } from "../../config/interfaces/IGroup.interface";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import Loader from "../../components/Loader";

const ListGroups = () => {
  const [groups, setGroups] = useState<IGroupInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const getGroups = async () => {
    try {
      const response: IResponseInterface<IGroupInterface[]> = await api<IGroupInterface[]>({
        url: "/api/groups/all"
      });

      if (response.success) {
        if (response.data) {
          setGroups(response.data);
          // console.log(response.data)
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups().then(() => {
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return <Loader />
  }
  return (
    <div>
      <h1>Groups Page</h1>
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <SingleGroupComponent group={group} key={index} />
        ))
      ) : (
        <div>No groups yet</div>
      )}
    </div>
  );
};
export default ListGroups;
