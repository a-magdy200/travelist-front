import { GroupsOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import FilterGroupComponent from '../../components/groups/FilterGroups'
import ListGroupsComponent from '../../components/groups/ListGroups'
import api from '../../config/api'
import { IGroupInterface } from '../../config/interfaces/IGroup.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import Loader from "../../components/Loader";

const ListGroups = () => {
	const [groups, setGroups] = useState<IGroupInterface[]>([])
	const [filteredGroups, setFilteredGroups] = useState<IGroupInterface[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const getGroups = async () => {
    try {
      const response: IResponseInterface<IGroupInterface[]> = await api<IGroupInterface[]>({
        url: "/api/groups/all"
      });
			if (response.success) {
				if (response.data) {
					setGroups(response.data)
					setFilteredGroups([...response.data])
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}

	
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
			<FilterGroupComponent
			groups={groups}
			setFilteredGroups={setFilteredGroups}
			/>
			{filteredGroups ? (
				filteredGroups.map((group, index) => (
					<ListGroupsComponent group={group} key={index} />
				))
			) : (
				<div>Not Found Groups</div>
			)}
		</div>
	)
}
export default ListGroups
