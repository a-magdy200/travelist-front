import { IProgramInterface } from '../../config/interfaces/IProgram.interface'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import api from '../../config/api'
import ProgramDataComponent from '../../components/programs/ProgramData'
import ProgramDetailsComponent from '../../components/programs/ProgramDetails'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { TabPanelProps } from '../../config/interfaces/ITabPanelProps.interface'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ICycleInterface } from '../../config/interfaces/ICycle.interface'
import ListProgramCyclesComponent from '../../components/programs/ListProgramCycles'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}
function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const ShowProgramUser = () => {
	const [program, setProgram] = useState<IProgramInterface>()
	const [cycles, setCycles] = useState<ICycleInterface[]>([])
	const [value, setValue] = useState(0)
	const [isLoading, setIsLoading] = useState(false);
	const { id } = useParams()
	const getProgram = async () => {
		toast.info("Creating post....");
    setIsLoading(true);
		try {
			const response: IResponseInterface<IProgramInterface> =
				await api<IProgramInterface>({
					url: `/api/programs/show/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setProgram(response.data)
				}
			}
			toast.success("Get Program Successfully");
		} catch (error: any) {
			console.log(error)
			toast.error("An error has occurred");
		}
		setIsLoading(false);
	}
	const getCycles = async () => {
		try {
			const response: IResponseInterface<ICycleInterface[]> = await api<
				ICycleInterface[]
			>({
				url: `/api/programs/show/cycles/${id}`,
			})

			if (response.success) {
				if (response.data) {
					setCycles(response.data)
					console.log(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getProgram()
		getCycles()
	}, [])
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	if (isLoading) {
		return <Loader/>
	  }
	return (
		<div>
			{program ? (
				<Box sx={{ width: '100%' }}>
					<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
						<Tabs
							value={value}
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab label="Details" {...a11yProps(0)} />
							<Tab label="cycles" {...a11yProps(1)} />
						</Tabs>
					</Box>
					<TabPanel value={value} index={0}>
						<ProgramDetailsComponent program={program} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						{cycles ? (
							<ListProgramCyclesComponent cycles={cycles} />
						) : (
							<div>No Cycles yet</div>
						)}
					</TabPanel>
				</Box>
			) : (
				<div>not found</div>
			)}
		</div>
	)
}
export default ShowProgramUser
