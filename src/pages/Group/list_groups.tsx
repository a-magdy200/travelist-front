import { useEffect, useState } from "react";
import SingleGroupComponent from "../../components/groups/SingleGroupComponent";
import api from "../../config/api";
import { IGroupInterface } from "../../config/interfaces/IGroup.interface";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";

const ListGroups = () => {
  const [groups, setGroups] = useState<IGroupInterface[]>([]);

  const getGroups = async () => {
    try {
      const response: IResponseInterface<IGroupInterface[]> = await api<IGroupInterface[]>({
        url: "/api/groups/all"
      });

      if (response.success) {
        if (response.data) {
          setGroups(response.data);
           console.log('groups',response.data)
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);
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
